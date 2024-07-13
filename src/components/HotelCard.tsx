import { AiFillStar } from 'react-icons/ai'
import { HotelType } from '../shared/types'
import { Link } from 'react-router-dom'

type Props = {
    hotel: HotelType
}

const HotelCard = ({ hotel }: Props) => {
    if(hotel.status)
        return (
            <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
                <div className="w-full h-[300px]">
                    <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" alt={hotel.name} />
                </div>
                <div className="grid grid-rows-[1fr_2fr_1fr]">
                    <div>
                        <div className="flex items-center">
                            <span className="flex">
                                {Array.from({ length: hotel.starRating }).map((_, index) => (
                                    <AiFillStar key={index} className="fill-yellow-400" />
                                ))}
                                <span className="ml-1 text-sm">{hotel.categories}</span>
                            </span>
                        </div>
                        <div className='text-2xl font-medium'>{hotel.name}</div>
                    </div>
                    <div>
                        <div className="line-clamp-4">{hotel.description}</div>
                    </div>
                    <div className="flex items-end justify-end whitespace-nowrap">
                        <div className="flex flex-col items-end gap-1">
                            <Link
                                to={`/room/${hotel._id}`}
                                className="bg-blue-600 text-white h-full p-2 font-medium text-lg max-w-fit rounded-lg hover:bg-blue-500"
                            >
                                View More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default HotelCard
