const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const getSupplierCoupons = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/api/coupons`, {
            method: 'GET',
            headers: {
                'Token': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching supplier coupons:', error);
        throw new Error('Failed to get supplier coupons');
    }
}

export const applyCouponCode  = async (bookingId: string, coupon: string, totalCost: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/coupons/${bookingId}/use-coupon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                coupon,
                totalCost,
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        const data = await response.json();
        console.log('Total cost after discount:', data.data);
        return data.data;
    } catch (error) {
        console.error('Error using coupon:', error);
        throw error;
    }
}
