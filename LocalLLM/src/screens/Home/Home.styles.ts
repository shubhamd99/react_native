/**
 * @file Styles for the Home screen.
 * Defines the layout and visual appearance of the dashboard, sections, and cards.
 */

// React Native
import { StyleSheet } from 'react-native';

/**
 * StyleSheet for the Home screen components.
 */
export const styles = StyleSheet.create({
  /** Root container for the screen */
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  /** Content container for the ScrollView */
  content: {
    paddingBottom: 40,
  },
  /** Hero section at the top of the screen */
  hero: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  /** Title text in the hero section */
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: -0.5,
  },
  /** Subtitle text in the hero section */
  heroSubtitle: {
    fontSize: 15,
    color: '#E0DDFF',
    marginTop: 4,
  },
  /** Comparison card container */
  compareCard: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  /** Title for the comparison table */
  compareTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  /** Row container for comparison columns */
  compareRow: {
    flexDirection: 'row',
  },
  /** Individual column in the comparison table */
  compareCol: {
    flex: 1,
    gap: 4,
  },
  /** Vertical divider between comparison columns */
  compareDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 12,
  },
  /** Library name text in the comparison table */
  compareLib: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  /** Specific style for ExecuTorch title */
  executorchTitle: {
    color: '#6C63FF',
  },
  /** Specific style for llama.rn title */
  llamaTitle: {
    color: '#F97316',
  },
  /** Individual feature item in the comparison table */
  compareItem: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  /** Section container for each library */
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  /** Header part of a library section */
  sectionHeader: {
    padding: 16,
  },
  /** Top row of the section header */
  sectionHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  /** Badge container in the section header */
  sectionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  /** Text inside the section badge */
  sectionBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  /** GitHub link text in the section header */
  githubLink: {
    fontSize: 13,
    fontWeight: '600',
  },
  /** Library name text in the section header */
  sectionName: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
  },
  /** Tagline text in the section header */
  sectionTagline: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  /** Model format text in the section header */
  sectionModel: {
    fontSize: 12,
    color: '#999',
  },
  /** Container for feature cards inside a section */
  cards: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 4,
    gap: 8,
  },
  /** Individual feature card container */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 3,
  },
  /** Icon text in a feature card */
  cardIcon: {
    fontSize: 22,
    marginRight: 12,
    width: 28,
    textAlign: 'center',
  },
  /** Content container in a feature card */
  cardContent: {
    flex: 1,
  },
  /** Title text in a feature card */
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  /** Subtitle text in a feature card */
  cardSubtitle: {
    fontSize: 12,
    color: '#777',
    lineHeight: 17,
  },
  /** Chevron icon at the end of a feature card */
  chevron: {
    fontSize: 20,
    color: '#CCC',
    marginLeft: 8,
  },
  /** Container for the footer note */
  footerNote: {
    backgroundColor: '#F0F0FF',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#6C63FF',
  },
  /** Text in the footer note */
  footerText: {
    fontSize: 13,
    color: '#4338CA',
    lineHeight: 20,
  },
});
