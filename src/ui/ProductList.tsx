import { useState, useMemo } from 'react';
import { productData } from '../config/productData.ts';
import ProductCard from './ProductCard.tsx';

const ProductList = () => {
    const [search, setSearch] = useState('');

    const filteredProducts = useMemo(() => {
        if (search.trim().length < 3) return productData;
        const s = search.trim().toLowerCase();
        return productData.filter(product =>
            product.name.toLowerCase().includes(s)
        );
    }, [search]);

    return (
        <div className="bg-white min-h-screen w-full">
            <div className="flex justify-start py-6">
                <input
                    type="text"
                    placeholder="Search cars..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border px-4 py-2 w-full max-w-md rounded shadow outline-none focus:border-blue-400"
                />
            </div>

            <div className="w-full grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))] justify-items-start">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {search.length >= 3 && filteredProducts.length === 0 && (
                <div className="mt-8 text-gray-500 text-center text-base">
                    No cars found matching "{search}"
                </div>
            )}
        </div>
    );
};

export default ProductList;
