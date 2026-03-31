import { useState, useCallback, useEffect, useRef } from 'react';
import {
  InfiniteScrollState,
  UseInfiniteScrollOptions,
} from '../types/infinite-scroll.types';

/**
 * Custom hook for managing the state and logic of infinite scrolling.
 * Handles pagination state, data aggregation, and loading flags.
 * 
 * @template T - The type of items in the list.
 * @param options - Configuration including the fetch function and starting page.
 * @returns State and functions needed for infinite scrolling.
 */
export function useInfiniteScroll<T>({
  fetchPage,
  initialPage = 1,
}: UseInfiniteScrollOptions<T>) {
  /**
   * Internal state tracking the current items, loading flags, 
   * errors, pagination status, and the next page to fetch.
   */
  const [state, setState] = useState<InfiniteScrollState<T>>({
    data: [],
    isLoading: true,
    isLoadingMore: false,
    error: null,
    hasMore: true,
    page: initialPage,
  });

  /**
   * Ref to track mounting status and prevent state updates after unmount.
   */
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  /**
   * Fetches the initial data for the list.
   * Resets the entire state to the starting conditions.
   */
  const loadInitialData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await fetchPage(initialPage);
      if (isMounted.current) {
        setState({
          data: response.items,
          isLoading: false,
          isLoadingMore: false,
          error: null,
          hasMore: response.hasMore,
          page: initialPage,
        });
      }
    } catch (err) {
      if (isMounted.current) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err.message : 'An error occurred',
        }));
      }
    }
  }, [fetchPage, initialPage]);

  /**
   * Fetches the next page of data and appends it to the current items.
   * Only triggers if not already loading and hasMore is true.
   */
  const loadMore = useCallback(async () => {
    // Guards to prevent redundant or unnecessary requests
    if (state.isLoading || state.isLoadingMore || !state.hasMore) return;

    setState(prev => ({ ...prev, isLoadingMore: true }));
    const nextPage = state.page + 1;

    try {
      const response = await fetchPage(nextPage);
      if (isMounted.current) {
        setState(prev => ({
          ...prev,
          data: [...prev.data, ...response.items],
          isLoadingMore: false,
          hasMore: response.hasMore,
          page: nextPage,
        }));
      }
    } catch (err) {
      if (isMounted.current) {
        setState(prev => ({
          ...prev,
          isLoadingMore: false,
          error: err instanceof Error ? err.message : 'An error occurred',
        }));
      }
    }
  }, [
    fetchPage,
    state.hasMore,
    state.isLoading,
    state.isLoadingMore,
    state.page,
  ]);

  /** Trigger initial fetch on component mount */
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return {
    ...state,
    loadMore,
    refresh: loadInitialData,
  };
}
