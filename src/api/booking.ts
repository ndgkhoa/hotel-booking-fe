import { BookingDetailFormData, BookingFormData, HotelType, PaymentIntentResponse } from '../shared/types'

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

export const fetchMyBookings = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        credentials: 'include',
    })
    if (!response.ok) {
        throw new Error('Unable to fetch bookings')
    }
    return response.json()
}

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
