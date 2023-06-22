import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/data/store';
import { RootComponent } from "./src/components/RootComponent";


export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.app_wrapper}>
        <RootComponent />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  app_wrapper: {
    width: "100%",
    height: "100%",
    marginTop: 25
  }
});
