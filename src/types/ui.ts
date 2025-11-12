export interface UIState {
  searchQuery: string;
  currentFilter: 'all' | 'active' | 'completed';
  isLoading: boolean;
  theme: 'light' | 'dark';
}

export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: string;
}
