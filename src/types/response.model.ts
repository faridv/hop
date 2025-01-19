export interface ApiResponse<T> {
  data: T;
  source: string;
  cache?: boolean;
  success: boolean;
}
