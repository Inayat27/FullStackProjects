import { z } from "zod"

export const SignInValiadtion = z.object({
    email: z.string().email(),
    password:z.string().min(6,{
        message:'Must be greater than 6'
    })
  })



  export const SignupValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  });