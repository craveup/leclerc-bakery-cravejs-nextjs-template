import useSWR, { SWRResponse } from "swr";
import { SWR_CONFIG } from "@/constants";
import { formatApiError } from "@/lib/format-api-error";
import { fetcherSWR } from "@/lib/handle-api";

type UseApiResourceOptions = Partial<typeof SWR_CONFIG> & {
  shouldFetch?: boolean;
};

export function useApiResource<T = unknown>(
  endpoint: string | null,
  options: UseApiResourceOptions = {},
) {
  const { shouldFetch = true, ...swrOptions } = options;

  const key = shouldFetch && endpoint ? endpoint : null;

  const { data, error, mutate, isValidating }: SWRResponse<T> = useSWR<T>(
    key,
    fetcherSWR,
    { ...SWR_CONFIG, ...swrOptions },
  );

  const errorMessage = error ? formatApiError(error).message : undefined;

  return {
    data,
    error,
    errorMessage,
    isLoading: !data && !error,
    isValidating,
    mutate,
  };
}
