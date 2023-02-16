import { Image } from "./image.interface";
import { Category } from './category.interface';

export interface Article {
    id : number,
    name: string,
    price: number,
    stock: number,
    description: string,
    category: Category,
    images: Image[]
}