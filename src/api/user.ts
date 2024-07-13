import { AccountType, HotelType, UserType } from '../shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const fetchCurrentUser = async (): Promise<UserType> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: 'include',
        headers: {
            'Token': `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error('Error fetching user')
    }
    return response.json()
}


export const fetchAccountUser = async (): Promise<AccountType> => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/api/accounts`, {
            credentials: 'include',
            headers: {
                'Token': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch account data');
        }

        const accountData = await response.json();
        const res = await accountData.data
        return res as AccountType
    } catch (error) {
        console.error('Error fetching account data:', error);
        throw error; 
    }
};


export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/${hotelId}`, {
        credentials: 'include',
    })
    if (!response.ok) {
        throw new Error('Error fetching hotels')
    }
    return response.json()
}
