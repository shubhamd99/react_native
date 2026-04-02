/**
 * @file Styles for the LlamaModelLoader component.
 * Defines the appearance of loading cards, banners, and retry buttons for Llama models.
 */

// React Native
import { StyleSheet } from 'react-native';

/**
 * StyleSheet for the LlamaModelLoader component.
 */
export const styles = StyleSheet.create({
  /** Detailed horizontal banner for a ready model */
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
  /** Small compact badge for a ready model */
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
  /** Circular indicator dot using the Llama brand color */
  readyDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F97316',
  },
  /** Text label for the ready status */
  readyText: {
    fontSize: 12,
    color: '#C2410C',
    fontWeight: '600',
  },
  /** Specialized banner for displaying model errors */
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
  /** Text description of the error */
  errorText: {
    flex: 1,
    fontSize: 13,
    color: '#991B1B',
  },
  /** Button to retry the model download or load */
  retryBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  /** Text inside the retry button */
  retryText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  /** Card container for the loading process */
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
  /** Vertical container for loading text and titles */
  loadingText: {
    flex: 1,
    gap: 6,
  },
  /** Primary title for the current loading state */
  loadingTitle: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  /** Secondary detail text (e.g. model ID) */
  loadingSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  /** Background track for the Llama progress bar */
  progressBar: {
    height: 5,
    backgroundColor: '#FEE2E2',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 4,
  },
  /** Animated fill showing the actual download percentage */
  progressFill: {
    height: '100%',
    backgroundColor: '#F97316',
    borderRadius: 3,
  },
});
