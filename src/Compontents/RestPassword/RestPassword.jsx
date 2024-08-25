import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase and at least be 10 letters')
        .required('New Password is required'),
});

async function resetPassword(values, setIsLoading, setErrorMessage, navigate) {
    setIsLoading(true);
    setErrorMessage('');
    try {
        const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
            email: values.email,
            newPassword: values.newPassword,
        });
        console.log(response);
        if (response.data.token) {
            // Redirect or show a success message
            navigate('/Login'); 
        }
    } catch (error) {
        setErrorMessage(error.response?.data?.message || 'An unexpected error occurred');
    } finally {
        setIsLoading(false);
    }
}

export default function RestPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Ensure navigate is defined

    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        validationSchema,
        onSubmit: (values) => resetPassword(values, setIsLoading, setErrorMessage, navigate),
    });

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <div className='font-medium p-40 w-3/4 m-auto'>
                <h1 className='text-4xl text-green-800 font-bold text-center mb-8'>Reset Password</h1>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email" className='block mb-2 text-green-800 font-semibold'>Email:</label>
                    <input
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email || ''}
                        type="email"
                        className='w-full py-1 rounded-md px-2 outline-0 border mb-5 border-gray-400'
                        placeholder='Email'
                        id='email'
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">{formik.errors.email}</span>
                        </div>
                    ) : null}

                    <label htmlFor="newPassword" className='block mb-2 text-green-800 font-semibold'>New Password:</label>
                    <input
                        name='newPassword'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.newPassword || ''}
                        type="password"
                        className='w-full py-1 rounded-md px-2 outline-0 border mb-5 border-gray-400'
                        placeholder='New Password'
                        id='newPassword'
                    />
                    {formik.errors.newPassword && formik.touched.newPassword ? (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">{formik.errors.newPassword}</span>
                        </div>
                    ) : null}

                    {errorMessage && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">{errorMessage}</span>
                        </div>
                    )}

                    <button type='submit' className='px-16 py-2 bg-green-800 text-white rounded'>
                        {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Reset Password'}
                    </button>
                </form>
            </div>
        </>
    );
}
