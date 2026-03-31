import { ComponentType } from 'react';
import { FlashListProps } from '@shopify/flash-list';

/**
 * Shape of the data returned by the fetchPage function.
 * @template T - The type of items in the list.
 */
export interface InfiniteScrollData<T> {
  /** Array of items for the current page */
  items: T[];
  /** Flag indicating if more items are available to fetch */
  hasMore: boolean;
  /** Optional total count of items across all pages */
  total?: number;
}

/**
 * Internal state managed by the useInfiniteScroll hook.
 * @template T - The type of items in the list.
 */
export interface InfiniteScrollState<T> {
  /** Aggregated array of items from all fetched pages */
  data: T[];
  /** Flag for initial page load */
  isLoading: boolean;
  /** Flag for subsequent page loads (pagination) */
  isLoadingMore: boolean;
  /** Error message if any fetch fails */
  error: string | null;
  /** Flag indicating if more items can be loaded */
  hasMore: boolean;
  /** The current page number being tracked */
  page: number;
}

/**
 * Props for the InfiniteScrollFlashList component.
 * Extends FlashListProps but overrides data and scroll-related props.
 * @template T - The type of items in the list.
 */
export interface InfiniteScrollProps<T>
  extends Omit<
    FlashListProps<T>,
    'data' | 'onEndReached' | 'onEndReachedThreshold'
  > {
  /** The current items to display in the list */
  data: T[];
  /** Whether a "load more" operation is currently in progress */
  isLoadingMore: boolean;
  /** Whether there are more items to be loaded from the source */
  hasMore: boolean;
  /** Callback triggered when the list reaches the end and hasMore is true */
  onLoadMore: () => void;
  /** Threshold (0-1) from the bottom to trigger onLoadMore. Defaults to 0.5 */
  onEndReachedThreshold?: number;
  /** Custom component to show in the footer when loading more items */
  LoadingIndicator?: ComponentType<{}>;
  /** Custom component to show when the list is empty */
  EmptyState?: ComponentType<{}>;
}

/**
 * Configuration options for the useInfiniteScroll hook.
 * @template T - The type of items in the list.
 */
export interface UseInfiniteScrollOptions<T> {
  /** 
   * Function to fetch a specific page of data.
   * Receives the page number and returns a Promise with items and hasMore flag.
   */
  fetchPage: (page: number) => Promise<InfiniteScrollData<T>>;
  /** The starting page number. Defaults to 1 */
  initialPage?: number;
}
