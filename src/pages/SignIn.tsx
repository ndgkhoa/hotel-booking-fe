import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as apiClient from '../api/auth'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'

export type SignInFormData = {
    username: string
    password: String
}

const SignIn = () => {
    const navigate = useNavigate()
    const { setIsLoggedIn } = useAppContext()
    const location = useLocation()
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<SignInFormData>()

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            toast.success('Sign in successful!')
            setIsLoggedIn(true)
            navigate(location.state?.from?.pathname || '/')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Username
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register('username', {
                        required: 'This field is required',
                    })}
                />
                {errors.username && <span className="text-red-500">{errors.username.message}</span>}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register('password', {
                        required: 'This field is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    })}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Not Registered?{' '}
                    <Link className="underline" to="/register">
                        Create an account here
                    </Link>
                </span>
                <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                    Login
                </button>
            </span>
        </form>
    )
}
export default SignIn
