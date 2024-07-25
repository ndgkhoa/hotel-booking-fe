import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RoomType, HotelType, CommentType, UserType } from '../shared/types'
import { fetchRooms } from '../api/room'
import { fetchHotelById, resetHotelStatus } from '../api/hotel'
import { AiFillStar } from 'react-icons/ai'
import { getAllCommentsOfHotel, postComment } from '../api/comment'
import { fetchCurrentUser } from '../api/user'

const DetailHotels = () => {
    const [hotel, setHotel] = useState<HotelType | null>(null)
    const [rooms, setRooms] = useState<RoomType[]>([])
    const [user, setUser] = useState<UserType | null>(null)
    const [reviews, setReviews] = useState<CommentType[]>([])
    const [commentContent, setCommentContent] = useState<string>('')
    const { hotelId } = useParams<{ hotelId: string }>()
    const navigate = useNavigate()

    useEffect(() => {
        resetHotelStatus(hotelId as string)
        fetchRoomsData()
        fetchHotelData()
        fetchCommentData()
        fetchUserInformation()
    }, [hotelId])

    const fetchUserInformation = async () => {
        try {
            const userData = await fetchCurrentUser()
            setUser(userData)
        } catch (error) {
            console.error('Error fetching user information:', error)
        }
    }

    const fetchHotelData = async () => {
        try {
            const fetchedHotel = await fetchHotelById(hotelId as string)
            setHotel(fetchedHotel)
        } catch (error) {
            console.error('Error fetching hotel:', error)
        }
    }

    const fetchCommentData = async () => {
        try {
            const fetchedComment = await getAllCommentsOfHotel(hotelId as string)
            setReviews(fetchedComment)
        } catch (error) {
            console.error('Error fetching hotel:', error)
        }
    }

    const fetchRoomsData = async () => {
        try {
            const fetchedRooms = await fetchRooms(hotelId as string)
            setRooms(fetchedRooms)
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching rooms:', error.message)
            } else {
                console.error('Unknown error occurred while fetching rooms')
            }
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const newComment = await postComment(hotelId as string, commentContent)
            setReviews([...reviews, newComment])
            setCommentContent('')
            fetchCommentData()
        } catch (error) {
            console.error('Error posting comment:', error)
        }
    }

    if (!hotel) {
        return <div>Loading hotel information...</div>
    }

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    return (
        <div className="min-h-screen p-4 bg-gray-100">
            <button
                onClick={() => navigate(-1)}
                className="bg-blue-600 mb-3 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
            >
                Back
            </button>
            <div className="">
                <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
                    <div className="mb-10 text-lg ">
                        <div className="flex flex-col md:flex-row items-center md:items-end justify-center">
                            <div className="flex items-end mb-2">
                                <span className="flex items-center mr-5">
                                    <p className="mr-1 font-medium">Rating:</p>
                                    {Array.from({ length: hotel.starRating }).map((_, index) => (
                                        <AiFillStar key={index} className="fill-yellow-400 mt-1" />
                                    ))}
                                </span>
                                <div className="text-2xl font-semibold uppercase">{hotel.name}</div>
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
                                <p className="text-gray-700">
                                    {hotel.city}, {hotel.country}
                                </p>
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
                </div>
                <div>
                    <h2 className="text-center text-2xl my-5 font-medium uppercase">List rooms of hotel</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {rooms.map((room) => (
                            <div key={room._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <>
                                    <img src={room.imageUrls[0]} alt="Room" className="w-full h-72 object-cover" />
                                    {room.discountRate > 0 && (
                                        <div className="relative top-0 right-0 bg-red-600 text-white text-sm font-bold py-1 px-2 rounded-bl-lg z-10">
                                            <p className="text-white text-lg">Discount: {room.discountRate * 100}%</p>
                                            <p className="line-through">Price: ${room.pricePerNight}</p>
                                            <p className="text-end">Final price: ${room.finalPrice}</p>
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold mb-2 truncate">{room.name}</h2>
                                        <p className="text-gray-600 mb-4 truncate">
                                            Facilities: {room.facilities.join(', ')}
                                        </p>
                                        <div className="flex">
                                            {room.status ? (
                                                <p className="text-gray-600 mb-4">Status: Available</p>
                                            ) : (
                                                <p className="text-gray-600 mb-4">
                                                    Status: Booked into {room.bookedTime} hours
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex">
                                            <p className="text-gray-600 mb-4 mr-3">Adult: {room.adultCount}</p>
                                            <p className="text-gray-600 mb-4">Child: {room.childCount}</p>
                                        </div>
                                        {room.status && (
                                            <div className="flex justify-end mt-4">
                                                <button
                                                    onClick={() => navigate(`/detail/${room._id}`)}
                                                    className="text-white font-medium p-2 bg-blue-600 hover:bg-blue-500 rounded"
                                                >
                                                    View Detail
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="font-bold my-5">Customer Reviews:</p>
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                    {reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-300 py-2">
                            <div className="flex justify-between">
                                <p className="font-bold">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-end text-sm text-gray-400 font-medium">
                                    Create At: {formatDate(review.createdAt)}
                                </p>
                            </div>
                            <p>{review.content}</p>
                        </div>
                    ))}
                </div>
                <form className="bg-white p-4 rounded-lg shadow-md mt-4" onSubmit={handleSubmit}>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Write your review..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                    ></textarea>
                    <button
                        type="submit"
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DetailHotels
