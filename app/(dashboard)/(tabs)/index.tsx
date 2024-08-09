import { SafeAreaView, StyleSheet, } from 'react-native';
import React from 'react';

// Components
import { HeaderAuth, ScrollableHorizontalView, RoundedBoxView } from 'components/export';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderAuth />
      <ScrollableHorizontalView />
      <RoundedBoxView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
