import { useNavigate } from "react-router-dom";


const Winter = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="min-h-screen">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded mb-8"
                    >
                        Back
                    </button>
                <div className="container mx-auto py-12">
                    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg mb-5">
                        <h1 className="text-3xl font-semibold mb-6 text-center">Promotion Winter 1</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center justify-center md:justify-end">
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="Festival Promotion Image"
                                    className="rounded-lg"
                                />
                            </div>
                            <div>
                                <p className="text-lg mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet
                                    risus, non accumsan metus mollis ac. Nulla facilisi. Suspendisse potenti.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg mb-5">
                        <h1 className="text-3xl font-semibold mb-6 text-center">Promotion Winter 2</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center justify-center md:justify-end">
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="Festival Promotion Image"
                                    className="rounded-lg"
                                />
                            </div>
                            <div>
                                <p className="text-lg mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper aliquet
                                    risus, non accumsan metus mollis ac. Nulla facilisi. Suspendisse potenti.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Winter;
