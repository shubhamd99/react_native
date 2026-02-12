import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { UnsafeObject } from 'react-native/Libraries/Types/CodegenTypes';

export interface AnalyticsEvent {
  schemaVersion: string;
  objectName: string;
  objectValue: UnsafeObject;
  userId: string;
  screenName: string;
  context: string;
}

export interface Spec extends TurboModule {
  sendAnalyticsEvent(analyticsEvent: AnalyticsEvent): void;
  getQueueLength(): Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeAnalytics');
