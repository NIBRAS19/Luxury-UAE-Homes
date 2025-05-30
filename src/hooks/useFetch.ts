
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';

interface UseFetchOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
  enabled?: boolean;
}

// A custom hook for data fetching with state management
function useFetch<T>(
  fetchFunction: () => Promise<T>,
  options: UseFetchOptions<T> = {}
) {
  const { onSuccess, onError, enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFunction();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError);
      onError?.(axiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchFunction.toString()]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
