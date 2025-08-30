interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface Slice<T> {
  content: T[];
  pageable: Pageable;
  sort: Sort;
  number: number; // current page number
  size: number; // size per page
  numberOfElements: number; // number of elements in this slice
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface Page<T> extends Slice<T> {
  totalPages: number;
  totalElements: number;
}

export type { Page, Pageable, Slice, Sort };
