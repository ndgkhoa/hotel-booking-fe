import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as apiClient from '../api/auth';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { useState } from 'react';

export type SignInFormData = {
    username: string;
    password: string;
};

const SignIn = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async (data) => {
            toast.success('Sign in successful!');
            localStorage.setItem('token', data.token); 
            setIsLoggedIn(true);
            navigate(location.state?.from?.pathname || '/');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-300 to-sky-200">
            <div className="flex items-center justify-center w-full opacity-90">
                <form
                    className="bg-white p-8 rounded-lg shadow-lg max-w-md space-y-6 border-t-4 border-gray-500"
                    onSubmit={onSubmit}
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded mb-8"
                    >
                        Back
                    </button>
                    <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Username</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                                {...register('username', {
                                    required: 'This field is required',
                                })}
                            />
                            {errors.username && (
                                <span className="text-red-500 text-sm">{errors.username.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                                    {...register('password', {
                                        required: 'This field is required',
                                        minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                    })}
                                />
                                <button
                                    type="button"
                                    className="text-gray-400 absolute inset-y-0 right-0 px-3 py-2"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-red-500 text-sm">{errors.password.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Link className="text-blue-600 hover:underline text-sm mr-3" to="/register">
                            Not Registered? Create an account here
                        </Link>
                        <button
                            type="submit"
                            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500 font-bold"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
