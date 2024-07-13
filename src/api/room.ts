import { RoomType} from '../shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const addMyRoom = async (roomFormData: FormData, hotelId: string): Promise<RoomType> => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/api/rooms/${hotelId}`, {
            method: 'POST',
            credentials: 'include',
            body: roomFormData,
            headers: {
                'Token': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to add room');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to add room: ${error.message}`);
        }
        throw new Error('Failed to add room');
    }
};

export const fetchRooms = async (hotelId: string): Promise<RoomType[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/rooms/${hotelId}`);
      if (!response.ok) {
        throw new Error('Error fetching rooms');
      }
      const data = await response.json();
      return data.data as RoomType[];
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching rooms: ${error.message}`);
        } else {
          throw new Error('Unknown error occurred');
        }
      }
  };

  export const fetchRoomsById = async (roomId: string): Promise<RoomType> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}/detail`);
      if (!response.ok) {
        throw new Error('Error fetching rooms');
      }
      const data = await response.json();
      return data.data as RoomType;
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching rooms: ${error.message}`);
        } else {
          throw new Error('Unknown error occurred');
        }
      }
  };