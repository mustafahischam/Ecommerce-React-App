import React from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button, Select, SelectItem, Card, CardBody } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendRegisterRequest } from '../Services/authServices'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { schema } from '../Schema/registerSchema'





export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({

    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    },
    resolver: zodResolver(schema),
    mode: 'onChange'
  })
  const navigate = useNavigate();


  async function signUp(userData) {
    setLoading(true);
    setApiError(null);

    const response = await sendRegisterRequest(userData);

    if (response?.message === 'success') {

      console.log('Registration successful:', response);
      navigate('/login');
    } else {
      const errorMessage = response?.error || response?.message || 'Something went wrong';
      setApiError(errorMessage);
      console.log(errorMessage);
    }

    setLoading(false);
  }




  return (
    <div className="w-full flex justify-center p-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <h1 className="text-2xl font-bold text-center mb-6">Create an account</h1>
          <form noValidate onSubmit={handleSubmit(signUp)} className="flex flex-col gap-4">
            <Input label="Name" placeholder="Enter your name" isRequired isInvalid={!!errors.name} errorMessage={errors.name?.message} {...register('name')} />
            <Input type="email" label="Email" placeholder="Enter your email" isRequired isInvalid={!!errors.email} errorMessage={errors.email?.message} {...register('email')} />
            <Input type="password" label="Password" placeholder="Enter your password" isRequired isInvalid={!!errors.password} errorMessage={errors.password?.message} {...register('password')} />
            <Input type="password" label="Confirm Password" placeholder="Re-enter your password" isRequired isInvalid={!!errors.rePassword} errorMessage={errors.rePassword?.message} {...register('rePassword')} />
            <div className="flex flex-col sm:flex-row gap-4">
              <Input type="date" className="flex-1 [&_input]:bg-white [&_input]:text-black [&_input::-webkit-calendar-picker-indicator]:filter-none" label="Date of Birth" isRequired isInvalid={!!errors.dateOfBirth} errorMessage={errors.dateOfBirth?.message} {...register('dateOfBirth')} />
              <Select className="flex-1" label="Gender" isRequired isInvalid={!!errors.gender} errorMessage={errors.gender?.message} placeholder="Select your gender" {...register('gender')}>
                <SelectItem key="male">Male</SelectItem>
                <SelectItem key="female">Female</SelectItem>
              </Select>
            </div>

            <div>if you have an account <Link className='text-blue-500' to="/login">Sign In</Link></div>
            <Button isLoading={loading} color="primary" type="submit">Register</Button>
            {apiError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{apiError}</div>}
          </form>
        </CardBody>
      </Card>
    </div>
  )
}