import React from "react";
import type { CarProduct } from "../config/types";

type CompareTableProps = {
    products: CarProduct[];
};

const features: { label: string; accessor: (p: CarProduct) => React.ReactNode }[] = [
    {
        label: "Image",
        accessor: (p) => (
            <img
                src={`/assets/images/${p.image_url}.avif`}
                alt={p.name}
                className="w-16 h-10 object-cover rounded shadow-sm mx-auto"
                style={{ background: "#f4f4f5" }}
            />
        ),
    },
    { label: "Name", accessor: (p) => <span className="font-semibold">{p.name}</span> },
    {
        label: "Price Range",
        accessor: (p) =>
            <span>₹{p.price_range.lower} – ₹{p.price_range.upper} Lakh</span>,
    },
    { label: "Rating", accessor: (p) => p.rating },
    { label: "Reviews", accessor: (p) => p.reviews },
    { label: "Engine", accessor: (p) => p.engine },
    { label: "Transmission", accessor: (p) => p.transmission },
    { label: "Fuel Type", accessor: (p) => p.fuel_type },
    { label: "Power", accessor: (p) => p.power },
    { label: "Mileage", accessor: (p) => p.mileage },
    { label: "Seating", accessor: (p) => p.seating_capacity },
    { label: "Airbags", accessor: (p) => p.airbags },
    { label: "Boot Space", accessor: (p) => p.boot_space },
];

const CompareTable: React.FC<CompareTableProps> = ({ products }) => {
    if (!products.length) return null;

    return (
        <div className="w-full mt-10 overflow-hidden">
            <h1 className="text-2xl font-bold mb-4">Comparision</h1>
            <div className="overflow-x-auto">
                <table className="w-full min-w-max bg-white rounded-2xl shadow border-separate border-spacing-0 text-[15px]">
                    <thead>
                        <tr>
                            <th className="p-4 font-bold bg-gray-100 text-left text-base text-gray-700 w-40 rounded-tl-2xl">
                                Feature
                            </th>
                            {products.map((car, index) => (
                                <th
                                    key={car.id}
                                    className={`p-4 font-bold text-center bg-gray-100 text-base text-gray-700 w-48 ${index === products.length - 1 ? 'rounded-tr-2xl' : ''
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="font-semibold text-xs sm:text-base text-gray-800 text-center">
                                            {car.name}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature, idx) => (
                            <tr key={feature.label} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="p-4 font-medium text-gray-700 w-40 border-r border-gray-100 bg-white">
                                    {feature.label}
                                </td>
                                {products.map(car => (
                                    <td key={car.id} className="p-4 text-center align-middle w-48">
                                        {feature.accessor(car)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 text-xs text-gray-400 text-center md:hidden">
                Scroll sideways to see all cars & features
            </div>
        </div>
    );
};

export default CompareTable;