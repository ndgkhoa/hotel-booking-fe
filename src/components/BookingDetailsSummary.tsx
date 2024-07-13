import { HotelType } from '../shared/types'

type Props = {
    checkIn: Date
    checkOut: Date
    adultCount: number
    childCount: number
    numberOfNights: number
    hotel: HotelType
}

const BookingDetailSummary = ({ checkIn, checkOut, adultCount, childCount, numberOfNights, hotel }: Props) => {
    return (
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
            <div className="mr-5 w-1/2 border border-gray-200 p-2 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-center">Your Booking Details</h2>
                <div className="border-b py-2">
                    <p className="font-medium">Location:</p>
                    <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
                </div>
                <div className="flex justify-between mb-2">
                    <div>
                        <p className="font-medium">Check-in:</p>
                        <div className="font-bold">{checkIn.toDateString()}</div>
                    </div>
                    <div>
                        <p className="font-medium mr-5">Check-out:</p>
                        <div className="font-bold">{checkOut.toDateString()}</div>
                    </div>
                </div>
                <div className="border-t border-b py-2">
                    <p className="font-medium">Total length of stay:</p>
                    <div className="font-bold">{numberOfNights} nights</div>
                </div>
                <div>
                    <p className="font-medium">Guests:</p>
                    <div className="flex">
                        <p>Adults:</p>
                        <div className="font-bold">{adultCount} adults</div>
                    </div>
                    <div className="flex">
                        <p>Child:</p>
                        <div className="font-bold">{childCount} children</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingDetailSummary
