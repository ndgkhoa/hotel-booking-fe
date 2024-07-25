import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import * as apiClient from '../api/hotel'
import * as apiUserClient from '../api/promotion'
import { useState } from 'react'
import { PromotionType } from '../shared/types'

const Home = () => {
    const { data: hotels, isLoading: loadingHotels, error: hotelError } = useQuery('fetchHotels', apiClient.fetchHotels)
    const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0)
    const {
        data: promotions,
        isLoading: loadingPromotions,
        error: promotionError,
    } = useQuery('fetchAllPromotions', apiUserClient.fetchAllPromotions)

    if (loadingHotels) return <div>Loading hotels...</div>
    if (hotelError) return <div>Error loading hotels</div>
    if (loadingPromotions) return <div>Loading promotions...</div>
    if (promotionError) return <div>Error loading promotions</div>

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    const nextPromotion = () => {
        if (promotions && currentPromotionIndex < promotions.length - 1) {
            setCurrentPromotionIndex((prev) => prev + 1)
        }
    }

    const prevPromotion = () => {
        if (currentPromotionIndex > 0) {
            setCurrentPromotionIndex((prev) => prev - 1)
        }
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-medium my-5">Most Popular Hotels</h2>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shadow-lg">
                {hotels?.slice(0, 4).map((hotel) => (
                    <div key={hotel._id} className="border rounded p-4 shadow-md">
                        <Link to={`/room/${hotel._id}`}>
                            <h3 className="text-lg text-center font-medium mb-2 cursor-pointer truncate">
                                {hotel.name}
                            </h3>
                            <img
                                src={hotel.imageUrls[0]}
                                alt={hotel.name}
                                className="rounded-md w-full h-72 object-cover mb-2 cursor-pointer"
                            />
                        </Link>
                        <div className="flex justify-center">
                            <Link
                                to={`/room/${hotel._id}`}
                                className="block text-center text-white bg-blue-600 hover:bg-blue-500 font-medium w-32 p-2 rounded-lg"
                            >
                                View More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="text-3xl text-center font-medium my-5">More Hotels</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 shadow-lg">
                {hotels?.slice(4, 12).map((hotel) => (
                    <div key={hotel._id} className="border rounded p-4 shadow-md">
                        <Link to={`/room/${hotel._id}`}>
                            <h3 className="text-lg text-center font-medium mb-2 cursor-pointer truncate">
                                {hotel.name}
                            </h3>
                            <img
                                src={hotel.imageUrls[0]}
                                alt={hotel.name}
                                className="rounded-md w-full h-72 object-cover mb-2 cursor-pointer"
                            />
                        </Link>
                        <div className="flex justify-center">
                            <Link
                                to={`/room/${hotel._id}`}
                                className="block text-center text-white bg-blue-600 hover:bg-blue-500 font-medium w-32 p-2 rounded-lg"
                            >
                                View More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="container mx-auto py-8 px-4">
                <h2 className="text-3xl font-medium mb-4 text-center">Promotions</h2>
                <div className="flex justify-between items-center">
                    <button
                        onClick={prevPromotion}
                        disabled={currentPromotionIndex === 0}
                        className="text-gray-800 font-semibold px-4 py-2 rounded bg-gray-300 bg-opacity-50 hover:bg-opacity-75"
                    >
                        Prev
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-6 flex-grow mx-4">
                        {promotions &&
                            promotions.length > 0 &&
                            promotions
                                .filter((promotion) => promotion.status)
                                .slice(currentPromotionIndex, currentPromotionIndex + 3)
                                .map((promotion: PromotionType) => (
                                    <Link
                                        to={`/promotions`}
                                        className="bg-white p-4 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                                        key={promotion._id}
                                    >
                                        <h3 className="text-xl text-center font-semibold mb-2">{promotion.name}</h3>
                                        <img
                                            src={promotion.imageUrl}
                                            alt="Promotion Image"
                                            className="rounded-lg mb-2 h-56"
                                        />
                                        <div className="">
                                            <div className="flex truncate">
                                                <p className="text-lg mb-2 mr-5">Discount:</p>
                                                <p className="text-lg mb-2 font-bold text-red-600">
                                                    {promotion.discountPercentage}%
                                                </p>
                                            </div>
                                            <div className="flex truncate">
                                                <p className="text-lg mb-2 mr-2">Start Date:</p>
                                                <p className="text-lg mb-2 font-bold text-blue-600">
                                                    {formatDate(promotion.startDate)}
                                                </p>
                                            </div>
                                            <div className="flex truncate">
                                                <p className="text-lg mb-2 mr-4">End Date:</p>
                                                <p className="text-lg mb-2 font-bold text-blue-600">
                                                    {formatDate(promotion.endDate)}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                    </div>
                    <button
                        onClick={nextPromotion}
                        disabled={!promotions || currentPromotionIndex >= promotions.length - 1}
                        className="text-gray-800 font-semibold px-4 py-2 rounded bg-gray-300 bg-opacity-50 hover:bg-opacity-75"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
