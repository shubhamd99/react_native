/**
 * @file ModelLoader component.
 * Displays the status of an ExecuTorch model, including download progress,
 * loading state, and any errors encountered during initialization.
 */

// React
import React from 'react';

// React Native
import { View, Text, ActivityIndicator } from 'react-native';

// Styles
import { styles } from './ModelLoader.styles';

/**
 * Props for the ModelLoader component.
 */
interface ModelLoaderProps {
  /** Current download progress from 0 to 1 */
  downloadProgress: number;
  /** Whether the model is fully loaded and ready for inference */
  isReady: boolean;
  /** Error message if model loading failed */
  error: string | null;
  /** Optional display name for the model */
  modelName?: string;
}

/**
 * ModelLoader component.
 * Renders a status badge or a detailed loading view with a progress bar.
 * 
 * @param {ModelLoaderProps} props - Component props.
 * @returns {React.FC} The rendered ModelLoader component.
 */
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

export default ModelLoader;
