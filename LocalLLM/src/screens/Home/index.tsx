/**
 * @file Home screen component.
 * Displays a dashboard comparing the two on-device LLM libraries: ExecuTorch and llama.rn.
 * Provides navigation cards for various use cases implemented with each library.
 */

// React
import React from 'react';

// React Native
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

// Types
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

// Constants
import { SECTIONS } from './Home.constants';

// Styles
import { styles } from './Home.styles';

/**
 * Navigation property type for the Home screen.
 */
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

/**
 * Props for the HomeScreen component.
 */
interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

/**
 * HomeScreen component.
 * Renders the main dashboard with library comparisons and feature navigation.
 * 
 * @param {HomeScreenProps} props - Component props.
 * @returns {React.FC} The rendered Home screen.
 */
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}>

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>LocalLLM</Text>
        <Text style={styles.heroSubtitle}>
          Two on-device LLM libraries side by side
        </Text>
      </View>

      {/* Comparison table */}
      <View style={styles.compareCard}>
        <Text style={styles.compareTitle}>Library Comparison</Text>
        <View style={styles.compareRow}>
          <View style={styles.compareCol}>
            <Text style={[styles.compareLib, styles.executorchTitle]}>
              react-native-executorch
            </Text>
            <Text style={styles.compareItem}>• ExecuTorch runtime (Meta)</Text>
            <Text style={styles.compareItem}>• .pte model format</Text>
            <Text style={styles.compareItem}>• Hook-based API (useLLM)</Text>
            <Text style={styles.compareItem}>• Auto download + cache</Text>
            <Text style={styles.compareItem}>• iOS 17+ / Android 13+</Text>
          </View>
          <View style={styles.compareDivider} />
          <View style={styles.compareCol}>
            <Text style={[styles.compareLib, styles.llamaTitle]}>
              @react-native-ai/llama
            </Text>
            <Text style={styles.compareItem}>• llama.cpp via llama.rn</Text>
            <Text style={styles.compareItem}>• GGUF model format</Text>
            <Text style={styles.compareItem}>• Vercel AI SDK provider</Text>
            <Text style={styles.compareItem}>• generateText / streamText</Text>
            <Text style={styles.compareItem}>• New Architecture required</Text>
          </View>
        </View>
      </View>

      {/* Library sections */}
      {SECTIONS.map(section => (
        <View key={section.key} style={styles.section}>
          {/* Section header */}
          <View style={[styles.sectionHeader, { backgroundColor: section.headerBg }]}>
            <View style={styles.sectionHeaderTop}>
              <View style={[styles.sectionBadge, { backgroundColor: section.color + '22', borderColor: section.color + '44' }]}>
                <Text style={[styles.sectionBadgeText, { color: section.color }]}>
                  {section.badge}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => Linking.openURL(section.github)}>
                <Text style={[styles.githubLink, { color: section.color }]}>
                  GitHub ↗
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.sectionName, { color: section.color }]}>
              {section.name}
            </Text>
            <Text style={styles.sectionTagline}>{section.tagline}</Text>
            <Text style={styles.sectionModel}>Model: {section.modelFormat}</Text>
          </View>

          {/* Cards */}
          <View style={styles.cards}>
            {section.cards.map(card => (
              <TouchableOpacity
                key={card.route}
                style={[styles.card, { borderLeftColor: section.color }]}
                onPress={() => navigation.navigate(card.route as never)}
                activeOpacity={0.85}>
                <Text style={styles.cardIcon}>{card.icon}</Text>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Footer note */}
      <View style={styles.footerNote}>
        <Text style={styles.footerText}>
          Both libraries run models fully on-device — no API key, no internet
          required after initial model download.
        </Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
