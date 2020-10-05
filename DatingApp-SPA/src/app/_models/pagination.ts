export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export class PaginationResult<T> {
  result: T;
  pagination: Pagination;
}
