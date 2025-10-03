export interface ChatItem {
  _id: string;
  id: string;
  type: "problem" | "support";
  title: string;
  status: string;
  lastMessage: string | null;
  lastMessageTime: string;
  incomingMessages: number;
  customer?: {
    id: string;
    name: string;
    role: string;
  };
}

export interface Message {
  id: string;
  message?: string;
  imageUrl?: string;
  senderId: string;
  senderRole: string;
  createdAt: string;
  readBy: string[];
}

export interface TypingUser {
  userId: string;
  userName: string;
}

export interface EmptySearchListProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  emptyTitle?: string;
  emptyMessage?: string;
  searchIcon?: string;
  emptyIcon?: string;
}

export interface SearchBarWithCallbackProps extends SearchBarProps {
  className?: string;
  onSearch: (query: string) => void;
  value?: string;
}
