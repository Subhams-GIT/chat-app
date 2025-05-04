import z from 'zod'

export interface Signup{
    username:string,
    email:string,
    Password:string
}
export const signupSchema=z.object(
    {
        email:z.string().email(),
        username:z?.string().max(18).min(4),
        Password:z.string().min(8)
    }
)