import { useMutation, useQuery } from 'react-query'
import * as apiClient from '../api/hotel'
import * as userApiClient from '../api/user'
import { useParams } from 'react-router-dom'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import { toast } from 'react-toastify'

const EditHotel = () => {
    const { hotelId } = useParams()
    const { data: hotel } = useQuery('fetchMyHotelById', () => userApiClient.fetchMyHotelById(hotelId || ''), {
        enabled: !!hotelId,
    })

    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
            toast.success('Hotel Saved!')
        },
        onError: () => {
            toast.error('Error Saving Hotel')
        },
    })

    const handleSave = (hotelFormDate: FormData) => {
        mutate(hotelFormDate)
    }

    return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
}

export default EditHotel
