import React, { useContext, useEffect, useState } from 'react'
// import Style from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';
export default function Register() {

  let navigate = useNavigate()
  let { setuserLogin } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleRegister(formValues) {
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formValues)
      .then( (res)=>{
        if(res.data.message=='success'){
          setIsLoading(false)
          setuserLogin(res.data.token)
          navigate("/")
          localStorage.setItem('token',res.data.token)
        } 
      } )
      .catch((res) => {
        setIsLoading(false)
        setErrorMessage(res?.response?.data?.message)
      })
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Name minimum length is 3 letters').max(10, 'Name maximum length is 10 letters').required('Name is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone number must be a valid egyption number').required('Phone number is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,15}$/, 'Password must start with uppercase and at least be 15 letters').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Repassword should match password').required('Repassword is required')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister
  })

  return <>
        <Helmet><title>Register</title></Helmet>
    <div className="container py-32 mx-auto px-40 w-3/4">
      <h1 className='text-4xl text-green-800 font-bold  mb-8'>Register Now:</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name" className='block mb-2 text-green-800 font-semibold'>Enter Your Name :</label>
        <input name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" className='w-full py-1 rounded-md px-2 outline-0 border mb-5 border-gray-400 search' placeholder='Name' id='name' />

        {formik.errors.name && formik.touched.name ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.name}</span>
          </div> : null
        }

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
        <label htmlFor="repassword" className='block mb-2 text-green-800 font-semibold'>Enter Your Repassword :</label>
        <input name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" className='w-full py-1 rounded-md px-2 outline-0 mb-5 border border-gray-400 search' placeholder='Repassword' id='repassword' />

        {formik.errors.rePassword && formik.touched.rePassword ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.rePassword}</span>
          </div> : null
        }
        <label htmlFor="phone" className='block mb-2 text-green-800 font-semibold'>Enter Your Phone :</label>
        <input name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" className='w-full py-1 rounded-md px-2 outline-0 mb-7 border border-gray-400 search' placeholder='Phone' id='phone' />

        {formik.errors.phone && formik.touched.phone ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.phone}</span>
          </div> : null
        }

        {errorMessage ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span className="font-medium">{errorMessage}</span>
          </div> : null
        }
        <div className='text-center'>
          <button type='submit' className='px-16 py-2 bg-green-800 text-white rounded'>
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Register'}
          </button>
        </div>

      </form>
    </div>
  </>
}