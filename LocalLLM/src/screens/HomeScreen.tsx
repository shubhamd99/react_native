import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

interface UseCaseCard {
  title: string;
  subtitle: string;
  icon: string;
  route: keyof RootStackParamList;
}

interface LibrarySection {
  key: string;
  color: string;
  headerBg: string;
  badge: string;
  name: string;
  tagline: string;
  modelFormat: string;
  github: string;
  cards: UseCaseCard[];
}

const SECTIONS: LibrarySection[] = [
  {
    key: 'executorch',
    color: '#6C63FF',
    headerBg: '#EEF2FF',
    badge: '⚡ On-Device · .pte',
    name: 'react-native-executorch',
    tagline: 'Meta ExecuTorch runtime · Software Mansion',
    modelFormat: 'ExecuTorch (.pte) models from Hugging Face',
    github: 'https://github.com/software-mansion/react-native-executorch',
    cards: [
      {
        title: 'Chat',
        subtitle: 'Conversational AI with useLLM + sendMessage',
        icon: '💬',
        route: 'Chat',
      },
      {
        title: 'Summarize',
        subtitle: 'Bullet-point summary with generate(messages[])',
        icon: '📝',
        route: 'Summarize',
      },
      {
        title: 'Translate',
        subtitle: 'Translate text across 8 languages',
        icon: '🌍',
        route: 'Translate',
      },
      {
        title: 'Code Explainer',
        subtitle: 'Explain any code snippet offline',
        icon: '👨‍💻',
        route: 'Code',
      },
      {
        title: 'Playground',
        subtitle: 'Write any system prompt + message, run on-device',
        icon: '🧪',
        route: 'Playground',
      },
    ],
  },
  {
    key: 'llama',
    color: '#F97316',
    headerBg: '#FFF7ED',
    badge: '🦙 On-Device · .gguf',
    name: '@react-native-ai/llama',
    tagline: 'llama.cpp via llama.rn · Callstack',
    modelFormat: 'GGUF models from Hugging Face',
    github: 'https://github.com/callstackincubator/ai',
    cards: [
      {
        title: 'Chat (streamText)',
        subtitle: 'Streaming chat with Vercel AI SDK streamText',
        icon: '🦙',
        route: 'LlamaChat',
      },
      {
        title: 'Generate (generateText)',
        subtitle: 'Summarize · Q&A · Translate with generateText',
        icon: '⚙️',
        route: 'LlamaGenerate',
      },
    ],
  },
];

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
            <Text style={[styles.compareLib, { color: '#6C63FF' }]}>
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
            <Text style={[styles.compareLib, { color: '#F97316' }]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#E0DDFF',
    marginTop: 4,
  },
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
  compareTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  compareRow: {
    flexDirection: 'row',
  },
  compareCol: {
    flex: 1,
    gap: 4,
  },
  compareDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 12,
  },
  compareLib: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  compareItem: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
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
  sectionHeader: {
    padding: 16,
  },
  sectionHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  sectionBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  githubLink: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionName: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
  },
  sectionTagline: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  sectionModel: {
    fontSize: 12,
    color: '#999',
  },
  cards: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 4,
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 3,
  },
  cardIcon: {
    fontSize: 22,
    marginRight: 12,
    width: 28,
    textAlign: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#777',
    lineHeight: 17,
  },
  chevron: {
    fontSize: 20,
    color: '#CCC',
    marginLeft: 8,
  },
  footerNote: {
    backgroundColor: '#F0F0FF',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#6C63FF',
  },
  footerText: {
    fontSize: 13,
    color: '#4338CA',
    lineHeight: 20,
  },
});

export default HomeScreen;
