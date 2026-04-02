/**
 * @file LlamaModelLoader component.
 * Manages the loading lifecycle for GGUF models used by the @react-native-ai/llama library.
 * Automatically triggers model loading on mount and displays granular progress.
 */

// React
import React, { useEffect } from 'react';

// React Native
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

// Context
import { useLlamaContext } from '../../context/LlamaContext';

// Styles
import { styles } from './LlamaModelLoader.styles';

/**
 * Props for the LlamaModelLoader component.
 */
interface LlamaModelLoaderProps {
  /** If true, renders a compact inline badge instead of the full loading UI */
  compact?: boolean;
}

/**
 * LlamaModelLoader component.
 * Provides status feedback for model downloading and memory preparation.
 * 
 * @param {LlamaModelLoaderProps} props - Component props.
 * @returns {React.FC} The rendered LlamaModelLoader component.
 */
const LlamaModelLoader: React.FC<LlamaModelLoaderProps> = ({ compact = false }) => {
  const { isReady, isDownloading, downloadProgress, isPreparing, error, loadModel, modelId } =
    useLlamaContext();

  /**
   * Model Lifecycle: Automatic Trigger
   * Attempts to load the model immediately when the component is mounted,
   * provided it isn't already loading or in an error state.
   */
  useEffect(() => {
    if (!isReady && !isDownloading && !isPreparing && !error) {
      loadModel();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isReady) {
    if (compact) {
      return (
        <View style={styles.readyBadge}>
          <View style={styles.readyDot} />
          <Text style={styles.readyText}>llama.rn ready</Text>
        </View>
      );
    }
    return (
      <View style={styles.readyBanner}>
        <View style={styles.readyDot} />
        <Text style={styles.readyText}>llama.rn ready · {modelId.split('/').pop()}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorBanner}>
        <Text style={styles.errorText}>⚠ {error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => loadModel()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const percent = Math.round(downloadProgress);

  return (
    <View style={styles.loadingCard}>
      <ActivityIndicator size="small" color="#F97316" />
      <View style={styles.loadingText}>
        {isDownloading ? (
          <>
            <Text style={styles.loadingTitle}>
              Downloading GGUF model… {percent}%
            </Text>
            <Text style={styles.loadingSubtitle}>{modelId}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${percent}%` }]} />
            </View>
          </>
        ) : isPreparing ? (
          <>
            <Text style={styles.loadingTitle}>Loading model into memory…</Text>
            <Text style={styles.loadingSubtitle}>Initialising llama.rn context</Text>
          </>
        ) : (
          <Text style={styles.loadingTitle}>Initialising…</Text>
        )}
      </View>
    </View>
  );
};

export default LlamaModelLoader;
