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

export type ProductCardInAdminDto = {
  id: number;
  name: string;
  price: number;
  thumbnailImg: string;
  createdOn: string;
  quantity: number;
}

export type UserInAdminDto = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  isActive: boolean;
  createdOn: string;
}

export type CategoryInAdminDto = {
  id: number;
  name: string;
  thumbnailImg: string;
  description: string;
  createdOn: string;
}

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

export type RatingDto = {
  id: number;
  comment: string;
  star: number;
  createdOn: string;
  user: {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
  }
}

export type ProductDetailsDto = {
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

export type UpdateDetailsProductDto = {
  id: number;
  name: string;
  price: number;
  description: string;
  isFeatured: boolean;
  quantity: number;
  categoryId: number;
};

export type FileImageDto = {
  id: number;
  image: File;
}

export type DeleteImageDto = {
  productId: number;
  imageId: number;
}

export type DeleteCommentDto = {
  productId: number;
  commentId: number;
}

export type DeleteProductDto = {
  id: number;
}

export type DeleteCategoryDto = {
  id: number;
}

export type CategoryDetailsDto = {
  id: number;
  name: string;
  description: string;
  thumbnailImg: string;
}

export type UpdateDetailsCategoryDto = {
  id: number;
  name: string;
  description: string;
}

export type CreateRatingDto = {
  productId: number;
  star: number;
  comment: string;
}

export type UserDetailsDto = {
  id: number,
  username: string,
  firstname: string,
  lastname: string,
  isActive: boolean,
  roles: string[],
}

export type UpdateUserStatusDto = {
  id: number;
  isActive: boolean;
}

// TODO: Actually send {page, size, ...filter} not just only filter
export type ProductFilter = Partial<{
  name: string;
  minPrice: number;
  maxPrice: number;
  isFeatured: boolean;
  sortBy: string;
  sortOrder: string;
  categoryIds: number[];
  page: number;
  size: number;
}>;

export type UserFilter = Partial<{
  username: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  size: number;
}>;

export type CategoryFilter = Partial<{
  name: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  size: number;
}>;