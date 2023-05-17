import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

export function SafeAreaViewWrapper(OriginalReactComponent: any) {
  return class extends Component {
    render() {
      return (
        <SafeAreaView style={{flex: 1}}>
          <OriginalReactComponent {...this.props} />
        </SafeAreaView>
      );
    }
  };
}
