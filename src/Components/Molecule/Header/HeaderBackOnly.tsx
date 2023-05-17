import {Button} from '@Atom/Button';
import useTheme from '@Hooks/useTheme';
import {navigateBack} from '@Navigators/utils';
import React from 'react';
import {HeaderWrapper, IHeaderBack} from './index';

const HeaderBackOnly = ({style, onPress, iconColor}: IHeaderBack) => {
  const {Colors} = useTheme();
  const defaultIconColor = Colors.buttonTitle;
  const defaultAction: VoidFunction = () => {
    navigateBack();
  };

  return (
    <HeaderWrapper style={style}>
      <Button
        type="iconOnly"
        icon={'arrow-left'}
        iconColor={iconColor ? iconColor : defaultIconColor}
        onPress={onPress ? onPress : defaultAction}
        noBorder
      />
    </HeaderWrapper>
  );
};

export default HeaderBackOnly;
