import { PaymentFormData } from "../shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const paymentReceipts = async (paymentForm: FormData, bookingId: string): Promise<PaymentFormData> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/receipts/${bookingId}`, {
        method: 'POST',
        credentials: 'include',
        body: paymentForm,
        headers: {
            'Token': `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error('Failed to payment')
    }
    return response.json()
}