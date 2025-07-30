export interface Message {
    id: string;
    sender: 'user' | 'ai';
    content: string;
    timestamp: number;
    image?: string;
}