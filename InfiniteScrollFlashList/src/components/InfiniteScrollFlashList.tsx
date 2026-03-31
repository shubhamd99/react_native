import React, { ReactNode } from 'react';
import { FlashList } from '@shopify/flash-list';
import { InfiniteScrollWrapper } from './withInfiniteScroll';
import { InfiniteScrollProps } from '../types/infinite-scroll.types';

/**
 * Type definition for the InfiniteScrollFlashList component and its sub-components.
 * Uses a generic function type to maintain type safety for list items.
 */
export interface InfiniteScrollFlashListType {
  <T>(props: InfiniteScrollProps<T>): React.ReactElement | null;
  /** Sub-component for custom loading state UI */
  LoadingIndicator: React.FC<{ children?: ReactNode }>;
  /** Sub-component for custom empty state UI */
  EmptyState: React.FC<{ children?: ReactNode }>;
  /** Component display name for debugging */
  displayName: string;
}

/**
 * InfiniteScrollFlashList is a high-performance, generic list component
 * that implements infinite scrolling (pagination) using Shopify's FlashList.
 * 
 * It follows the Compound Component Pattern, allowing users to define
 * LoadingIndicator and EmptyState as children-like sub-components.
 * 
 * Usage:
 * <InfiniteScrollFlashList 
 *   data={data}
 *   renderItem={renderItem}
 *   onLoadMore={loadMore}
 *   ...
 * />
 */
export const InfiniteScrollFlashList: InfiniteScrollFlashListType = <T,>(
  props: InfiniteScrollProps<T>,
) => {
  // We use the generic wrapper and pass FlashList as the underlying list implementation
  return <InfiniteScrollWrapper<T> {...props} ListIdentifier={FlashList} />;
};

// --- Compound Component Pattern: Attach sub-components ---

/**
 * Optional loading indicator wrapper. 
 * Can be used to provide a custom UI for the pagination loader.
 */
InfiniteScrollFlashList.LoadingIndicator = ({ children }) => <>{children}</>;

/**
 * Optional empty state wrapper.
 * Can be used to provide a custom UI when no data is available.
 */
InfiniteScrollFlashList.EmptyState = ({ children }) => <>{children}</>;

InfiniteScrollFlashList.displayName = 'InfiniteScrollFlashList';
