/**
 * LlamaModelLoader — status bar + download trigger for @react-native-ai/llama screens.
 * Automatically calls loadModel() on first render.
 */
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLlamaContext } from '../context/LlamaContext';

interface LlamaModelLoaderProps {
  /** If true, renders a compact inline badge instead of the full loading UI */
  compact?: boolean;
}

const LlamaModelLoader: React.FC<LlamaModelLoaderProps> = ({ compact = false }) => {
  const { isReady, isDownloading, downloadProgress, isPreparing, error, loadModel, modelId } =
    useLlamaContext();

  // Trigger load automatically when this component mounts
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

const styles = StyleSheet.create({
  readyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
  },
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 5,
  },
  readyDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F97316',
  },
  readyText: {
    fontSize: 12,
    color: '#C2410C',
    fontWeight: '600',
  },
  errorBanner: {
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: '#991B1B',
  },
  retryBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  loadingCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FED7AA',
    margin: 16,
  },
  loadingText: {
    flex: 1,
    gap: 6,
  },
  loadingTitle: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  loadingSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#FEE2E2',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F97316',
    borderRadius: 3,
  },
});

export default LlamaModelLoader;
