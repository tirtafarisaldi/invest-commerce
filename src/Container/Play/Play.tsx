import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Container, Content} from '@Organism/Basic';
import Text from '@Atom/Text';
import {WorkInProgress} from 'src/Components/Template';
import useTheme from '@Hooks/useTheme';

const Play = () => {
  const {Layout, Common, Colors, Gutters, Images} = useTheme();
  return (
    <Container style={{backgroundColor: Colors.neutral[200]}}>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[Layout.fill]}>
        <WorkInProgress style={[Gutters.smallTMargin]} />
      </Content>
    </Container>
  );
};

export default Play;

const styles = StyleSheet.create({});
