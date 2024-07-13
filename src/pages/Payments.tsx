import { useEffect, useState } from 'react';
import { BookingType, HotelType, UserType } from '../shared/types';
import { fetchBooking, fetchHotelFromBookingId } from '../api/booking';
import { useParams } from 'react-router-dom';
import { fetchCurrentUser } from '../api/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const Payments = () => {
    const [method, setMethod] = useState('');
    const [booking, setBooking] = useState<BookingType | null>(null);
    const [hotel, setHotel] = useState<HotelType | null>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [coupon, setCoupon] = useState<string>('');
    const [nights, setNights] = useState<number>(0);
    const { bookingId } = useParams<{ bookingId: string }>();

    useEffect(() => {
        fetchBookingData();
        fetchHotelData();
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userData = await fetchCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const postPaymentData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_BASE_URL}/api/receipts/${bookingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Token': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    totalCost,
                    method,
                    coupon,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error posting payment data:', error);
            throw error;
        }
    };

    const fetchHotelData = async () => {
        try {
            const hotelData = await fetchHotelFromBookingId(bookingId as string);
            setHotel(hotelData);
        } catch (error) {
            console.error('Error fetching hotel data:', error);
        }
    };

    const fetchBookingData = async () => {
        try {
            const bookingData = await fetchBooking(bookingId as string);
            setBooking(bookingData);
            setTotalCost(bookingData.totalCost);

            if (bookingData.checkIn && bookingData.checkOut) {
                const checkInDate = new Date(bookingData.checkIn);
                const checkOutDate = new Date(bookingData.checkOut);
                
                if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime())) {
                    const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
                    setNights(nights);
                }
            }
        } catch (error) {
            console.error('Error fetching booking data:', error);
        }
    };

    if (!booking || !hotel || !user) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="flex grid-cols-2">
            <div className="mr-5 w-1/2 border border-gray-200 p-2 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-center">Your Booking Details</h2>
                <div key={booking?._id} className="border-b py-2">
                    <p className="font-medium">Location: {hotel.name}, {hotel.city}, {hotel.country}</p>
                    <div className="flex justify-between mb-2">
                        <div>
                            <p className="font-medium">Check-in:</p>
                            <div>{formatDate(booking.checkIn)}</div>
                        </div>
                        <div>
                            <p className="font-medium mr-5">Check-out:</p>
                            <div>{formatDate(booking.checkOut)}</div>
                        </div>
                    </div>
                    <div className="border-t border-b py-2">
                        <p className="font-medium">Total length of stay:</p>
                        <div className="font-bold">{nights} nights</div>
                    </div>
                    <div>
                        <p className="font-medium">Guests:</p>
                        <div className="flex">
                            <span className="ml-2">{booking.adultCount} Adult</span>
                        </div>
                        <div className="flex">
                            <span className="ml-2">{booking.childCount} Child</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-2/3 border border-gray-200 p-2 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-center">Confirm Your Details</h2>
                <div className="flex justify-between">
                    <div className="border-b py-2">
                        <p className="font-medium">First Name:</p>
                        <input
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            className="border border-gray-200 ml-2 w-52 rounded-lg bg-gray-300 py-2"
                            readOnly
                        />
                    </div>
                    <div className="border-b py-2">
                        <p className="font-medium">Last Name:</p>
                        <input
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            className="border border-gray-200 ml-2 w-52 rounded-lg bg-gray-300 py-2"
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
                            className="border border-gray-200 ml-2 w-52 rounded-lg bg-gray-300 py-2"
                            readOnly
                        />
                    </div>
                    <div className="border-b py-2">
                        <p className="font-medium">Phone:</p>
                        <input
                            type="tel"
                            name="phone"
                            value={user.phone}
                            className="border border-gray-200 ml-2 w-52 rounded-lg bg-gray-300 py-2"
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
                </div>
                <div className="border-t py-2">
                    <div key={booking._id} className="border-b py-2">
                        <p className="font-medium">Total cost: ${totalCost}</p>
                    </div>
                </div>
                <div className=" border-b py-2">
                    <p className="font-medium">Choose your Payments:</p>
                    <select
                        className="w-1/5 p-2 border rounded-lg"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit card">Credit card</option>
                    </select>
                </div>
                {method === 'Credit card' && (
                    <div className="border-t py-2">
                        <p className="font-medium">Card Number:</p>
                        <input
                            type="number"
                            min={0}
                            className="p-2 border rounded-lg w-full"
                            placeholder="Enter your card number"
                        />
                    </div>
                )}
                <div className="flex justify-center mt-2">
                    <button
                        className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg p-3 font-medium"
                        onClick={postPaymentData}
                    >
                        Confirm Bookings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payments;
