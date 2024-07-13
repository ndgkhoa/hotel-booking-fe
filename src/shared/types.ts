export type AccountType = {
    _id: string
    username: string
    password: string
    birthday: string
    address: string
    phone: string
    email: string
    firstName: string
    lastName: string
    role: string
}

export type UserType = {
    _id: string
    role: string
    birthday: string
    address: string
    phone: string
    email: string
    firstName: string
    lastName: string
}

export type CategoryType = {
    _id: string
    name: string
}

export type HotelType = {
    _id: string
    userId: string
    name: string
    city: string
    country: string
    description: string
    status: boolean
    categories: string
    adultCount: number
    childCount: number
    facilities: string[]
    pricePerNight: number
    starRating: number
    imageUrls: string[]
    lastUpdate: Date
    pagination: number
}

export type RoomType = {
    _id: string
    hotelId: string
    name: string
    status: boolean
    adultCount: number
    childCount: number
    facilities: string[]
    pricePerNight: number
    imageUrls: string[]
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
    categories?: string[]
    stars?: string[]
    maxPrice?: string
    sortOption?: string
}

export type GuestInfoFormData = {
    checkIn: Date
    checkOut: Date
    adultCount: number
    childCount: number
    email: string
    phone: string
}

export type PaymentIntentResponse = {
    paymentIntentId: string
    clientSecret: string
    totalCost: number
}

export type BookingFormType = {
    checkIn: Date
    checkOut: Date
    adultCount: number
    childCount: number
}

export type PaymentFormData = {
    coupon: string
    totalCost: number
    method: string
}

export type BookingType = {
    _id: string
    checkIn: Date
    checkOut: Date
    date: Date
    adultCount: number
    childCount: number
    status: boolean
    totalCost: number
    userId: string
    roomId: string
}
export type BookingDetailType = {
    _id: string
    totalCost: number
    adultCount: number
    childCount: number
    roomId: string
    receiptId: string
    bookingId: string
}

