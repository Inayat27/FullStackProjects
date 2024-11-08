import { INewUser } from '@/types'
import 
{
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
    Mutation,
} from '@tanstack/react-query'
import { createUserAccount,SignInAccount } from '../appwrite/api'



export const useCreateUserAccount= () =>
{
    return useMutation({
        mutationFn:(user:INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () =>
{
    return useMutation({
        mutationFn:(user:{email:string; password:string; }) => SignInAccount(user)
    })
}