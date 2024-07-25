import { useParams, useNavigate } from 'react-router-dom'
import * as apiClient from '../api/room'
import { useEffect, useState } from 'react'
import { RoomType } from '../shared/types'
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm'

const DetailRoom = () => {
    const [room, setRoom] = useState<RoomType>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalImageIndex, setModalImageIndex] = useState<number>(0)

    const { roomId } = useParams<{ roomId: string }>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const fetchedRoom = await apiClient.fetchRoomsById(roomId as string)
                setRoom(fetchedRoom)
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching room:', error.message)
                } else {
                    console.error('Unknown error occurred while fetching room')
                }
            }
        }
        fetchRoomData()
    }, [roomId])

    const openModal = (index: number) => {
        setModalImageIndex(index)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const goToNextImage = () => {
        if (room && room.imageUrls.length > 0) {
            setModalImageIndex((prevIndex) => (prevIndex + 1) % room.imageUrls.length)
        }
    }

    const goToPreviousImage = () => {
        if (room && room.imageUrls.length > 0) {
            setModalImageIndex((prevIndex) => (prevIndex === 0 ? room.imageUrls.length - 1 : prevIndex - 1))
        }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'ArrowRight') {
            goToNextImage();
        } else if (event.key === 'ArrowLeft') {
            goToPreviousImage();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [room, modalImageIndex]);

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
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2 mb-6">
                        {room?.imageUrls.map((image: string, index: number) => (
                            <div key={index} className="h-72">
                                <img
                                    src={image}
                                    alt={room.name}
                                    className="rounded-md w-full h-full object-cover object-center shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
                                    onClick={() => openModal(index)}
                                />
                            </div>
                        ))}
                    </div>
                    <p className="font-bold mb-3">Guest:</p>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                        <p className='border border-gray-300 rounded-md p-4 bg-gray-50 shadow-sm'>{room?.adultCount} Adults</p>
                        <p className='border border-gray-300 rounded-md p-4 bg-gray-50 shadow-sm'>{room?.childCount} Child</p>
                    </div>
                    <p className="font-bold mb-3">Facility:</p>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                        {room?.facilities.map((facility: string, index: number) => (
                            <div key={index} className="border border-gray-300 rounded-md p-4 bg-gray-50 shadow-sm">
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

            {isModalOpen && room && room.imageUrls.length > 0 && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={goToPreviousImage}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black border-2 border-gray-400 p-2 rounded-lg bg-gray-400 text-3xl w-14 flex items-center justify-center"
                        >
                            &lt;
                        </button>

                        <img
                            src={room.imageUrls[modalImageIndex]}
                            alt="Modal"
                            className="max-w-full max-h-screen object-contain rounded-lg"
                        />
                        <button
                            onClick={goToNextImage}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black border-2 border-gray-400 p-2 rounded-lg bg-gray-400 text-3xl w-14 flex items-center justify-center"
                        >
                            &gt;
                        </button>
                        <button onClick={closeModal} className="absolute top-4 right-4 text-white text-3xl">
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DetailRoom
