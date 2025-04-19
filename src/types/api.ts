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

export type Meta = {
  page: number;
  total: number;
  totalPages: number;
};

export type ProductCard = {
  id: number;
  name: string;
  price: number;
  rating: number;
  thumbnailImg: string;
}

export type ProductFilter = Partial<{
  name: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  maxRating: number;
  isFeatured: boolean;
  brands: string[];
}>