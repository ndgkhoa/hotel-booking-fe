import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import * as apiClient from '../api/hotel'

const Home = () => {
    const { data: hotels, isLoading, error } = useQuery('fetchHotels', apiClient.fetchHotels)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading hotels</div>

    

    return (
        <div>
            <h2 className="text-3xl text-center font-medium mb-4">Most Popular Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shadow-lg">
                {hotels?.slice(0, 3).map((hotel) => (
                    <div key={hotel._id} className="border rounded p-4 shadow-md">
                        <h3 className="text-lg text-center font-medium mb-2">{hotel.name}</h3>
                        <img
                            src={hotel.imageUrls[0]}
                            alt={hotel.name}
                            className="rounded-md w-full h-72 object-cover mb-2"
                        />
                        <div className="flex justify-center">
                            <Link
                                to={`/room/${hotel._id}`}
                                className="block text-center text-white bg-blue-600 hover:bg-blue-500 font-medium w-32 p-2 rounded-lg "
                            >
                                View More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-3xl text-center font-medium mb-4 pt-5">More Hotels</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shadow-lg">
                    {hotels?.slice(3, 6).map((hotel) => (
                        <div key={hotel._id} className="border rounded p-4 shadow-md">
                            <h3 className="text-xl text-center font-medium mb-2">{hotel.name}</h3>
                            <img
                                src={hotel.imageUrls[0]}
                                alt={hotel.name}
                                className="rounded-md w-full h-72 object-cover mb-2"
                            />
                            <div className="flex justify-center">
                                <Link
                                    to={`/room/${hotel._id}`}
                                    className="block text-center text-white bg-blue-600 hover:bg-blue-500 font-medium w-32 p-2 rounded-lg "
                                >
                                    View More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container mx-auto py-8 px-4">
                <h2 className="text-3xl font-medium mb-4 text-center">Festival Promotions</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-4 shadow-lg rounded-lg">
                        <h3 className="text-xl text-center font-semibold mb-2">Promotion 1</h3>
                        <img src="https://via.placeholder.com/400x300" alt="Promotion 1" className="rounded-lg mb-2" />
                        <p className="text-lg mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet risus, non
                            accumsan metus mollis ac.
                        </p>
                        <div className="flex justify-center">
                            <button className="text-white font-medium bg-blue-600 hover:bg-blue-500 p-2 w-32 rounded-lg">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow-lg rounded-lg">
                        <h3 className="text-xl text-center font-semibold mb-2">Promotion 2</h3>
                        <img src="https://via.placeholder.com/400x300" alt="Promotion 2" className="rounded-lg mb-2" />
                        <p className="text-lg mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet risus, non
                            accumsan metus mollis ac.
                        </p>
                        <div className="flex justify-center">
                            <button className="text-white font-medium bg-blue-600 hover:bg-blue-500 p-2 w-32 rounded-lg">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow-lg rounded-lg">
                        <h3 className="text-xl text-center font-semibold mb-2">Promotion 3</h3>
                        <img src="https://via.placeholder.com/400x300" alt="Promotion 3" className="rounded-lg mb-2" />
                        <p className="text-lg mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet risus, non
                            accumsan metus mollis ac.
                        </p>
                        <div className="flex justify-center">
                            <button className="text-white font-medium bg-blue-600 hover:bg-blue-500 p-2 w-32 rounded-lg">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow-lg rounded-lg">
                        <h3 className="text-xl text-center font-semibold mb-2">Promotion 4</h3>
                        <img src="https://via.placeholder.com/400x300" alt="Promotion 3" className="rounded-lg mb-2" />
                        <p className="text-lg mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet risus, non
                            accumsan metus mollis ac.
                        </p>
                        <div className="flex justify-center">
                            <button className="text-white font-medium bg-blue-600 hover:bg-blue-500 p-2 w-32 rounded-lg">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-8 px-4">
                <h2 className="text-3xl font-medium mb-4 text-center">Coupons</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-4 shadow-lg rounded-lg">
                        <h3 className="text-xl text-center font-semibold mb-2">Coupon 1</h3>
                        <img src="https://via.placeholder.com/400x300" alt="Promotion 1" className="rounded-lg mb-2" />
                        <p className="text-lg mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet risus, non
                            accumsan metus mollis ac.
                        </p>
                        <div className="flex justify-center">
                            <button className="text-white font-medium bg-blue-600 hover:bg-blue-500 p-2 w-32 rounded-lg">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow-lg rounded-lg">
                        <h3 className="text-xl text-center font-semibold mb-2">Coupon 2</h3>
                        <img src="https://via.placeholder.com/400x300" alt="Promotion 2" className="rounded-lg mb-2" />
                        <p className="text-lg mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet risus, non
                            accumsan metus mollis ac.
                        </p>
                        <div className="flex justify-center">
                            <button className="text-white font-medium bg-blue-600 hover:bg-blue-500 p-2 w-32 rounded-lg">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow-lg rounded-lg">
                        <h3 className="text-xl text-center font-semibold mb-2">Coupon 3</h3>
                        <img src="https://via.placeholder.com/400x300" alt="Promotion 3" className="rounded-lg mb-2" />
                        <p className="text-lg mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet risus, non
                            accumsan metus mollis ac.
                        </p>
                        <div className="flex justify-center">
                            <button className="text-white font-medium bg-blue-600 hover:bg-blue-500 p-2 w-32 rounded-lg">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow-lg rounded-lg">
                        <h3 className="text-xl text-center font-semibold mb-2">Coupon 4</h3>
                        <img src="https://via.placeholder.com/400x300" alt="Promotion 3" className="rounded-lg mb-2" />
                        <p className="text-lg mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet risus, non
                            accumsan metus mollis ac.
                        </p>
                        <div className="flex justify-center">
                            <button className="text-white font-medium bg-blue-600 hover:bg-blue-500 p-2 w-32 rounded-lg">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
