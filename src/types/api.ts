export type AuthResponse = {
  id: number;
  username: string;
  roles: string[];
  accessToken: string;
};

export type ErrorResponse = {
  code: number;
  message: string;
}

export type PaginationResponse<T> = {
  page: number;
  total: number;
  totalPages: number;
  data: T[];
};

export type ProductCardDto = {
  id: number;
  name: string;
  price: number;
  rating: number;
  thumbnailImg: string;
}

// TODO: Actually send {page, size, ...filter} not just only filter
export type ProductFilter = Partial<{
  name: string;
  minPrice: number;
  maxPrice: number;
  isFeatured: boolean;
  orderBy: string;
  sortBy: string;
  categoryIds: number[];
}>