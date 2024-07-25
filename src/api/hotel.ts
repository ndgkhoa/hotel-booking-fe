import { HotelSearchResponse, HotelType, SearchParams } from '../shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
        method: 'POST',
        credentials: 'include',
        body: hotelFormData,
    })
    if (!response.ok) {
        throw new Error('Failed to add hotel')
    }
    return response.json()
}

export const fetchHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`)
    if (!response.ok) {
        throw new Error('Error fetching hotel')
    }
    const data = await response.json()
    const res = data.data
    return res
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Error fetching hotels')
    }
    return response.json()
}

export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelFormData.get('hotelId')}`, {
        method: 'PUT',
        body: hotelFormData,
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Failed to update Hotel')
    }
    return response.json()
}

export const searchHotel = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('city', searchParams.city || '');
    queryParams.append('country', searchParams.country || '');
    queryParams.append('hotelName', searchParams.hotelName || '');
    queryParams.append('limit', searchParams.limit?.toString() || '');
    queryParams.append('adultCount', searchParams.adultCount?.toString() || '');
    queryParams.append('childCount', searchParams.childCount?.toString() || '');
    queryParams.append('page', searchParams.page?.toString() || '');
    
    if (searchParams.facilities) {
        searchParams.facilities.forEach(facility => queryParams.append('facilities', facility));
    }
    
    if (searchParams.categories) {
        searchParams.categories.forEach(category => queryParams.append('categories', category));
    }
    
    if (Array.isArray(searchParams.maxStarRating)) {
        searchParams.maxStarRating.forEach(star => queryParams.append('maxStarRating', star));
    }

    if (Array.isArray(searchParams.maxPrice)) {
        searchParams.maxPrice.forEach(price => queryParams.append('maxPrice', price.toString()));
    }

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);
    
    if (!response.ok) throw new Error('Error fetching hotels');
    return response.json();
}


export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)
    if (!response.ok) {
        throw new Error('Error fetching Hotels')
    }
    const data = await response.json()
    return data.data
}

export const resetHotelStatus = async (hotelId: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/api/rooms/${hotelId}/reset-status`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Token': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to reset hotel status');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to reset hotel status: ${error.message}`);
        }
        throw new Error('Failed to reset hotel status');
    }
};
