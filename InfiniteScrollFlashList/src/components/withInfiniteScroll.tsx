import React, {
  ComponentType,
  useCallback,
  isValidElement,
  ReactElement,
} from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { FlashListProps } from '@shopify/flash-list';
import { InfiniteScrollProps } from '../types/infinite-scroll.types';
import { styles } from './InfiniteScrollFlashList.styles';

/**
 * Utility component to render either a React Component (Type) or a React Element.
 * Handles the logic of deciding whether to instantiate or directly return.
 */
interface RenderComponentOrElementProps {
  componentOrElement: ComponentType<{}> | ReactElement | null | undefined;
}

const RenderComponentOrElement = ({
  componentOrElement,
}: RenderComponentOrElementProps) => {
  if (!componentOrElement) {
    return null;
  }
  if (isValidElement(componentOrElement)) {
    return componentOrElement;
  }
  // If it's a component type (function or class), instantiate it
  const Component = componentOrElement as ComponentType<{}>;
  return <Component />;
};

/**
 * Extended props for the InfiniteScrollWrapper, including the underlying list implementation.
 */
interface InfiniteScrollWrapperProps<T> extends InfiniteScrollProps<T> {
  /** The underlying list component to use (e.g., FlashList) */
  ListIdentifier: ComponentType<FlashListProps<T>>;
}

/**
 * A generic wrapper component that adds infinite scrolling logic to any list component
 * that follows the FlashList/FlatList prop structure.
 * 
 * It manages:
 * 1. The footer component (loading indicator or original footer)
 * 2. The empty state component
 * 3. The scroll-to-end detection and callback triggering
 */
export const InfiniteScrollWrapper = <T,>({
  ListIdentifier,
  data,
  isLoadingMore,
  hasMore,
  onLoadMore,
  onEndReachedThreshold = 0.5,
  LoadingIndicator,
  EmptyState,
  ListFooterComponent,
  ListEmptyComponent,
  ...rest
}: InfiniteScrollWrapperProps<T>) => {
  
  /**
   * Renders the footer of the list.
   * Shows a loading indicator if pagination is in progress, 
   * otherwise renders the user-provided ListFooterComponent.
   */
  const renderFooter = useCallback(() => {
    if (!isLoadingMore) {
      return (
        <RenderComponentOrElement componentOrElement={ListFooterComponent} />
      );
    }

    // Prioritize custom LoadingIndicator if provided
    if (LoadingIndicator) {
      return <LoadingIndicator />;
    }

    // Default loading indicator for the footer
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [isLoadingMore, ListFooterComponent, LoadingIndicator]);

  /**
   * Renders the empty state of the list.
   * Prioritizes Compound Component (EmptyState) over standard ListEmptyComponent.
   */
  const renderEmpty = useCallback(() => {
    if (EmptyState) {
      return <EmptyState />;
    }

    if (ListEmptyComponent) {
      return (
        <RenderComponentOrElement componentOrElement={ListEmptyComponent} />
      );
    }

    // Default empty state UI
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No items found</Text>
      </View>
    );
  }, [EmptyState, ListEmptyComponent]);

  /**
   * Internal handler for the underlying list's onEndReached.
   * Only triggers onLoadMore if we aren't already loading and have more data.
   */
  const handleEndReached = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      onLoadMore();
    }
  }, [isLoadingMore, hasMore, onLoadMore]);

  return (
    <ListIdentifier
      // Pass through all other list props (renderItem, keyExtractor, etc.)
      {...rest}
      data={data}
      onEndReached={handleEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
    />
  );
};
