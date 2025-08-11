import React from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button, Select, SelectItem, Card, CardBody } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendLoginData } from '../Services/authServices'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { schema } from '../Schema/loginSchema'
import { AuthContext } from '../Context/AuthContext'




export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {

      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
    mode: 'onChange'
  })
  const navigate = useNavigate();
   const{setIsLoggedIn} = useContext(AuthContext);

  async function signUp(userData) {
    setLoading(true);
    setApiError(null);

    const response = await sendLoginData(userData);

    if (response?.message === 'success') {

      localStorage.setItem('token', response.token);
      setIsLoggedIn(response.token);
      navigate('/');

    } else {
      const errorMessage = response?.error || response?.message;
      setApiError(errorMessage);
      console.log(errorMessage);
    }

    setLoading(false);
  }




  return (
    <div className="w-full flex justify-center p-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <form noValidate onSubmit={handleSubmit(signUp)} className="flex flex-col gap-4">

            <Input type="email" label="Email" placeholder="Enter your email" isRequired isInvalid={!!errors.email} errorMessage={errors.email?.message} {...register('email')} />

            <Input type="password" label="Password" placeholder="Enter your password" isRequired isInvalid={!!errors.password} errorMessage={errors.password?.message} {...register('password')} />

            <div>if you don't have an account <Link className='text-blue-500' to="/register">Sign Up</Link></div>
            <Button isLoading={loading} color="primary" type="submit">Login</Button>
            {apiError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{apiError}</div>}
          </form>
        </CardBody>
      </Card>
    </div>
  )
}