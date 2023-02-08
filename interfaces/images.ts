export interface UnsplashImage {
  id: string;
  width: number;
  height: number;
  urls: {
    regular: string,
    small: string,
    thumb: string
  };
  alt_description: string;
}

export interface UnsplashApiResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}