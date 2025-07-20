import type { CarProduct } from '../config/types'
import RatingStars from '../ui/RatingStar'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useCompare } from '../CompareContext';



type ProductCardProps = {
    product: CarProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { compared, addProduct, removeProduct, inCompare } = useCompare();
    const maxReached = compared.length >= 3 && !inCompare(product.id);


    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 flex flex-col
                 min-w-[290px] max-w-[600px] mx-auto hover:shadow-lg transition-shadow relative"
        >
            <button className="absolute top-2 right-2 bg-white rounded-full flex justify-center items-center w-8 h-8 pt-[0.15rem] shadow hover:bg-white z-10">
                {product.isFavorite ? <AiFillHeart className='text-xl text-red-500' /> : <AiOutlineHeart className='text-xl text-red-500' />}
            </button>
            <div className="flex justify-center">
                <img
                    src={`/assets/images/${product.image_url}.avif`}
                    alt={product.name}
                    className="w-full aspect-video object-cover"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between p-3 gap-4">
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        <h3 className="font-semibold text-base truncate">{product.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-xs text-gray-700">{product.rating}</span>
                            <RatingStars
                                rating={product.rating}
                                reviews={product.reviews}
                                showValue={false}
                                size={3}
                            />
                            <span className=" text-gray-400 text-xs">({product.reviews})</span>
                        </div>
                    </div>
                    <div className="text-gray-700 font-bold text-sm">
                        ₹{product.price_range.lower} - ₹{product.price_range.upper} Lakh*
                    </div>

                </div>
                <div className="flex gap-2">
                    <button className="bg-blue-600 text-white text-sm rounded px-3 py-2 flex-1 cursor-pointer border border-blue-600">Add to Cart</button>
                    <button
                        className={`border border-blue-600 text-blue-600 text-sm rounded px-3 py-2 flex-1 cursor-pointer bg-white ${maxReached ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={maxReached}
                        onClick={() => inCompare(product.id) ? removeProduct(product.id) : addProduct(product)}
                    >
                        {inCompare(product.id) ? 'Remove' : 'Compare'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
