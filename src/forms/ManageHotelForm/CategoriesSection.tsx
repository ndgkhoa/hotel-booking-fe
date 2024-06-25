import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'
import { useQuery } from 'react-query'
import * as apiClient from '../../api/category'

const CategoriesSection = () => {
    const { data: categoriesData } = useQuery('fetchCategories', apiClient.fetchCategories)
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<HotelFormData>()
    const categoriesWatch = watch('categories')
    if (!categoriesData) {
        return <span>No categories found</span>
    }
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Category</h2>
            <div className="grid grid-cols-5 gap-2">
                {categoriesData.map((category) => (
                    <label
                        className={
                            categoriesWatch === category.name
                                ? 'cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold'
                                : 'cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold'
                        }
                    >
                        <input
                            className="hidden"
                            type="radio"
                            value={category.name}
                            {...register('categories', { required: 'This field is required' })}
                        />
                        <span>{category.name}</span>
                    </label>
                ))}
            </div>
            {errors.categories && <span className="text-red-500 text-sm font-bold">{errors.categories.message}</span>}
        </div>
    )
}

export default CategoriesSection
