export type AccountType = {
    _id: string
    username: string
    password: string
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
    status: string
    categories: string
    adultCount: number
    childCount: number
    facilities: string[]
    pricePerNight: number
    starRating: number
    imageUrls: string[]
    lastUpdate: Date
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

export type BookingFormData = {
    userId: string
    hotelId: string
    totalCost: number
    paymentIntentId: string
    firstName: string
    lastName: string
    email: string
    phone: string
}

export type BookingType = {
    _id: string
    checkIn: Date
    checkOut: Date
    status: string
    totalCost: number
    userId: string
    hotelId: string
}

export type BookingDetailFormData = {
    totalCost: number;
    adultCount: number;
    childCount: number;
    hotelId: string;
    receiptId: string;
    bookingId: string;
};

