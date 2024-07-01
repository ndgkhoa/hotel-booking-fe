import React from 'react'
import { useForm } from 'react-hook-form'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import * as apiClient from '../../api/booking'
import { toast } from 'react-toastify'
import { useGuestInfoContext } from '../../contexts/GuestInfoContext'
import { useAppContext } from '../../contexts/AppContext'
import { BookingFormData, PaymentIntentResponse, UserType } from '../../shared/types'

type Props = {
    currentUser: UserType
    paymentIntent: PaymentIntentResponse
}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
    const stripe = useStripe()
    const elements = useElements()
    const { hotelId } = useParams()
    const { guestInfo } = useGuestInfoContext()
    const { isLoggedIn } = useAppContext()

    const { mutate: bookRoom, isLoading } = useMutation(apiClient.createRoomBooking, {
        onSuccess: () => {
            toast.success('Booking saved!')
        },
        onError: () => {
            toast.error('Error saving booking')
        },
    })

    const { register, handleSubmit } = useForm<BookingFormData>({
        defaultValues: {
            firstName: isLoggedIn ? currentUser.firstName : 'Unknown',
            lastName: isLoggedIn ? currentUser.lastName : 'Unknown',
            email: isLoggedIn ? currentUser.email : guestInfo.email,
            phone: isLoggedIn ? currentUser.phone : guestInfo.phone,
            hotelId: hotelId,
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId,
        },
    })

    const onSubmit = async (formData: BookingFormData) => {
        if (!stripe || !elements) {
            return
        }
        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement,
            },
        })
        if (result.paymentIntent?.status === 'succeeded') {
            bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
        >
            <span className="text-3xl font-bold">Confirm Your Details</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm gap-6">
                    First Name
                    <input
                        className="border border-slate-200 w-full p-3 rounded-md"
                        type="text"
                        {...register('firstName', { required: 'This field is required' })}
                        disabled={isLoggedIn}
                    />
                </label>
                <label className="text-gray-700 text-sm gap-6">
                    Last Name
                    <input
                        className="border border-slate-200 w-full p-3 rounded-md"
                        type="text"
                        {...register('lastName', { required: 'This field is required' })}
                        disabled={isLoggedIn}
                    />
                </label>
                <label className="text-gray-700 text-sm gap-6">
                    Email
                    <input
                        className="border border-slate-200 w-full p-3 rounded-md"
                        type="email"
                        {...register('email', {
                            required: 'This field is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address',
                            },
                        })}
                        disabled={isLoggedIn}
                    />
                </label>
                <label className="text-gray-700 text-sm gap-6">
                    Phone
                    <input
                        className="border border-slate-200 w-full p-3 rounded-md"
                        type="tel"
                        {...register('phone', {
                            required: 'This field is required',
                            pattern: {
                                value: /^[0-9]{10,15}$/,
                                message: 'Invalid phone number',
                            },
                        })}
                        disabled={isLoggedIn}
                    />
                </label>
            </div>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Your Price Summary</h2>
                <div className="bg-blue-200 p-4 rounded-md">
                    <div className="font-semibold text-lg">Total Cost: ${paymentIntent.totalCost}</div>
                    <div className="text-xs">Includes taxes and charges</div>
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Payment Details</h3>
                <CardElement id="payment-element" className="border rounded-md p-2 text-sm" />
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 text-white w-64 p-3 rounded-md hover:bg-blue-600 disabled:bg-slate-200 disabled:cursor-not-allowed"
                    disabled={!stripe || !elements || isLoading}
                >
                    Confirm Booking
                </button>
            </div>
        </form>
    )
}

export default BookingForm
