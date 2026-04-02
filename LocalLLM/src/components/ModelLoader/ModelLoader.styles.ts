/**
 * @file Styles for the ModelLoader component.
 * Defines the appearance of the ready badge, error banner, and loading progress bar.
 */

// React Native
import { StyleSheet } from 'react-native';

/**
 * StyleSheet for the ModelLoader component.
 */
export const styles = StyleSheet.create({
  /** Badge displayed when the model is ready */
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  /** Circular indicator dot inside the ready badge */
  readyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  /** Text label inside the ready badge */
  readyText: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '500',
  },
  /** Banner displayed when a model error occurs */
  errorBanner: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  /** Text inside the error banner */
  errorText: {
    color: '#C62828',
    fontSize: 13,
  },
  /** Container for the loading spinner and progress info */
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  /** Label describing the current loading state */
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  /** Background track for the progress bar */
  progressBar: {
    width: '80%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  /** Animated fill showing the actual download percentage */
  progressFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 3,
  },
});
