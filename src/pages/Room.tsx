import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoomType, HotelType } from '../shared/types';
import { fetchRooms } from '../api/room';
import { fetchHotelById } from '../api/hotel';
import { AiFillStar } from 'react-icons/ai';

const Rooms = () => {
    const [hotel, setHotel] = useState<HotelType | null>(null);
    const [rooms, setRooms] = useState<RoomType[]>([]);
    
    const { hotelId } = useParams<{ hotelId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const fetchedHotel = await fetchHotelById(hotelId as string);
                setHotel(fetchedHotel);
            } catch (error) {
                console.error('Error fetching hotel:', error);
            }
        };

        fetchHotelData();
    }, [hotelId]);

    useEffect(() => {
        const fetchRoomsData = async () => {
            try {
                const fetchedRooms = await fetchRooms(hotelId as string);
                setRooms(fetchedRooms);
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching rooms:', error.message);
                } else {
                    console.error('Unknown error occurred while fetching rooms');
                }
            }
        };

        fetchRoomsData();
    }, [hotelId]);

    if (!hotel) {
        return <div>Loading hotel information...</div>;
    }

    return (
        <div className="min-h-screen p-4 bg-gray-100">
            <button
                onClick={() => navigate(-1)}
                className="bg-blue-600 mb-3 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
            >
                Back
            </button>
            <div className="mb-10 text-lg">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-center">
                    <div className="flex items-end">
                        <span className="flex items-center mr-5">
                            <p className="mr-1 font-medium">Rating:</p>
                            {Array.from({ length: hotel.starRating }).map((_, index) => (
                                <AiFillStar key={index} className="fill-yellow-400 mt-1" />
                            ))}
                        </span>
                        <div className="text-3xl font-semibold">{hotel.name}</div>
                    </div>
                </div>
                <div className="mb-6">
                    <img
                        src={hotel.imageUrls[0]}
                        alt="Hotel"
                        className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                    <div className="mt-4">
                        <p className="font-medium text-lg">Address:</p>
                        <p className="text-gray-700">{hotel.city}, {hotel.country}</p>
                    </div>
                </div>
                <div className="mb-6">
                    <p className="font-medium text-lg">Category:</p>
                    <p className="text-gray-700">{hotel.categories}</p>
                </div>
                <div className="mb-6">
                    <p className="font-medium text-lg">Description:</p>
                    <p className="text-gray-700">{hotel.description}</p>
                </div>
            </div>
            <h2 className="text-center text-3xl mb-5 font-medium">List of available rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map((room) => (
                    <div key={room._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={room.imageUrls[0]} alt="Room" className="w-full h-72 object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-2 truncate">{room.name}</h2>
                            <p className="text-gray-600 mb-4 truncate">Facilities: {room.facilities}</p>
                            {room.status?<p className="text-gray-600 mb-4">Status: Available</p>:<p className="text-gray-600 mb-4">Status: Booked</p>}
                            <p className="text-gray-600 mb-4">Adult: {room.adultCount}</p>
                            <p className="text-gray-600 mb-4">Child: {room.childCount}</p>
                            <p className="text-gray-800 font-bold">Price: ${room.pricePerNight} per night</p>
                            {room.status ? <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => navigate(`/detail/${room._id}`)}
                                    className="text-white font-medium p-2 bg-blue-600 hover:bg-blue-500 rounded"
                                >
                                    View Detail
                                </button>
                            </div> : ""}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rooms;
