export type CarProduct = {
    id: number;
    name: string;
    price_range: { lower: number; upper: number };
    rating: number;
    reviews: number;
    image_url: string;
    engine: string;
    transmission: string;
    fuel_type: string;
    power: string;
    mileage: string;
    seating_capacity: number;
    airbags: number;
    boot_space: string;
    isFavorite?: boolean;
};