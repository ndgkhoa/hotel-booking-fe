import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api/auth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    birthday: Date;
    address: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            toast.success('Registration success!');
            await queryClient.invalidateQueries('verifyToken');
            navigate('/');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-300 to-sky-200"
        >
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
                    <h2 className="text-3xl font-bold text-center text-gray-800">Create an account</h2>
                    <div className="flex flex-col md:flex-row gap-5">
                        <label className="text-gray-700 text-sm font-bold flex-1">
                            First Name
                            <input
                                type="text"
                                className="border rounded py-2 px-3 w-full font-normal"
                                {...register('firstName', { required: 'This field is required' })}
                            />
                            {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                        </label>
                        <label className="text-gray-700 text-sm font-bold flex-1">
                            Last Name
                            <input
                                type="text"
                                className="border rounded py-2 px-3 w-full font-normal"
                                {...register('lastName', { required: 'This field is required' })}
                            />
                            {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                        </label>
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <label className="text-gray-700 text-sm font-bold flex-1">
                            Birthday
                            <input
                                type="date"
                                className="border rounded py-2 px-3 w-full font-normal"
                                {...register('birthday', {
                                    required: 'This field is required',
                                })}
                            />
                            {errors.birthday && <span className="text-red-500">{errors.birthday.message}</span>}
                        </label>

                        <label className="text-gray-700 text-sm font-bold flex-1">
                            Phone
                            <input
                                type="tel"
                                className="border rounded py-2 px-3 w-full font-normal"
                                {...register('phone', {
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: 'Invalid phone number, must be 10 digits',
                                    },
                                })}
                            />
                            {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                        </label>
                    </div>
                    <label className="text-gray-700 text-sm font-bold flex-1">
                        Email
                        <input
                            type="email"
                            className="border rounded py-2 px-3 w-full font-normal"
                            {...register('email', {
                                required: 'This field is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </label>
                    <label className="text-gray-700 text-sm font-bold flex-1">
                        Address
                        <input
                            type="text"
                            className="border rounded py-2 px-3 w-full font-normal"
                            {...register('address', {
                                required: 'This field is required',
                                minLength: {
                                    value: 5,
                                    message: 'Address must be at least 5 characters long',
                                },
                            })}
                        />
                        {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                    </label>
                    <label className="text-gray-700 text-sm font-bold flex-1">
                        Username
                        <input
                            type="text"
                            className="border rounded py-2 px-3 w-full font-normal"
                            {...register('username', {
                                required: 'This field is required',
                            })}
                        />
                        {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                    </label>
                    <label className="text-gray-700 text-sm font-bold flex-1">
                        Password
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="border rounded py-2 px-3 w-full font-normal"
                                {...register('password', {
                                    required: 'This field is required',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                })}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </label>
                    <label className="text-gray-700 text-sm font-bold flex-1">
                        Confirm Password
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="border rounded py-2 px-3 w-full font-normal"
                                {...register('confirmPassword', {
                                    validate: (val) => {
                                        if (!val) {
                                            return 'This field is required';
                                        } else if (watch('password') !== val) {
                                            return 'Your password does not match';
                                        }
                                    },
                                })}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <span className="text-red-500">{errors.confirmPassword.message}</span>
                        )}
                    </label>
                    <div className="flex items-center justify-between">
                        <Link className="text-blue-600 hover:underline text-sm mr-3" to="/sign-in">
                            Have an account? Login here
                        </Link>
                        <button
                            type="submit"
                            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500 font-bold"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
