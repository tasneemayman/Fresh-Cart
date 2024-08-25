import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';


export default function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formStatus, setFormStatus] = useState(true);
    const navigate = useNavigate();  // Ensure navigate is defined

    // Email Formik setup
    const emailFormik = useFormik({
        initialValues: { email: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid Email').required('Email is required'),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            setErrorMessage('');
            try {
                const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
                    email: values.email
                });
                console.log(response);
                if (response.data.statusMsg === "success") {
                    setFormStatus(false); // Switch to the reset code form
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'An unexpected error occurred');
            } finally {
                setIsLoading(false);
            }
        },
    });

    // Reset Code Formik setup
    const resetCodeFormik = useFormik({
        initialValues: { resetCode: '' },
        validationSchema: Yup.object({
            resetCode: Yup.string()
                .matches(/^\d{6}$/, 'Reset Code must be a 6-digit number')
                .required('Reset Code is required'),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            setErrorMessage('');
            try {
                const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
                    resetCode: values.resetCode
                });
                console.log(response);
                navigate('/RestPassword'); 

            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'An unexpected error occurred');
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <>
            <Helmet>
                <title>Forget Password</title>
            </Helmet>
            <div className='font-medium p-40 w-3/4 m-auto'>
                {formStatus ? (
                    <>
                        <h1 className='text-4xl text-green-800 font-bold text-center mb-8'>Forget Password</h1>
                        <form onSubmit={emailFormik.handleSubmit}>
                            <label htmlFor="email" className='block mb-2 text-green-800 font-semibold'>Enter Your Email :</label>
                            <input
                                name='email'
                                onChange={emailFormik.handleChange}
                                onBlur={emailFormik.handleBlur}
                                value={emailFormik.values.email || ''}
                                type="email"
                                className='w-full py-1 rounded-md px-2 outline-0 border mb-5 border-gray-400 search'
                                placeholder='Email'
                                id='email'
                            />
                            {emailFormik.errors.email && emailFormik.touched.email ? (
                                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                    <span className="font-medium">{emailFormik.errors.email}</span>
                                </div>
                            ) : null}
                            {errorMessage && (
                                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                    <span className="font-medium">{errorMessage}</span>
                                </div>
                            )}
                            <button type='submit' className='px-16 py-2 bg-green-800 text-white rounded'>
                                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Send'}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h1 className='text-4xl text-green-800 font-bold text-center mb-8'>Verify Code</h1>
                        <form onSubmit={resetCodeFormik.handleSubmit}>
                            <label htmlFor="resetCode" className='block mb-2 text-green-800 font-semibold'>Enter Reset Code :</label>
                            <input
                                name='resetCode'
                                onChange={resetCodeFormik.handleChange}
                                onBlur={resetCodeFormik.handleBlur}
                                value={resetCodeFormik.values.resetCode || ''}
                                type="text"
                                className='w-full py-1 rounded-md px-2 outline-0 border mb-5 border-gray-400 search'
                                placeholder='Reset Code'
                                id='resetCode'
                            />
                            {resetCodeFormik.errors.resetCode && resetCodeFormik.touched.resetCode ? (
                                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                    <span className="font-medium">{resetCodeFormik.errors.resetCode}</span>
                                </div>
                            ) : null}
                            {errorMessage && (
                                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                    <span className="font-medium">{errorMessage}</span>
                                </div>
                            )}
                            <button type='submit' className='px-16 py-2 bg-green-800 text-white rounded'>
                                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Verify Code'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </>
    );
}
