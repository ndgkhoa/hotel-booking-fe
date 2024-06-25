import { CategoryType } from '../shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const fetchCategories = async (): Promise<CategoryType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/categories`)
    if (!response.ok) {
        throw new Error('Error fetching categories')
    }
    const data = await response.json()
    return data.data
}
