import * as zod from 'zod'


export const schema = zod.object({


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
   
  
  })