import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface ModelLoaderProps {
  downloadProgress: number;
  isReady: boolean;
  error: string | null;
  modelName?: string;
}

const ModelLoader: React.FC<ModelLoaderProps> = ({
  downloadProgress,
  isReady,
  error,
  modelName = 'Model',
}) => {
  if (isReady) {
    return (
      <View style={styles.readyBadge}>
        <View style={styles.readyDot} />
        <Text style={styles.readyText}>{modelName} ready</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorBanner}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const percent = Math.round(downloadProgress * 100);
  const isDownloading = downloadProgress > 0 && downloadProgress < 1;
  const isLoading = downloadProgress === 0 || downloadProgress >= 1;

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#6C63FF" />
      <Text style={styles.loadingText}>
        {isDownloading
          ? `Downloading model… ${percent}%`
          : isLoading
            ? `Loading ${modelName}…`
            : 'Initializing…'}
      </Text>
      {isDownloading && (
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${percent}%` }]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  readyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  readyText: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '500',
  },
  errorBanner: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  errorText: {
    color: '#C62828',
    fontSize: 13,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    width: '80%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 3,
  },
});

export default ModelLoader;
