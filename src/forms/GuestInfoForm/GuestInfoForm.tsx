import React from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchContext } from '../../contexts/SearchContext';
import { useNavigate } from 'react-router-dom';
import { useGuestInfoContext } from '../../contexts/GuestInfoContext'; // Import useGuestInfoContext
import { useAppContext } from '../../contexts/AppContext';
import { GuestInfoFormData } from '../../shared/types';

type Props = {
    hotelId: string;
    pricePerNight: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
    const search = useSearchContext();
    const navigate = useNavigate();
    const { isLoggedIn } = useAppContext();
    const { guestInfo, setGuestInfo } = useGuestInfoContext(); 

    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
            email: guestInfo.email, 
            phone: guestInfo.phone, 
        },
    });

    const checkIn = watch('checkIn');
    const checkOut = watch('checkOut');

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSubmit = (data: GuestInfoFormData) => {
        if (!isLoggedIn) {
            setGuestInfo({ email: data.email, phone: data.phone });
        }
        search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate(`/hotel/${hotelId}/booking`);
    };

    return (
        <div className="flex flex-col p-4 bg-blue-200 gap-4 rounded-lg">
            <div className="font-medium text-xl flex justify-center">
                <h2>Rental Agreement</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-4 items-center">
                    <input
                        type="text"
                        id="pricePerNight"
                        className="text-md font-bold p-2 w-full cursor-default bg-gray-200"
                        value={`$${pricePerNight}`}
                        readOnly
                    />
                    <div>
                        <DatePicker
                            selected={checkIn}
                            onChange={(date) => setValue('checkIn', date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full bg-white p-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                        />
                    </div>
                    <div>
                        <DatePicker
                            selected={checkOut}
                            onChange={(date) => setValue('checkOut', date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-out Date"
                            className="min-w-full bg-white p-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                        />
                    </div>
                    <div className="flex bg-white px-2 py-1 gap-2">
                        <label className="flex items-center">
                            Adults:
                            <input
                                className="w-full p-1 focus:outline-none font-bold"
                                type="number"
                                min={1}
                                max={20}
                                {...register('adultCount', {
                                    required: 'This field is required',
                                    min: {
                                        value: 1,
                                        message: 'There must be at least one adult',
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        <label className="flex items-center">
                            Children:
                            <input
                                className="w-full p-1 focus:outline-none font-bold"
                                type="number"
                                min={0}
                                max={20}
                                {...register('childCount', {
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        {errors.adultCount && (
                            <span className="text-red-500 font-semibold text-sm">{errors.adultCount.message}</span>
                        )}
                    </div>
                    {!isLoggedIn && (
                        <>
                            <div className="flex bg-white px-2 py-1 gap-2">
                                <label className="flex items-center w-full">
                                    Email:
                                    <input
                                        className="w-full p-1 focus:outline-none font-bold"
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                    />
                                </label>
                                {errors.email && (
                                    <span className="text-red-500 font-semibold text-sm">{errors.email.message}</span>
                                )}
                            </div>
                            <div className="flex bg-white px-2 py-1 gap-2">
                                <label className="flex items-center w-full">
                                    Phone:
                                    <input
                                        className="w-full p-1 focus:outline-none font-bold"
                                        type="tel"
                                        {...register('phone', {
                                            required: 'Phone number is required',
                                            pattern: {
                                                value: /^[0-9]{10,15}$/,
                                                message: 'Invalid phone number',
                                            },
                                        })}
                                    />
                                </label>
                                {errors.phone && (
                                    <span className="text-red-500 font-semibold text-sm">{errors.phone.message}</span>
                                )}
                            </div>
                        </>
                    )}
                    <button className="bg-blue-600 text-white h-full p-2 font-medium hover:bg-blue-500 text-xl rounded-lg">
                        Book Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GuestInfoForm;
