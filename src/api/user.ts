import { HotelType, UserType } from '../shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const fetchCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: 'include',
    })
    if (!response.ok) {
        throw new Error('Error fetching user')
    }
    return response.json()
}

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/${hotelId}`, {
        credentials: 'include',
    })
    if (!response.ok) {
        throw new Error('Error fetching hotels')
    }
    return response.json()
}
