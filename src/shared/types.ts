export type UserType = {
    _id: string
    email: string
    password: string
    firstName: string
    lastName: string
}

export type HotelType = {
    _id: string
    userId: string
    name: string
    city: string
    country: string
    description: string
    type: string
    adultCount: number
    childCount: number
    facilities: string[]
    pricePerNight: number
    starRating: number
    imageUrls: string[]
    lastUpdate: Date
    bookings: BookingType[]
}

export type HotelSearchResponse = {
    data: HotelType[]
    pagination: {
        total: number
        page: number
        pages: number
    }
}

export type SearchParams = {
    destination?: string
    checkIn?: string
    checkOut?: string
    adultCount?: string
    childCount?: string
    page?: string
    facilities?: string[]
    types?: string[]
    stars?: string[]
    maxPrice?: string
    sortOption?: string
}

export type GuestInfoFormData = {
    checkIn: Date
    checkOut: Date
    adultCount: number
    childCount: number
}

export type PaymentIntentResponse = {
    paymentIntentId: string
    clientSecret: string
    totalCost: number
}

export type BookingFormData = {
    firstName: string
    lastName: string
    email: string
    adultCount: number
    childCount: number
    checkIn: string
    checkOut: string
    hotelId: string
    totalCost: number
    paymentIntentId: string
}

export type BookingType = {
    _id: string
    userId: string
    firstName: string
    lastName: string
    email: string
    adultCount: number
    childCount: number
    checkIn: Date
    checkOut: Date
    totalCost: number
}
