import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

type RatingStarsProps = {
    rating: number;     
    reviews?: number;    
    max?: number;        
    size?: number;       
    showValue?: boolean;
};

const RatingStars = ({
    rating,
    max = 5,
    size = 3,
}: RatingStarsProps) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.25 && rating - fullStars <= 0.75;
    const halfStars = hasHalf ? 1 : 0;
    const emptyStars = max - fullStars - halfStars;

    return (
        <div className={`flex items-center gap-1 text-yellow-500`}>
            {[...Array(fullStars)].map((_, i) => (
                <IoStar key={`full-${i}`} className={`w-${size} h-${size}`} />  
            ))}
            {hasHalf && (
                <IoStarHalf  className={`w-${size} h-${size}`} />)}
            {[...Array(emptyStars)].map((_, i) => (
                <IoStarOutline key={`empty-${i}`} className={`w-${size} h-${size}`} />))}
            
        </div>
    );
};

export default RatingStars;
