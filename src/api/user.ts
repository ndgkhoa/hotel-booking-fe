import { HotelType } from '../shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/${hotelId}`, {
        credentials: 'include',
    })
    if (!response.ok) {
        throw new Error('Error fetching hotels')
    }
    return response.json()
}
