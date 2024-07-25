import { useEffect, useState } from 'react'
import { BookingType, HotelType, UserType } from '../shared/types'
import { fetchBooking, fetchHotelFromBookingId } from '../api/booking'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCurrentUser } from '../api/user'
import { toast } from 'react-toastify'
import { applyCouponCode } from '../api/coupon'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const Payments = () => {
    const navigate = useNavigate()
    const [method, setMethod] = useState('')
    const [booking, setBooking] = useState<BookingType | null>(null)
    const [hotel, setHotel] = useState<HotelType | null>(null)
    const [user, setUser] = useState<UserType | null>(null)
    const [totalCost, setTotalCost] = useState<number>(0)
    const [coupon, setCoupon] = useState<string>('')
    const [nights, setNights] = useState<number>(0)
    const { bookingId } = useParams<{ bookingId: string }>()

    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        fetchBookingData()
        fetchHotelData()
        fetchUserData()
    }, [])

    const fetchUserData = async () => {
        try {
            const userData = await fetchCurrentUser()
            setUser(userData)
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    const applyCoupon = async () => {
        if (coupon) {
            try {
                const discountedCost = await applyCouponCode(bookingId as string, coupon, totalCost)
                setTotalCost(discountedCost)
                toast.success('Coupon applied successfully!')
            } catch (error) {
                toast.error('Error applying coupon: ' + error)
            }
        } else {
            toast.error('Please enter a coupon code')
        }
    }

    const postPaymentData = async () => {
        if (method === 'Stripe' && stripe && elements) {
            const cardElement = elements.getElement(CardElement)
            if (!cardElement) {
                toast.error('Card element not found')
                return
            }

            const { token: stripeToken, error } = await stripe.createToken(cardElement)
            if (error) {
                toast.error('Error creating token: ' + error.message)
                return
            }

            const stripeTokenId = stripeToken?.id

            if (!stripeTokenId) {
                toast.error('Token creation failed')
                return
            }

            const authToken = localStorage.getItem('token')
            try {
                const response = await fetch(`${API_BASE_URL}/api/receipts/${bookingId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Token: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        totalCost,
                        method,
                        coupon,
                        paymentMethodId: stripeTokenId,
                    }),
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()
                toast.success('Payment successfully!')
                navigate('/')
                return data
            } catch (error) {
                console.error('Error posting payment data:', error)
                toast.error('Error posting payment data')
                throw error
            }
        } else {
            const authToken = localStorage.getItem('token')
            try {
                const response = await fetch(`${API_BASE_URL}/api/receipts/${bookingId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Token: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        totalCost,
                        method,
                        coupon,
                    }),
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()
                toast.success('Payment successfully!')
                navigate('/')
                return data
            } catch (error) {
                console.error('Error posting payment data:', error)
                toast.error('Error posting payment data')
                throw error
            }
        }
    }

    const fetchHotelData = async () => {
        try {
            const hotelData = await fetchHotelFromBookingId(bookingId as string)
            setHotel(hotelData)
        } catch (error) {
            console.error('Error fetching hotel data:', error)
        }
    }

    const fetchBookingData = async () => {
        try {
            const bookingData = await fetchBooking(bookingId as string)
            setBooking(bookingData)
            setTotalCost(bookingData.totalCost)

            if (bookingData.checkIn && bookingData.checkOut) {
                const checkInDate = new Date(bookingData.checkIn)
                const checkOutDate = new Date(bookingData.checkOut)

                if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime())) {
                    const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24))
                    setNights(nights)
                }
            }
        } catch (error) {
            console.error('Error fetching booking data:', error)
        }
    }

    if (!booking || !hotel || !user) {
        return <div>Loading...</div>
    }

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    return (
        <div className="flex grid-cols-2 sm:grid-cols-1">
            <div className="mr-5 w-full border border-gray-200 p-2 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-center">Your Booking Details</h2>
                <div key={booking?._id} className="border-b py-2">
                    <div className="border-t border-b py-2">
                        <p>Location:</p>
                        <div className="font-bold">
                            {hotel.name}, {hotel.city}, {hotel.country}
                        </div>
                    </div>
                    <div className="flex justify-between mb-2">
                        <div>
                            <p>Check-in:</p>
                            <div className="font-bold">{formatDate(booking.checkIn)}</div>
                        </div>
                        <div>
                            <p>Check-out:</p>
                            <div className="font-bold">{formatDate(booking.checkOut)}</div>
                        </div>
                    </div>
                    <div className="border-t border-b py-2">
                        <p>Total length of stay:</p>
                        <div className="font-bold">{nights} nights</div>
                    </div>
                    <div>
                        <p>Guests:</p>
                        <div className="flex">
                            <span className="font-bold">{booking.adultCount} adults</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold">{booking.childCount} child</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-4/5 border border-gray-200 p-2 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-center">Confirm Your Details</h2>
                <div className="flex justify-between">
                    <div className="border-b py-2">
                        <p className="font-medium">First Name:</p>
                        <input
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            className="border border-gray-200 ml-2 w-52 rounded-lg bg-gray-300 py-2 pl-2 font-medium md:w-20"
                            readOnly
                        />
                    </div>
                    <div className="border-b py-2">
                        <p className="font-medium">Last Name:</p>
                        <input
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            className="border border-gray-200 ml-2 w-52 rounded-lg bg-gray-300 py-2 pl-2 font-medium md:w-20"
                            readOnly
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="border-b py-2">
                        <p className="font-medium">Email:</p>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            className="border border-gray-200 ml-2 w-52 rounded-lg bg-gray-300 py-2 pl-2 font-medium"
                            readOnly
                        />
                    </div>
                    <div className="border-b py-2">
                        <p className="font-medium">Phone:</p>
                        <input
                            type="tel"
                            name="phone"
                            value={user.phone}
                            className="border border-gray-200 ml-2 w-52 rounded-lg bg-gray-300 py-2 pl-2 font-medium md:w-28"
                            readOnly
                        />
                    </div>
                </div>
                <div className="border-t py-2">
                    <p className="font-medium">Coupons:</p>
                    <input
                        type="text"
                        className="p-2 border rounded-lg w-full"
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Enter your coupon"
                    />
                    <button
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mr-2 mb-2"
                        onClick={applyCoupon}
                    >
                        Apply Coupon
                    </button>
                </div>
                <div className="border-t py-2">
                    <div key={booking._id} className="border-b py-2 flex">
                        <p className="font-medium">Total cost: </p>
                        <div className="font-bold ml-2">${totalCost}</div>
                    </div>
                </div>
                <div className=" py-2">
                    <p className="font-medium">Choose your Payments Method:</p>
                    <select
                        className="w-1/4 p-2 border rounded-lg"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="">Select Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Stripe">Stripe</option>
                    </select>
                </div>
                {method === 'Stripe' && (
                    <div>
                        <CardElement className="border p-2 rounded" />
                    </div>
                )}
                <div className="flex justify-center mt-2">
                    <button
                        className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg p-3 font-medium"
                        onClick={postPaymentData}
                        disabled={!stripe || !elements}
                    >
                        Confirm Bookings
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Payments
