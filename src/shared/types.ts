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
    starRating: number
    imageUrls: string[]
}

export type RoomType = {
    _id: string
    hotelId: string
    name: string
    status: boolean
    adultCount: number
    childCount: number
    bookedTime: number
    bookedLatest: Date | null
    facilities: string[]
    pricePerNight: number
    imageUrls: string[]
    discountRate: number
    finalPrice: number
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
    hotelName?: string
    city?: string
    country?: string
    maxStarRating?: string[]
    maxPrice?: string
    adultCount?: string
    childCount?: string
    categories?: string[]
    facilities?: string[]
    page?: string
    limit?: string
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

export type PromotionType = {
    _id: string
    name: string
    discountPercentage: number
    startDate: Date
    endDate: Date
    imageUrl: string
    status: boolean
}

export type CommentType = {
    hotelId: string
    userId: string
    content: string
    createdAt: Date
    status: boolean
}