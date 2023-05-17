import React from 'react';
import {View, StyleSheet} from 'react-native';
import {width} from '@Theme/Layout';

interface PageMarkerProps {
  isActive: boolean;
}

const PageMarker = ({isActive}: PageMarkerProps) => {
  return (
    <View style={styles.container}>
      {isActive ? (
        <View style={styles.activeMarker}>
          {/* <View style={styles.activeButton} /> */}
        </View>
      ) : (
        <View style={styles.inactiveMarker}>
          <View style={styles.inactiveCircle} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
  },
  activeMarker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3AC4A0',
    borderRadius: 20,
    height: 10,
    width: width / 20,
  },
  inactiveMarker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    width: width / 15,
  },
  inactiveCircle: {
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    height: 10,
    width: 10,
  },
});

export default PageMarker;
