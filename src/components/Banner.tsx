import React, { useState, useEffect } from 'react';
import bannerImage1 from '../assets/banner.jpg';
import bannerImage2 from '../assets/banner2.png';
import bannerImage3 from '../assets/banner3.jpg';

const BannerSlider = () => {
    const images = [bannerImage1, bannerImage2, bannerImage3];
    const [currentImage, setCurrentImage] = useState(0);

    const prevSlide = () => {
        const newIndex = (currentImage - 1 + images.length) % images.length;
        setCurrentImage(newIndex);
    };

    const nextSlide = () => {
        const newIndex = (currentImage + 1) % images.length;
        setCurrentImage(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className="relative h-80 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" style={{ backgroundImage: `url(${images[currentImage]})`, opacity: 1 }}>
                <div className="absolute inset-0 bg-black opacity-50" />
                <div className="container mx-auto h-full flex flex-col justify-center items-center text-center relative z-10">
                    <h2 className="text-4xl lg:text-5xl text-white font-bold mb-4">Welcome to our Website!</h2>
                    <p className="text-lg lg:text-xl text-white">Find yourself a suitable hotel for your trip.</p>
                </div>
            </div>
            <div className="absolute inset-x-0 mt-32 flex justify-between px-4 py-2 bg-opacity-50">
                <button onClick={prevSlide} className="text-gray-800 font-semibold px-4 py-2 rounded bg-white bg-opacity-50 hover:bg-opacity-75">
                    Prev
                </button>
                <button onClick={nextSlide} className="text-gray-800 font-semibold px-4 py-2 rounded bg-white bg-opacity-50 hover:bg-opacity-75">
                    Next
                </button>
            </div>
        </div>
    );
};

export default BannerSlider;
