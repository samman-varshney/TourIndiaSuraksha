/** Generic paginated API response wrapper */
export interface PaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Standard API error response body */
export interface ApiErrorDto {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}

/** Common query params for list endpoints */
export interface ListQueryDto {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
