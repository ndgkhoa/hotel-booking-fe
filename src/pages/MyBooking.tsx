import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {  fetchMyBooking } from '../api/booking'
import { BookingType } from '../shared/types'
import { BiMoney } from 'react-icons/bi'

const MyBookings = () => {
    const navigate = useNavigate()
    const [booking, setBookings] = useState<BookingType[]>([])
    const {userId} = useParams()

    useEffect(() => {
        const fetchMyBookingData = async () => {
            try {
                const bookingData = await fetchMyBooking()
                console.log(bookingData)
                setBookings(bookingData)
            } catch (error) {
                console.error('Error fetching my booking', error)
            }
        }

        fetchMyBookingData()
    }, [userId])

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    const handlePayments = (bookingId: string) => {
        navigate(`/${bookingId}/payments/`);
      };

    return (
        <div className="space-y-5">
            <button
                onClick={() => navigate(-1)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
            >
                Back
            </button>
            <span className=" flex justify-between">
                <h1 className="text-3xl font-bold">My Bookings</h1>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {booking.map((booking) => (
                    <div
                        className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
                        key={booking._id}
                    >
                        <h3 className="text-2xl font-bold">Booking ID: {booking._id}</h3>
                        <div className="whitespace-pre-line">Room ID: {booking.roomId}</div>
                        <div className="whitespace-pre-line">User ID: {booking.userId}</div>
                        <div className="whitespace-pre-line">Check-In: {formatDate(booking.checkIn)}</div>
                        <div className="whitespace-pre-line">Check-Out: {formatDate(booking.checkOut)}</div>
                        <div className="whitespace-pre-line">Status: {booking.status}</div>
                        <div className='flex justify-between items-center'>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center w-1/5 font-medium">
                                <BiMoney className="mr-2 text-green-700" />
                                Total Cost: ${booking.totalCost}
                            </div>
                            <div className=''>
                                <button className="text-white bg-blue-600 hover:bg-blue-700 font-medium p-2 rounded-lg mr-2" onClick={() => handlePayments(booking._id)}>Payments</button>
                                <button className="text-white bg-red-600 hover:bg-red-700 font-medium p-2 rounded-lg">Cancel</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBookings
