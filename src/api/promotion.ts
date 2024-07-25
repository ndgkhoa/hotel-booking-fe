import { PromotionType } from './../shared/types';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const fetchAllPromotions = async (): Promise<PromotionType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/promotions`)
    if (!response.ok) {
        throw new Error('Error fetching promotions')
    }
    const data = await response.json()
    return data.data
}
