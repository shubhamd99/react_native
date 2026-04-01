import React, { useCallback, useEffect, useState } from 'react';
import { useLiveActivity, addVoltraListener } from 'voltra/client';
import { Voltra } from 'voltra';
import { Card, StatusBadge, VStack, HStack } from '../components/voltra/Primitives';

interface OrderState {
  orderId: string;
  status: 'Prepairing' | 'On the way' | 'Delivered';
  eta: string;
}

/**
 * Order Tracking Live Activity implementation
 */
export const OrderTrackingActivity: React.FC<OrderState> = ({ orderId, status, eta }) => {
  const activityName = `order-tracking-${orderId}`;
  const [pushToken, setPushToken] = useState<string | null>(null);

  // 1. Define UI Variants
  const variants = {
    lockScreen: (
      <Card>
        <HStack style={{ width: '100%' }} horizontalAlignment="center-horizontally">
          <VStack style={{ flex: 1 }}>
            <Voltra.Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
              Order #{orderId}
            </Voltra.Text>
            <Voltra.Text style={{ color: '#9CA3AF', fontSize: 14 }}>
              {status}
            </Voltra.Text>
          </VStack>
          <StatusBadge text={eta} color="#10B981" />
        </HStack>
      </Card>
    ),
    island: {
      compact: {
        leading: (
          <Voltra.Text style={{ color: '#F59E0B', fontWeight: 'bold' }}>🍕</Voltra.Text>
        ),
        trailing: (
          <Voltra.Text style={{ color: 'white', fontSize: 12 }}>{eta}</Voltra.Text>
        ),
      },
      minimal: (
        <Voltra.Text>🍕</Voltra.Text>
      ),
      expanded: {
        center: (
          <VStack style={{ padding: 12 }}>
            <HStack style={{ width: '100%' }} horizontalAlignment="center-horizontally">
              <Voltra.Text style={{ color: 'white', fontWeight: '800' }}>Pizza Delivery</Voltra.Text>
              <Voltra.Text style={{ color: '#F59E0B' }}>{eta} left</Voltra.Text>
            </HStack>
            <Voltra.Text style={{ color: '#9CA3AF', marginTop: 4 }}>
              Status: {status}
            </Voltra.Text>
          </VStack>
        )
      }
    }
  };

  // 2. Register and Start Activity
  const { start, update, end, isActive } = useLiveActivity(
    variants,
    {
      activityName,
      autoStart: true,
      autoUpdate: true,
    }
  );

  // 3. Listen for Push Token
  useEffect(() => {
    const subscription = addVoltraListener('activityTokenReceived', (event) => {
      if (event.activityName === activityName) {
        setPushToken(event.pushToken);
        console.log(`[OrderTrackingActivity] Push Token received: ${event.pushToken}`);
      }
    });

    return () => subscription.remove();
  }, [activityName]);

  // Handle manual updates (optional demo)
  const refreshStatus = useCallback(async (newStatus: string) => {
    await update(); // This will use the latest 'variants' if autoUpdate is on or we can pass new variants
  }, [update]);

  return null;
};
