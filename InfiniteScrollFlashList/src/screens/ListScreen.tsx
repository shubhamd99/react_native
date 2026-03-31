import React, { useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { InfiniteScrollFlashList } from '../components/InfiniteScrollFlashList';
import { InfiniteScrollData } from '../types/infinite-scroll.types';
import { styles } from './ListScreen.styles';

/**
 * Example Item interface for the list.
 */
interface Item {
  id: string;
  title: string;
  description: string;
}

// Configuration for mock pagination
const PAGE_SIZE = 20;
const TOTAL_ITEMS = 100;

/**
 * Functional component to render a single item in the list.
 */
const ListItem: React.FC<{ item: Item }> = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemTitle}>{item.title}</Text>
    <Text style={styles.itemDescription}>{item.description}</Text>
  </View>
);

/** Render function for FlashList - defined outside to avoid redundant re-renders */
const renderItem = ({ item }: { item: Item }) => <ListItem item={item} />;

/** Static header component for the list */
const ListHeaderComponent = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Infinite Scroll FlashList</Text>
  </View>
);

/**
 * ListScreen demonstrates the full implementation of the infinite scrolling logic.
 * It combines a mock fetch function, the useInfiniteScroll hook, and the InfiniteScrollFlashList component.
 */
export const ListScreen: React.FC = () => {
  /**
   * Mock API function that fetches a specific page of data.
   * In a real app, this would be an axios or fetch call.
   */
  const fetchPage = useCallback(
    async (page: number): Promise<InfiniteScrollData<Item>> => {
      // Simulate network delay
      await new Promise<void>(resolve => {
        setTimeout(() => resolve(), 1500);
      });

      const startIndex = (page - 1) * PAGE_SIZE;
      const items: Item[] = [];

      // Generate mock items for the requested page
      if (startIndex < TOTAL_ITEMS) {
        const remainingItems = Math.min(PAGE_SIZE, TOTAL_ITEMS - startIndex);
        for (let i = 0; i < remainingItems; i++) {
          const id = (startIndex + i + 1).toString();
          items.push({
            id,
            title: `Item ${id}`,
            description: `This is the description for item ${id}. It demonstrates smooth infinite scrolling with FlashList v2.`,
          });
        }
      }

      return {
        items,
        /** Calculate if more items exist based on current position and total */
        hasMore: startIndex + items.length < TOTAL_ITEMS,
      };
    },
    [],
  );

  /** 
   * Initialize the infinite scroll hook with our fetch function.
   * Destructure state and callbacks to pass to the UI.
   */
  const { data, isLoading, isLoadingMore, hasMore, loadMore, error } =
    useInfiniteScroll<Item>({
      fetchPage,
    });

  /** Handle the initial full-screen loading state */
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000FF" />
        <Text>Loading initial data...</Text>
      </View>
    );
  }

  /** Handle full-screen error states */
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  /**
   * Render the main screen.
   * InfiniteScrollFlashList handles the underlying pagination logic automatically.
   */
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <InfiniteScrollFlashList<Item>
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onLoadMore={loadMore}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        ListHeaderComponent={ListHeaderComponent}
      />
    </SafeAreaView>
  );
};
