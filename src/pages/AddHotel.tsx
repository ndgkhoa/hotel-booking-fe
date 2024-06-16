import { useMutation } from 'react-query'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import { toast } from 'react-toastify'
import * as apiClient from '../api/hotel'

const AddHotel = () => {
    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            toast.success('Hotel Saved!')
        },
        onError: () => {
            toast.error('Error Saving Hotel!')
        },
    })

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }
    return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
}

export default AddHotel
