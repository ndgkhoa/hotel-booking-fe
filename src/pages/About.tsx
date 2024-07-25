const Abouts = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
                <p className="text-lg text-gray-600">Welcome to our hotel booking website</p>
            </header>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700">
                    At TK Hotels, our mission is to provide the best hotel booking experience for our customers. We
                    strive to offer a wide range of accommodations to suit every need and budget, and our dedicated team
                    works tirelessly to ensure that your stay is as comfortable and enjoyable as possible.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
                <p className="text-lg text-gray-700">
                    Founded in 2024, TK Hotels started with a simple idea: to revolutionize the way people book their
                    hotel stays. Our journey began with a small team of passionate individuals who wanted to make hotel
                    booking easier and more transparent. Over the years, we have grown and evolved, but our commitment
                    to providing excellent service remains unwavering.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800">Le Minh Thuan</h3>
                        <p className="text-gray-600">CEO & Founder</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800">Nguyen Dang Khoa</h3>
                        <p className="text-gray-600">CEO & Founder</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-lg text-gray-700">
                    Have questions or need assistance? Feel free to reach out to us via email at
                    <a href="mailto:support@yourhotel.com" className="text-blue-500 underline mx-1">
                        {' '}
                        example@gmail.com
                    </a>
                    or call us at <span className="text-blue-500">+84 78 888 8888</span>.
                </p>
            </section>
        </div>
    )
}

export default Abouts
