import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

export default function CommonContainer({style, children}) {
  return (
    <ScrollView>
      <View style={[styles.wrapper, style]}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
});
