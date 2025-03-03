export interface Post {
  id: number;
  title: string;
  content: string;
  mediaUrl: string;
  mediaType?: string;
  reactions: { [key: string]: number }; // Réactions par type (LIKE, LOVE, etc.)
  createdAt?: string;
  updatedAt?: string;
}