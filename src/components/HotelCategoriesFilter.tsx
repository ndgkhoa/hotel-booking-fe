import { useQuery } from 'react-query'
import * as apiClient from '../api/category'

type Props = {
    selectedHotelCategories: string[]
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const HotelCategoriesFilter = ({ selectedHotelCategories, onChange }: Props) => {
    const { data: categoriesData } = useQuery('fetchCategories', apiClient.fetchCategories)
    if (!categoriesData) {
        return <span>No categories found</span>
    }
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Category</h4>
            {categoriesData.map((category) => (
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="rounded"
                        value={category.name}
                        checked={selectedHotelCategories.includes(category.name)}
                        onChange={onChange}
                    />
                    <span>{category.name}</span>
                </label>
            ))}
        </div>
    )
}

export default HotelCategoriesFilter
