import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import ButtonSimple from '@Atom/Button/ButtonSimple';
import useTheme from '@Hooks/useTheme';

export type ButtonItemType = {
  id: number;
  name: string;
  action: () => void;
};

type Props = {
  buttonList: Array<ButtonItemType>;
  activeButton: number;
};

const ButtonGroup = ({buttonList, activeButton}: Props) => {
  const {Gutters} = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[Gutters.smallVPadding]}>
      {buttonList.length &&
        buttonList.map((button, i) => {
          return (
            <View style={styles.buttonWrapper} key={i}>
              <ButtonSimple
                title={button.name}
                buttonActive={button.id === activeButton}
                onPress={button.action}
              />
            </View>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    marginHorizontal: 5,
  },
});

export default ButtonGroup;
