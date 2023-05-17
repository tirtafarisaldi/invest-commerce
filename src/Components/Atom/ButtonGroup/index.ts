import {StyleProp, ViewProps, ViewStyle} from 'react-native';
import UpDownVote from './UpDownVote';

export interface IUpDownButton extends ViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  onPressUp?: () => void;
  onPressDown?: () => void;
}

export {UpDownVote};
