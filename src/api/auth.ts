import { RegisterFormData } from '../pages/Register'
import { SignInFormData } from '../pages/SignIn'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    const responseBody = await response.json()
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
}

export const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found');
    }
    const response = await fetch(`${API_BASE_URL}/api/auth/verify-token`, {
        credentials: 'include',
        headers: {
            'Token': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Token invalid');
    }
    return response.json();
}

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    const responseBody = await response.json()
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
    return responseBody
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    })
    if (!response.ok) {
        throw new Error('Error during sign out')
    }
}
