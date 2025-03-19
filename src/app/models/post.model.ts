export interface Post {
  id: number;
  title: string;
  content: string;
  mediaUrl: string;
  mediaType?: string;
  reactions: Reaction[]; // Array of Reaction objects
  reactionCounts?: { [key: string]: number }; // Optional: Map of reaction types to counts
  createdAt?: string;
  updatedAt?: string;
}

export interface Reaction {
  id: number; // Unique ID for the reaction
  type: ReactionType; // Type of reaction (e.g., LIKE, LOVE)
  reactedBy: string; // User who reacted (e.g., user ID or username)
  postId: number; // Post to which the reaction belongs
}

export enum ReactionType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  HAHA = 'HAHA',
  WOW = 'WOW',
  SAD = 'SAD',
  ANGRY = 'ANGRY'
}