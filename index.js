/**
 * @format
 */

import 'react-native-gesture-handler';
import 'react-native-reanimated';

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
