import React, { useEffect } from 'react';

import { api } from './dependencies';

interface StartupMetrics {
  startStartupTime: number;
  endStartupTime: number;
  startupDuration: number;
}

// TODO(@lucasbento): figure out where to best place this function
const measureStartupTime = async (): Promise<void> => {
  try {
    const instrumentation = require('react-native')['NativeModules']['NativeInstrumentation'];
    const metrics: StartupMetrics = await instrumentation.getStartupTime();

    api.pushMeasurement({
      type: 'app_startup_time',
      values: {
        startup_duration_ms: metrics.startupDuration,
      },
    });
  } catch (error) {
    console.error('[NativeInstrumentation] Failed to measure startup time:', error);
  }
};

export function wrap<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithStartupTracking(props: P) {
    useEffect(() => {
      measureStartupTime();
    }, []);

    return <WrappedComponent {...props} />;
  };
}
