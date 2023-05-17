import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Container, Content} from '@Organism/Basic';
import {Colors} from '@Theme/Variables';
import CircleLeaderBoard from './Components/CircleLeaderBoard';
import CircleListCompartment from './Components/CircleListCompartment';

const Connect = () => {
  return (
    <Container style={styles.container}>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <ScrollView>
          <CircleLeaderBoard />
          <CircleListCompartment />
        </ScrollView>
      </Content>
    </Container>
  );
};

export default Connect;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.offWhite,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
});