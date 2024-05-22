import 'react-native';
import React from 'react';
import App from '../src/App';
import {render} from '@testing-library/react-native';
import { Provider } from "react-redux";
import Store from '../src/Redux/Store/Store';

test('renders correctly', () => {
  render(<Provider store={Store}><App /></Provider>);
});
