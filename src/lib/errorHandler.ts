import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  detail?: string;
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const detail = error.response?.data?.detail || error.message;
    
    switch (status) {
      case 401:
        return {
          message: 'Unauthorized. Please log in again.',
          status,
          detail,
        };
      case 403:
        return {
          message: 'Access denied. You don\'t have permission to perform this action.',
          status,
          detail,
        };
      case 404:
        return {
          message: 'Resource not found.',
          status,
          detail,
        };
      case 422:
        return {
          message: 'Validation error. Please check your input.',
          status,
          detail,
        };
      case 500:
        return {
          message: 'Server error. Please try again later.',
          status,
          detail,
        };
      default:
        return {
          message: detail || 'An unexpected error occurred.',
          status,
          detail,
        };
    }
  }
  
  return {
    message: 'An unexpected error occurred.',
    detail: String(error),
  };
}

export function showErrorToast(error: ApiError) {
  // You can integrate with a toast library like sonner here
  console.error('API Error:', error);
}
