import React from 'react';
const RNGestureHandlerModule = jest.mock('react-native-gesture-handler', () => {
  return {
    ...jest.requireActual('react-native-gesture-handler'),
  };
});

export default RNGestureHandlerModule;
