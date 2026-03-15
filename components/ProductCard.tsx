import Image, { type StaticImageData } from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Heart, ShoppingCart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { toggleCart, toggleFavourite } from '@/store/slices/counterSlice'

export interface Product {
    id: number
    name: string
    category: string
    price: number
    discountedPrice: number
    images: string[]
    rating: number
}
const ProductCard = ({ product }: { product: Product }) => {

    const dispatch = useDispatch();
    const favouriteIds = useSelector((state: RootState) => state.counter.favourite.ids);
    const addedToCardIds =  useSelector((state: RootState) => state.counter.cart.ids);
    const isFavourite = favouriteIds.includes(product.id);
    const isAddedtoCart = addedToCardIds.includes(product.id);

    const handleFavouriteClick = () => {
        dispatch(toggleFavourite(product.id));
    };

    const handleAddtoCartClick = () => {
        dispatch(toggleCart(product.id));
    };

    return (
        <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg p-0 transition-shadow border border-border"
        >
            {/* Image Carousel */}
            <div className="relative">
                <Carousel className="w-full">
                    <CarouselContent>
                        {product.images.map((img, index) => (
                            <CarouselItem key={index}>
                                <div className="relative h-64 w-full">
                                    <Image
                                        src={img}
                                        alt={`${product.name}-${index}`}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {product.images.length > 1 && (
                        <>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                        </>
                    )}
                </Carousel>

                <button className="absolute top-3 right-3 z-10 p-2 bg-primary text-xs text-white rounded-full shadow-md hover:bg-amber-400 transition-colors">
                    25% OFF
                </button>
            </div>

            {/* Content */}
            <CardContent className="p-4">
                <div className='flex justify-between'>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                        {product.category}
                    </span>
                    <Heart onClick={handleFavouriteClick} className={`w-5 h-5 text-foreground ${isFavourite ? 'text-red-400': 'text-black'}`} />
                </div>

                <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">
                    {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-yellow-400">
                        {[...Array(product.rating)].map((_, i) => (
                            <span key={i}>★</span>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <span className="font-bold text-amber-800">
                        <span className="text-xl">
                            Rs {product.discountedPrice.toLocaleString()}
                        </span>{' '}
                        <span className="line-through">
                            Rs {product.price.toLocaleString()}
                        </span>
                    </span>
                </div>

                <Button onClick={handleAddtoCartClick} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    {isAddedtoCart?'Remove from Cart':'Add to Cart'}
                </Button>
            </CardContent>
        </Card>
    )
}

export default ProductCard