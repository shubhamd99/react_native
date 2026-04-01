import React from 'react';
import { Column, Text, Card, HorizontalMultiBrowseCarousel, HorizontalDivider } from '@expo/ui/jetpack-compose';
import { padding, fillMaxWidth, height } from '@expo/ui/jetpack-compose/modifiers';

export const CarouselDemo = () => {
  const items = [
    { id: '1', title: 'Card 1', color: '#FFCDD2' },
    { id: '2', title: 'Card 2', color: '#E1BEE7' },
    { id: '3', title: 'Card 3', color: '#C5CAE9' },
    { id: '4', title: 'Card 4', color: '#B2EBF2' },
    { id: '5', title: 'Card 5', color: '#C8E6C9' },
  ];

  return (
    <Column 
      verticalArrangement="top" 
      horizontalAlignment="start" 
      modifiers={[padding(16, 0, 16, 16), fillMaxWidth()]}
    >
      <Text style={{ typography: 'titleLarge' }} modifiers={[padding(0, 0, 0, 12)]}>
        Native Carousel
      </Text>

      <HorizontalMultiBrowseCarousel 
        preferredItemWidth={200}
        itemSpacing={8}
        contentPadding={{ start: 16, end: 16 }}
        modifiers={[fillMaxWidth(), height(160)]}
      >
        {items.map((item) => (
          <Card 
            key={item.id}
            colors={{ containerColor: item.color }}
            modifiers={[fillMaxWidth(), height(150), padding(8, 8, 8, 8)]}
          >
             <Column verticalArrangement="center" horizontalAlignment="center" modifiers={[fillMaxWidth()]}>
                <Text style={{ typography: 'headlineSmall' }}>{item.title}</Text>
             </Column>
          </Card>
        ))}
      </HorizontalMultiBrowseCarousel>

      <HorizontalDivider modifiers={[fillMaxWidth(), padding(0, 24, 0, 24)]} />
    </Column>
  );
};
