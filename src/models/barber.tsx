export interface Barber {
    name: string;
    imageUrl: string;
    rate: number;
    reservation: {
        service: string[];
    };
    portfolio: Service[];
    reviews: Review[];
}
interface Service {
    name: string;
    imageUrls: string[];
}
interface Review {
    author: string;
    rate: number;
    created_on: string;
    description: string;
}
