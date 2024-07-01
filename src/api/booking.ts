import { BookingDetailFormData, BookingFormData, BookingType, PaymentIntentResponse } from '../shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const createPaymentIntent = async (
    hotelId: string,
    checkIn: Date,
    checkOut: Date,
    numberOfNights: string,
): Promise<PaymentIntentResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${hotelId}`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ checkIn, checkOut, numberOfNights }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error('Error fetching payment intent')
    }
    return response.json()
}

export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/receipts/${formData.hotelId}/payment`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error('Error booking room')
    }
}

export const fetchMyBookings = async (): Promise<BookingType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/bookings/`, {
        credentials: 'include',
    })
    if (!response.ok) {
        throw new Error('Unable to fetch bookings')
    }
    return response.json()
}

export const fetchAllBookingDetails = async (): Promise<BookingDetailFormData[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/bookingdetails`, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Unable to fetch booking details');
        }

        const data = await response.json();

        if (!Array.isArray(data.data)) {
            throw new Error('Data fetched is not in the expected format');
        }

        return data.data as BookingDetailFormData[];
    } catch (error) {
        console.error('Error fetching booking details:', error);
        throw error; 
    }
};

export const createBookingDetail = async (formData: BookingDetailFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/receipts/${formData.hotelId}/payment`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error('Error create booking detail')
    }
}


