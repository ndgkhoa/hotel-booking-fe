import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
}

const SearchResultCard = ({ data }: Props) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
            <div className="w-full h-[300px]">
                {data.hotel.imageUrls && data.hotel.imageUrls.length > 0 ? (
                    <img
                        src={data.hotel.imageUrls[0]}
                        className="w-full rounded-lg h-full object-cover object-center"
                        alt={data.hotel.name}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span>No Image Available</span>
                    </div>
                )}
            </div>
            <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: data.hotel.starRating }).map((_, index) => (
                                <AiFillStar key={index} className="fill-yellow-400" />
                            ))}
                            <span className="ml-1 text-sm">{data.hotel.categories}</span>
                        </span>
                    </div>
                    <Link to={`/room/${data.hotel._id}`} className="text-2xl font-bold cursor-pointer">
                        {data.hotel.name}
                    </Link>
                </div>
                <div>
                    <div className="line-clamp-4">{data.hotel.description}</div>
                </div>
                <div className="flex items-end justify-end whitespace-nowrap">
                        <div className="flex flex-col items-end gap-1">
                            <Link
                                to={`/room/${data.hotel._id}`}
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

export default SearchResultCard
