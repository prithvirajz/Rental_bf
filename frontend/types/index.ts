export interface User {
    id: number;
    username: string;
    email: string;
    is_boyfriend: boolean;
}

export interface BoyfriendProfile {
    id: number;
    user: number;
    username: string;
    email: string;
    name: string;
    city: string;
    bio: string;
    price: string;
    photo: string; // URL
}

export interface Booking {
    id: number;
    user: number;
    boyfriend: number;
    boyfriend_name: string;
    boyfriend_photo: string;
    date: string;
    hours: number;
    amount: string;
    status: 'pending_payment' | 'confirmed' | 'cancelled' | 'completed';
    message: string;
    created_at: string;
    razorpay_order_id: string;
}
