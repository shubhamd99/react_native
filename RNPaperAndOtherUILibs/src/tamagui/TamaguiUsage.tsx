import React from 'react';
import { 
  Button, 
  Card, 
  H1, 
  H2, 
  H3, 
  Input, 
  Label, 
  Paragraph, 
  Separator, 
  XStack, 
  YStack, 
  Switch,
  Text,
  ScrollView,
  Checkbox,
  View
} from 'tamagui';
import { Check as CheckIcon, ChevronRight } from '@tamagui/lucide-icons';

const TamaguiUsage: React.FC = () => {
  return (
    <ScrollView padding="$4" backgroundColor="$background">
      <YStack gap="$4" marginBottom="$10">
        <YStack gap="$2">
          <H1>Tamagui</H1>
          <Paragraph size="$4" color="$color">
            Comprehensive UI kit for React Native and Web with a powerful compiler.
          </Paragraph>
        </YStack>

        <Separator />

        <YStack gap="$4">
          <H2>Stacks & Layout</H2>
          <XStack gap="$2" justifyContent="center">
            <YStack width={100} height={100} backgroundColor="$red10" borderRadius="$4" />
            <YStack width={100} height={100} backgroundColor="$blue10" borderRadius="$4" />
            <YStack width={100} height={100} backgroundColor="$green10" borderRadius="$4" />
          </XStack>
        </YStack>

        <YStack gap="$4">
          <H2>Typography</H2>
          <H1>Heading 1</H1>
          <H2>Heading 2</H2>
          <H3>Heading 3</H3>
          <Text fontSize="$5">Standard Text with font size $5</Text>
          <Paragraph>This is a paragraph. It has default spacing and line height suitable for long-form text.</Paragraph>
        </YStack>

        <YStack gap="$4">
          <H2>Buttons</H2>
          <XStack gap="$2" flexWrap="wrap">
            <Button>Default</Button>
            <Button theme="active">Active</Button>
            <Button variant="outlined">Outlined</Button>
            <Button circular icon={ChevronRight} />
            <Button size="$6">Large Button</Button>
          </XStack>
        </YStack>

        <YStack gap="$4">
          <H2>Cards</H2>
          <Card elevation="$4" size="$4" borderWidth={1} borderColor="$borderColor">
            <Card.Header padding="$4">
              <H2>Tamagui Card</H2>
              <Paragraph theme="alt2">Beautifully crafted cards</Paragraph>
            </Card.Header>
            <Card.Footer padding="$4">
              <XStack flex={1} />
              <Button borderRadius="$10">Purchase</Button>
            </Card.Footer>
          </Card>
        </YStack>

        <YStack gap="$4">
          <H2>Forms</H2>
          <YStack gap="$4" borderWidth={1} borderColor="$borderColor" padding="$4" borderRadius="$4">
            <XStack alignItems="center" gap="$4">
              <Label width={90} htmlFor="name">Name</Label>
              <Input flex={1} id="name" placeholder="John Doe" />
            </XStack>
            
            <XStack alignItems="center" gap="$4">
              <Label width={90}>Active</Label>
              <Switch size="$3">
                <Switch.Thumb />
              </Switch>
            </XStack>

            <XStack alignItems="center" gap="$4">
              <Checkbox size="$4">
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox>
              <Label>Accept terms and conditions</Label>
            </XStack>
          </YStack>
        </YStack>
        
        <View height={100} />
      </YStack>
    </ScrollView>
  );
};

export default TamaguiUsage;
