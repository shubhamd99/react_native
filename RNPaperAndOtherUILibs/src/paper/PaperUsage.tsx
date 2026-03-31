import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { 
  Button, 
  Card, 
  Title, 
  Paragraph, 
  Avatar, 
  TextInput, 
  Checkbox, 
  RadioButton, 
  Switch, 
  DataTable, 
  Text,
  MD3Colors
} from 'react-native-paper';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

const PaperUsage: React.FC = () => {
  const [emailText, setEmailText] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('first');
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Title style={styles.header}>Buttons & Typography</Title>
        <View style={styles.row}>
          <Button mode="contained" onPress={() => {}} style={styles.button}>Contained</Button>
          <Button mode="outlined" onPress={() => {}} style={styles.button}>Outlined</Button>
        </View>
        <Text variant="displayLarge">Display Large</Text>
        <Text variant="headlineMedium">Headline Medium</Text>
        <Text variant="bodyMedium">Body Medium</Text>
      </View>

      <View style={styles.section}>
        <Title style={styles.header}>Cards</Title>
        <Card style={styles.card}>
          <Card.Title 
            title="Card Title" 
            subtitle="Card Subtitle" 
            left={LeftContent} 
          />
          <Card.Content>
            <Paragraph>This is a Card component from React Native Paper. It supports titles, subtitles, content, and actions.</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.header}>Inputs & Controls</Title>
        <TextInput
          label="Email"
          value={emailText}
          onChangeText={text => setEmailText(text)}
          mode="outlined"
          style={styles.input}
        />
        <View style={styles.row}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
          />
          <Text style={styles.label}>Checkbox</Text>
        </View>
        <RadioButton.Group onValueChange={newValue => setRadioValue(newValue)} value={radioValue}>
          <View style={styles.row}>
            <RadioButton value="first" />
            <Text style={styles.label}>First</Text>
          </View>
          <View style={styles.row}>
            <RadioButton value="second" />
            <Text style={styles.label}>Second</Text>
          </View>
        </RadioButton.Group>
        <View style={styles.row}>
          <Switch value={isSwitchOn} onValueChange={() => setIsSwitchOn(!isSwitchOn)} />
          <Text style={styles.label}>Switch</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Title style={styles.header}>Data Table</Title>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Dessert</DataTable.Title>
            <DataTable.Title numeric>Calories</DataTable.Title>
            <DataTable.Title numeric>Fat</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
            <DataTable.Cell numeric={true}>159</DataTable.Cell>
            <DataTable.Cell numeric={true}>6.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell numeric={true}>237</DataTable.Cell>
            <DataTable.Cell numeric={true}>8.0</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
    color: MD3Colors.primary40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  button: {
    marginRight: 8,
  },
  card: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    marginLeft: 8,
  },
  spacer: {
    height: 100,
  },
});

export default PaperUsage;
