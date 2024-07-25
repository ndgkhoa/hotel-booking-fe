import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PromotionType } from '../shared/types'
import { fetchAllPromotions } from '../api/promotion'

const Promotions = () => {
    const navigate = useNavigate()
    const [promotions, setPromotions] = useState<PromotionType[]>([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const promotionsData = await fetchAllPromotions()
            setPromotions(promotionsData)
        } catch (error) {
            console.error('Error fetching promotions:', error)
        }
    }

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    return (
        <>
            <div className="min-h-screen p-4 bg-gray-100">
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded mb-8"
                >
                    Back
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:w-auto md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {promotions
                        .filter(promotion => promotion.status) 
                        .map((promotion) => (
                            <div className="py-6" key={promotion._id}>
                                <div className="max-w-xl mx-auto p-6 shadow-lg rounded-lg bg-white transition-transform duration-300 hover:scale-105">
                                    <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 border-b border-gray-300">{promotion.name}</h1>
                                    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                                        <div className="flex items-center justify-center md:justify-end">
                                            <img
                                                src={promotion.imageUrl}
                                                alt="Festival Promotion Image"
                                                className="rounded-lg shadow-md"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <div className="flex items-center mb-2 border-b border-gray-300 pb-2">
                                                <p className="text-lg mr-2 text-gray-700">Discount:</p>
                                                <p className="text-lg font-bold text-red-600">{promotion.discountPercentage}%</p>
                                            </div>
                                            <div className="flex items-center mb-2 border-b border-gray-300 pb-2">
                                                <p className="text-lg mr-2 text-gray-700">Start Date:</p>
                                                <p className="text-lg font-bold text-blue-600">{formatDate(promotion.startDate)}</p>
                                            </div>
                                            <div className="flex items-center mb-2 border-b border-gray-300 pb-2">
                                                <p className="text-lg mr-2 text-gray-700">End Date:</p>
                                                <p className="text-lg font-bold text-blue-600">{formatDate(promotion.endDate)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default Promotions
