import {useTheme} from '@Hooks/index';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function RadioButton({icon,isChecked, text, onRadioButtonPress}) {
  const {Images} = useTheme();
  const _renderCheckedView = () => {
    return isChecked ? (
      <View style={[styles.radioButtonIconInnerIcon]} />
    ) : null;
  };

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onRadioButtonPress}>
         <View>
      <FastImage
        source={icon}
        resizeMode={FastImage.resizeMode.contain}
        style={[{width: 30, height: 30}]}
      />
      </View>
      <View style={[styles.radioButtonTextContainer]}>
        <Text style={styles.radioButtonText}>{text}</Text>
      </View>
      <View style={[styles.radioButtonIcon]}>{_renderCheckedView()}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonIcon: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIconInnerIcon: {
    height: 20,
    width: 20,
    backgroundColor: 'red',
    borderRadius: 20 / 2,
    borderWidth: 2,
    borderColor: 'white',
  },
  radioButtonTextContainer: {
    flex: 5,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  radioButtonText: {
    fontSize: 18,
  },
});
