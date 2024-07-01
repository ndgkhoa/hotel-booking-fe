import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllBookingDetails } from '../api/booking';
import { BookingDetailFormData } from '../shared/types';
import { BiHotel, BiMoney } from 'react-icons/bi';

const MyBookings = () => {
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState<BookingDetailFormData[]>([]);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const data = await fetchAllBookingDetails();
                setBookingDetails(data);
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
        };

        fetchBookingDetails();
    }, []); 

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
                {bookingDetails.map((booking) => (
                    <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
                        <h3 className="text-2xl font-bold">Booking ID: {booking.bookingId}</h3>
                        <div className="whitespace-pre-line">Hotel ID: {booking.hotelId}</div>
                        <div className="whitespace-pre-line">Receipt ID: {booking.receiptId}</div>
                        <div className="grid grid-cols-5 gap-2">
                            
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiHotel className="mr-1" />
                                {booking.adultCount} adults, {booking.childCount} children
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiMoney className="mr-1" />
                                Total Cost: {booking.totalCost}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
};

export default MyBookings;
