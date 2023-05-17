import React, {useCallback} from 'react';
import {Container, Content} from '@Organism/Basic';
import Text from '@Atom/Text';
import {Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CreateCircle = () => {
  let navigation = useNavigation();

  const handleBackPressed = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container style={styles.container}>
      <Content showsVerticalScrollIndicator={false}>
        <Text>Create Circle</Text>
        <Button title="Back" onPress={handleBackPressed} />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CreateCircle;
