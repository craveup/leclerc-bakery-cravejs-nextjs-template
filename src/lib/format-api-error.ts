import { ApiError } from "@/types/common";

export const formatApiError = (err: unknown) => {
  const error = err as ApiError;

  if (error.response && error.response.data?.message) {
    return {
      message: error.response.data.message,
      status: error.response.status || 400,
      code: error.response.data?.code,
    };
  }
  return {
    message: error.message || "Unexpected Error",
    status: 400,
    code: "",
  };
};
