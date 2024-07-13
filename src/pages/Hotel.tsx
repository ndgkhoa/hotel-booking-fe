import { useQuery } from 'react-query'
import { useSearchContext } from '../contexts/SearchContext'
import * as apiClient from '../api/hotel'
import { useState, useMemo } from 'react'
import Pagination from '../components/Pagination'
import StarRatingFilter from '../components/StarRatingFilter'
import HotelTypesFilter from '../components/HotelCategoriesFilter'
import FacilitiesFilter from '../components/FacilitiesFilter'
import PriceFilter from '../components/PriceFilter'
import HotelCard from '../components/HotelCard'

const Hotel = () => {
    const search = useSearchContext()
    const [page, setPage] = useState<number>(1)
    const [selectedStars, setSelectedStars] = useState<string[]>([])
    const [selectedHotelCategories, setSelectedHotelCategories] = useState<string[]>([])
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
    const [sortOption, setSortOption] = useState<string>('')

    const { data: hotelData, isLoading, error } = useQuery('fetchHotels', apiClient.fetchHotels)

    const filteredHotels = useMemo(() => {
        if (!hotelData) return []

        let hotels = hotelData.filter((hotel) => hotel.status)

        if (selectedStars.length > 0) {
            hotels = hotels.filter((hotel) => selectedStars.includes(hotel.starRating.toString()))
        }

        if (selectedHotelCategories.length > 0) {
            hotels = hotels.filter((hotel) => selectedHotelCategories.includes(hotel.categories))
        }

        if (selectedFacilities.length > 0) {
            hotels = hotels.filter((hotel) =>
                selectedFacilities.every((facility) => hotel.facilities.includes(facility))
            )
        }

        if (selectedPrice !== undefined) {
            hotels = hotels.filter((hotel) => hotel.pricePerNight <= selectedPrice)
        }

        if (sortOption === 'starRating') {
            hotels = hotels.sort((a, b) => b.starRating - a.starRating)
        } else if (sortOption === 'pricePerNightAsc') {
            hotels = hotels.sort((a, b) => a.pricePerNight - b.pricePerNight)
        } else if (sortOption === 'pricePerNightDesc') {
            hotels = hotels.sort((a, b) => b.pricePerNight - a.pricePerNight)
        }

        return hotels
    }, [hotelData, selectedStars, selectedHotelCategories, selectedFacilities, selectedPrice, sortOption])

    const hotelsPerPage = 3
    const paginatedHotels = useMemo(() => {
        const startIndex = (page - 1) * hotelsPerPage
        const endIndex = startIndex + hotelsPerPage
        return filteredHotels.slice(startIndex, endIndex)
    }, [filteredHotels, page, hotelsPerPage])

    const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = e.target.value
        setSelectedStars((prevStars) =>
            e.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating)
        )
    }

    const handleHotelCateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hotelCate = e.target.value
        setSelectedHotelCategories((prevHotelCategory) =>
            e.target.checked
                ? [...prevHotelCategory, hotelCate]
                : prevHotelCategory.filter((cate) => cate !== hotelCate)
        )
    }

    const handleFacilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const facility = e.target.value
        setSelectedFacilities((prevFacilities) =>
            e.target.checked ? [...prevFacilities, facility] : prevFacilities.filter((type) => type !== facility)
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit-sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
                    <HotelTypesFilter
                        selectedHotelCategories={selectedHotelCategories}
                        onChange={handleHotelCateChange}
                    />
                    <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilitiesChange} />
                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {filteredHotels.length} hotels found
                        {search.destination ? ` in ${search.destination}` : ''}
                    </span>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price Per Night (low to high)</option>
                        <option value="pricePerNightDesc">Price Per Night (high to low)</option>
                    </select>
                </div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error loading hotels</div>
                ) : (
                    paginatedHotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)
                )}
                <div>
                    <Pagination
                        page={page}
                        pages={Math.ceil(filteredHotels.length / hotelsPerPage)}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Hotel
