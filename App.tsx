/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, Platform} from 'react-native';
import Map from './src/screens/Map';
import {NativeModules} from 'react-native';

const {BatteryStatusModule} = NativeModules;

function App(): React.JSX.Element {
  const [isBatterySaverMode, setIsBatterySaverMode] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    // Check battery saver mode when the component mounts
    checkBatterySaverMode();

    // Update battery saver mode every 10 seconds
    const intervalId = setInterval(() => {
      checkBatterySaverMode();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const checkBatterySaverMode = () => {
    BatteryStatusModule.isBatterySaverModeEnabled()
      .then(result => setIsBatterySaverMode(result))
      .catch(error =>
        console.error('Error checking battery saver mode:', error),
      );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        {isBatterySaverMode !== null && (
          <Text>
            {Platform.OS === 'android'
              ? isBatterySaverMode
                ? 'Battery Saver Mode is ON'
                : 'Battery Saver Mode is OFF'
              : isBatterySaverMode
              ? 'Low Power Mode is ON'
              : 'Low Power Mode is OFF'}
          </Text>
        )}
      </View>
      <View style={{flex: 1}}>
        <Map />
      </View>
    </SafeAreaView>
  );
}

export default App;
