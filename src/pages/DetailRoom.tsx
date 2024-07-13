import { useParams, useNavigate } from 'react-router-dom';
import * as apiClient from '../api/room';
import { useEffect, useState } from 'react';
import { RoomType } from '../shared/types';
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm';

const DetailRoom = () => {
    const [room, setRoom] = useState<RoomType>();
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const fetchedRoom = await apiClient.fetchRoomsById(roomId as string);
                setRoom(fetchedRoom);
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching room:', error.message);
                } else {
                    console.error('Unknown error occurred while fetching room');
                }
            }
        };
        fetchRoomData();
    }, [roomId]);

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <button
                onClick={() => navigate(-1)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded mb-6"
            >
                Back
            </button>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-center font-bold text-3xl mb-6">Room Details</h1>
                <div key={room?._id}>
                    <h1 className="text-2xl font-medium text-center my-4">{room?.name}</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                        {room?.imageUrls.map((image: string, index: number) => (
                            <div key={index} className="h-72">
                                <img
                                    src={image}
                                    alt={room.name}
                                    className="rounded-md w-full h-full object-cover object-center shadow-md"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                        {room?.facilities.map((facility: string, index: number) => (
                            <div key={index} className="border border-gray-300 rounded-md p-4 bg-gray-50 shadow-sm">
                                <p className="font-bold">Facility:</p>
                                <p>{facility}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        <div className="w-full lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow-md">
                            <GuestInfoForm
                                pricePerNight={room?.pricePerNight as number}
                                hotelId={room?.hotelId as string}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailRoom;
