import * as zod from 'zod'


export const schema = zod.object({

    name: zod.string().nonempty('Name is required').
    min(2, 'Name must be at least 2 characters long').
    max(50, 'Name must be less than 50 characters long').
    regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
   
    email: zod.string().nonempty('Email is required').
    email('Please enter a valid email address').
    max(100, 'Email must be less than 100 characters'),
    
    password: zod.string().nonempty('Password is required').
    min(8, 'Password must be at least 8 characters long').
    max(50, 'Password must be less than 50 characters').
    regex(/[A-Z]/, 'Password must contain at least one uppercase letter').
    regex(/[a-z]/, 'Password must contain at least one lowercase letter').
    regex(/[0-9]/, 'Password must contain at least one number').
    regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
   
    rePassword: zod.string().nonempty('Please confirm your password'),
   
    dateOfBirth: zod.string().nonempty('Date of birth is required').refine((date) => {
      const birthDate = new Date(date);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      return age >= 18;
    },
     'You must be at least 18 years old'),
    gender: zod.string().nonempty('Please select your gender').
    refine((value) => ['male', 'female'].includes(value), 'Please select a valid gender'),
  }).refine((data) => data.password === data.rePassword,
   { path: ['rePassword'], message: 'Passwords must match' });