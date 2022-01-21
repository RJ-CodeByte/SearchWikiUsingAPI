/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Converter from './Screens/Converter';
import RdxConverter from './Screens/UsingRedux';
import GetParamsApi from './Screens/Search';
import { Provider } from "react-redux";
import { Store } from "./Redux/Store";

class App extends Component
{
  render(){
    return(
      <Provider store={Store}>
      <GetParamsApi/>
      </Provider>
    )
  }
}


// const styles = StyleSheet.create({
// });

export default App;
