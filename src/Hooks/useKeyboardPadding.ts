import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

const useKeyboardPadding = (initialState: number = 0) => {
  const [keyboardPadding, setKeyboardPadding] = useState(initialState);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e: any) => {
        setKeyboardPadding(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      (e: any) => {
        setKeyboardPadding(14);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return {keyboardPadding};
};

export default useKeyboardPadding;
