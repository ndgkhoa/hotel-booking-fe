import {  BookingDetailType, BookingFormType, BookingType, HotelType,} from '../shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''


export const createRoomBooking = async (formData: BookingFormType, roomId: string,) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/bookings/${roomId}`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
            'Token': `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    const booking = await response.json();
        return booking;
}

export const fetchMyBooking = async (): Promise<BookingType[]> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/bookings/`, {
        credentials: 'include',
        headers: {
            'Token': `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Error fetching bookings')
    }
    const data = await response.json()
    const res = await data.data
    return res
};

export const fetchBooking = async (bookingId: string): Promise<BookingType> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
        credentials: 'include',
        headers: {
            'Token': `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Error fetching bookings')
    }
    const data = await response.json()
    const res = await data.data
    return res
};

export const fetchHotelFromBookingId = async (bookingId: string): Promise<HotelType> => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/get-hotel`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Token': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const res = await data.data
        return res;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export const fetchAllBookingDetails = async (): Promise<BookingDetailType[]> => {
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

        return data.data as BookingDetailType[];
    } catch (error) {
        console.error('Error fetching booking details:', error);
        throw error; 
    }
};

export const createBookingDetail = async (formData: BookingDetailType) => {
    const response = await fetch(`${API_BASE_URL}/api/receipts/${formData._id}/payment`, {
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
