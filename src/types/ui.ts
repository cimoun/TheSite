export interface UIState {
  searchQuery: string;
  currentFilter: 'all' | 'active' | 'completed';
  isLoading: boolean;
  theme: 'light' | 'dark';
  sortMode: 'default' | 'dueDate' | 'priority';
}

export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: string;
}
