export interface Board {
  id: string; // Unique identifier for the board
  name: string; // Name of the board
  description?: string;
  isPrivate?: boolean;
  userId: string; // ID of the user who owns the board
  createdAt: Date; // Timestamp for when the board was created
  updatedAt: Date; // Timestamp for when the board was last updated
  pins?: string[]; // Optional array of pin IDs associated with this board
}
