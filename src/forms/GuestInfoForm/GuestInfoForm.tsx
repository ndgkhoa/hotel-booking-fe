import { useForm } from 'react-hook-form'
import { GuestInfoFormData } from '../../shared/types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useSearchContext } from '../../contexts/SearchContext'
import { useAppContext } from '../../contexts/AppContext'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
    hotelId: string
    pricePerNight: number
}

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
    const search = useSearchContext()
    const { isLoggedIn } = useAppContext()
    const navigate = useNavigate()
    const location = useLocation()

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
        },
    })

    const checkIn = watch('checkIn')
    const checkOut = watch('checkOut')

    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount)
        navigate('/sign-in', { state: { from: location } })
    }

    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount)
        navigate(`/hotel/${hotelId}/booking`)
    }

    return (
        <div className="flex flex-col p-4 bg-blue-200 gap-4">
            <h3 className="text-md font-bold">${pricePerNight}</h3>
            <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
                <div className="grid grid-cols-1 gap-4 items-center">
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
                                        message: 'There must be at least on adult',
                                    },
                                    valueAsNumber: true,
                                })}
                            ></input>
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
                            ></input>
                        </label>
                        {errors.adultCount && (
                            <span className="text-red-500 font-semibold text-sm">{errors.adultCount.message}</span>
                        )}
                    </div>
                    {isLoggedIn ? (
                        <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                            Book Now
                        </button>
                    ) : (
                        <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                            Sign in to Book
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default GuestInfoForm
