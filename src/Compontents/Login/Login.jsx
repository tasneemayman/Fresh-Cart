import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Login() {

  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  let { setuserLogin } = useContext(UserContext)
  async function handleLogin(formValues) {
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      .then((res) => {
        console.log(res.data.token);
        if (res.data.message == 'success') {
          setIsLoading(false)
          setuserLogin(res.data.token)
          navigate('/')
          localStorage.setItem('token', res.data.token)
        }
      })
      .catch((res) => {
        setIsLoading(false)
        setErrorMessage(res?.response?.data?.message)
      })
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase and at least be 10 letters').required('Password is required'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    },
    validationSchema: validationSchema,
    onSubmit: handleLogin
  })

  return <>
    <Helmet><title>Login</title></Helmet>
    <div className="container py-36 mx-auto px-40 w-3/4">
      <h1 className='text-4xl text-green-800 font-bold text-center mb-8'>Login Now</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className='block mb-2 text-green-800 font-semibold'>Enter Your Email :</label>
        <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className='w-full py-1 rounded-md px-2 outline-0 border mb-5 border-gray-400 search' placeholder='Email' id='email' />

        {formik.errors.email && formik.touched.email ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.email}</span>
          </div> : null
        }

        <label htmlFor="password" className='block mb-2 text-green-800 font-semibold'>Enter Your Password :</label>
        <input name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" className='w-full py-1 rounded-md px-2 outline-0 mb-5 border border-gray-400 search' placeholder='Password' id='password' />

        {formik.errors.password && formik.touched.password ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.password}</span>
          </div> : null
        }


        {errorMessage ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span className="font-medium">{errorMessage}</span>
          </div> : null
        }
        <div className='flex justify-between items-center '>
          <Link to={"/ForgetPassword"} className='text-green-800 font-medium'>Forget Your Password ?</Link >
          <button type='submit' className='px-16 py-2 bg-green-800 text-white rounded'>
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Login'}
          </button>

        </div>
      </form>
    </div>
  </>
}