import { CommentType } from "../shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const getAllCommentsOfHotel = async (hotelId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/comments/${hotelId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.data; 
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}

export const postComment = async (hotelId: string, content: string): Promise<CommentType> => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/api/comments/${hotelId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': `Bearer ${token}`
            },
            credentials: 'include', 
            body: JSON.stringify({ content })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data: CommentType = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
}