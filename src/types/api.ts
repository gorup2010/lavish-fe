export type AuthResponse = {
  id: number;
  username: string;
  roles: string[];
  accessToken: string;
};

export type ErrorResponse = {
  code: number;
  message: string;
};

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
};

export type CategoryDto = {
  id: number;
  name: string;
  description: string;
  thumbnailImg: string;
};

export type ImageDto = {
  id: number;
  url: string;
  type: string;
};

export type ProductInformationDto = {
  id: number;
  name: string;
  price: number;
  rating: number;
  description: string;
  thumbnailImg: string;
  isFeatured: boolean;
  quantity: number;
  categories: CategoryDto[];
  images: ImageDto[];
};

// TODO: Actually send {page, size, ...filter} not just only filter
export type ProductFilter = Partial<{
  name: string;
  minPrice: number;
  maxPrice: number;
  isFeatured: boolean;
  sortBy: string;
  sortOrder: string;
  categoryIds: number[];
}>;
