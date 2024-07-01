import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import * as apiClient from '../api/hotel'
import { AiFillStar } from 'react-icons/ai'
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm'

const Detail = () => {
    const { hotelId } = useParams()
    const navigate = useNavigate()

    const { data: hotel } = useQuery('fetchMyHotelById', () => apiClient.fetchHotelById(hotelId as string), {
        enabled: !!hotelId,
    })

    if (!hotel) return <></>

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="bg-blue-600 mt-10 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
            >
                Back
            </button>
            <div>
                <span className="flex">
                    {Array.from({ length: hotel.starRating }).map((_, index) => (
                        <AiFillStar key={index} className="fill-yellow-400" />
                    ))}
                </span>
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {hotel.imageUrls.map((image, index) => (
                    <div key={index} className="h-[400px]">
                        <img
                            src={image}
                            alt={hotel.name}
                            className="rounded-md w-full h-full object-cover object-center"
                        />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                {hotel.facilities.map((facility, index) => (
                    <div key={index} className="border border-slate-300 rounded-sm p-3">
                        {facility}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="h-fit">
                    <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
                </div>
            </div>
        </div>
    )
}

export default Detail
