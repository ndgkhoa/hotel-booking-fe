import { FormEvent, useState } from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const SeachBar = () => {
    const search = useSearchContext();
    const navigate = useNavigate();
    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
        navigate('/search');
    };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <form
            onSubmit={handleSubmit}
            className="relative z-10 -mt-8 -mb-8 h-36 p-3 bg-gray-200 border-t-2 border-gray-500 rounded-xl shadow-lg grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-start gap-4"
        >
            <div className="col-span-2 lg:col-span-1">
                <div className="flex flex-row items-center bg-white p-2">
                    <MdTravelExplore size={25} className="mr-2" />
                    <input
                        placeholder="Where are you going?"
                        className="text-md w-full focus:outline-none"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex bg-white px-2 py-1 col-span-2 lg:col-span-1 gap-2">
                <label className="flex items-center">
                    Adults:
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(e) => setAdultCount(parseInt(e.target.value))}
                    />
                </label>
                <label className="flex items-center">
                    Children:
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(e) => setChildCount(parseInt(e.target.value))}
                    />
                </label>
            </div>
            <div className="col-span-2 lg:col-span-1">
                <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in Date"
                    className="min-w-full bg-white p-2 focus:outline-none cursor-pointer"
                    wrapperClassName="min-w-full"
                />
            </div>
            <div className="col-span-2 lg:col-span-1">
                <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn || minDate}
                    maxDate={maxDate}
                    placeholderText="Check-out Date"
                    className="min-w-full bg-white p-2 focus:outline-none cursor-pointer"
                    wrapperClassName="min-w-full"
                />
            </div>
            <div className="col-span-2 lg:col-span-1 flex justify-end gap-1">
                <button className="w-2/3 lg:w-full bg-blue-600 text-white h-full p-2 font-medium text-xl text-center cursor-pointer rounded-lg hover:bg-blue-500">
                    Search
                </button>
            </div>
        </form>
    );
};

export default SeachBar;
