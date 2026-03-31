import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '../components/ui/Button';
import { Box } from '../components/ui/Box';
import { Text } from '../components/ui/Text';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';

const GluestackUsage: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-slate-50 p-4">
      <Box className="mb-10">
        <Box className="mb-6">
          <Text size="4xl" bold className="text-slate-900">Gluestack v2</Text>
          <Text size="lg" className="text-slate-500">
            A shadcn-like approach for React Native using NativeWind.
          </Text>
        </Box>

        <Box className="mb-8">
          <Text size="2xl" bold className="mb-4">Buttons</Text>
          <Box className="flex-row flex-wrap gap-2">
            <Button variant="solid">Solid Button</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button isLoading>Loading</Button>
            <Button isDisabled>Disabled</Button>
          </Box>
        </Box>

        <Box className="mb-8">
          <Text size="2xl" bold className="mb-4">Inputs</Text>
          <Box className="gap-4">
            <Input placeholder="Default input" />
            <Input placeholder="Input with error" error="This field is required" />
            <Input placeholder="Disabled input" editable={false} />
          </Box>
        </Box>

        <Box className="mb-8">
          <Text size="2xl" bold className="mb-4">Cards</Text>
          <Card>
            <CardHeader>
              <Text size="xl" bold>Project Status</Text>
              <Text size="sm" className="text-slate-500">Overview of the current sprint</Text>
            </CardHeader>
            <CardContent>
              <Text>
                This card uses the shadcn-style composition. It's built using standard
                components and styled with NativeWind classes.
              </Text>
              <Box className="mt-4 p-3 bg-blue-50 rounded border border-blue-100">
                <Text size="sm" className="text-blue-700">
                  Tip: Gluestack v2 encourages copying these components into your project.
                </Text>
              </Box>
            </CardContent>
            <CardFooter className="flex-row justify-end gap-2">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Proceed</Button>
            </CardFooter>
          </Card>
        </Box>

        <Box className="mb-8">
          <Text size="2xl" bold className="mb-4">Layout (Box)</Text>
          <Box className="flex-row gap-2">
            <Box className="w-20 h-20 bg-red-500 rounded-lg shadow-md" />
            <Box className="w-20 h-20 bg-amber-500 rounded-lg shadow-lg" />
            <Box className="w-20 h-20 bg-emerald-500 rounded-lg shadow-xl" />
          </Box>
        </Box>
      </Box>
      <View className="h-[100px]" />
    </ScrollView>
  );
};

export default GluestackUsage;
