import {
  Button,
  Card,
  Text,
  Input,
  Divider,
  VStack,
  HStack,
  Screen,
} from '../components';

export function DlsDemo() {
  return (
    <Screen>
      <VStack gap="lg" className="p-4">
        {/* Header */}
        <VStack gap="sm">
          <Text variant="h1">Design System</Text>
          <Text variant="caption">
            All UI below is built using our DLS primitives.
          </Text>
        </VStack>

        <Divider />

        {/* Card Section */}
        <Card>
          <VStack gap="md">
            <Text variant="h2">Login</Text>

            <Input placeholder="Email" />
            <Input placeholder="Password" secureTextEntry />

            <Button title="Sign In" />

            <Button title="Create Account" variant="ghost" />
          </VStack>
        </Card>

        <Divider />

        {/* Row Demo */}
        <HStack justify="between">
          <Text>Version</Text>
          <Text variant="caption">v1.0.0</Text>
        </HStack>

        {/* Buttons Demo */}
        <VStack gap="sm">
          <Button title="Primary Button" />
          <Button title="Secondary Button" variant="secondary" />
          <Button title="Danger Button" variant="danger" />
          <Button title="Disabled Button" disabled />
        </VStack>
      </VStack>
    </Screen>
  );
}
