import { useQuery } from 'react-query'
import { useSearchContext } from '../contexts/SearchContext'
import * as apiClient from '../api/hotel'
import { useState } from 'react'
import SearchReSultCard from '../components/SearchResultCard'
import Pagination from '../components/Pagination'
import StarRatingFilter from '../components/StarRatingFilter'
import HotelTypesFilter from '../components/HotelTypesFilter'
import FacilitiesFilter from '../components/FacilitiesFilter'
import PriceFilter from '../components/PriceFilter'

const Search = () => {
    const search = useSearchContext()
    const [page, setPage] = useState<number>(1)
    const [selectedStars, setSelectedStars] = useState<string[]>([])
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
    const [sortOption, setSortOption] = useState<string>('')
    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption,
    }

    const { data: hotelData } = useQuery(['searchHotels', searchParams], () => apiClient.searchHotel(searchParams))
    const handleStartsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = e.target.value
        setSelectedStars((prevStars) =>
            e.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating),
        )
    }
    const handleHotelTypesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = e.target.value
        setSelectedHotelTypes((prevHotelType) =>
            e.target.checked ? [...prevHotelType, hotelType] : prevHotelType.filter((type) => type !== hotelType),
        )
    }
    const handleFacilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const facility = e.target.value
        setSelectedFacilities((prevFacilities) =>
            e.target.checked ? [...prevFacilities, facility] : prevFacilities.filter((type) => type !== facility),
        )
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit-sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStartsChange} />
                    <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypesChange} />
                    <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilitiesChange} />
                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} hotels found
                        {search.destination ? ` in ${search.destination}` : ''}
                    </span>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price Per Night (low to hight)</option>
                        <option value="pricePerNightDesc">Price Per Night (hight to low)</option>
                    </select>
                </div>
                {hotelData?.data.map((hotel) => <SearchReSultCard hotel={hotel} />)}
                <div className="">
                    <Pagination
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search
