import { useNavigate } from "react-router-dom";


const Coupons = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="min-h-screen ">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded mb-8"
                    >
                        Back
                    </button>
                <div className="container mx-auto py-12">
                    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg mb-2">
                        <h1 className="text-3xl font-semibold mb-6 text-center">Coupon 1</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center justify-center md:justify-end">
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="Coupon Image"
                                    className="rounded-lg"
                                />
                            </div>
                            <div>
                                <p className="text-lg mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet
                                    risus, non accumsan metus mollis ac. Nulla facilisi. Suspendisse potenti.
                                </p>
                                <p className="text-lg">
                                    Nam feugiat sollicitudin risus, id malesuada lorem vehicula in. Sed lobortis,
                                    nunc vel tempor aliquam, metus elit interdum lorem, et interdum lorem neque ut
                                    libero.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg mb-2">
                        <h1 className="text-3xl font-semibold mb-6 text-center">Coupon 2</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center justify-center md:justify-end">
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="Coupon Image"
                                    className="rounded-lg"
                                />
                            </div>
                            <div>
                                <p className="text-lg mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet
                                    risus, non accumsan metus mollis ac. Nulla facilisi. Suspendisse potenti.
                                </p>
                                <p className="text-lg">
                                    Nam feugiat sollicitudin risus, id malesuada lorem vehicula in. Sed lobortis,
                                    nunc vel tempor aliquam, metus elit interdum lorem, et interdum lorem neque ut
                                    libero.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg mb-2">
                        <h1 className="text-3xl font-semibold mb-6 text-center">Coupon 3</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center justify-center md:justify-end">
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="Coupon Image"
                                    className="rounded-lg"
                                />
                            </div>
                            <div>
                                <p className="text-lg mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet
                                    risus, non accumsan metus mollis ac. Nulla facilisi. Suspendisse potenti.
                                </p>
                                <p className="text-lg">
                                    Nam feugiat sollicitudin risus, id malesuada lorem vehicula in. Sed lobortis,
                                    nunc vel tempor aliquam, metus elit interdum lorem, et interdum lorem neque ut
                                    libero.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Coupons;
