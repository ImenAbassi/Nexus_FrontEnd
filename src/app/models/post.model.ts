export interface Post {
  id: number;
  title: string;
  content: string;
  mediaUrl: string;
  mediaType?: string;
  reactions: Reaction[]; // Array of Reaction objects
  createdAt?: string;
  updatedAt?: string;
}

export interface Reaction {
  type: string; // e.g., "LIKE", "LOVE"
  count: number; // Number of reactions of this type
}