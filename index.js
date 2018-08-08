/** @format */

import { AppRegistry } from 'react-native';
// import App from './App';
import TodoList from './TodoList';
import { name as appName } from './app.json';
import SignIn from './SignIn';

AppRegistry.registerComponent(appName, () => SignIn);
