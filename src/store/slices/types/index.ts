// Common types shared across all slice definitions

/** Standard async state shape used in every entity slice */
export interface AsyncState {
  loading: boolean;
  error: string | null;
}

/** Paginated list response wrapper */
export interface PaginatedState<T> extends AsyncState {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
