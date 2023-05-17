import Text from '@Atom/Text';
import React from 'react';

const hashtagFormatter = (text: string = '', tagColor: string = '#5E44FF') => {
  return text
    .split(/((?:^|\s)(?:#[a-z\d-]+))/gi)
    .filter(Boolean)
    .map((v, i) => {
      if (v.includes('#')) {
        return (
          <Text key={i} color={tagColor}>
            {v}
          </Text>
        );
      } else {
        return <Text key={i}>{v}</Text>;
      }
    });
};

export default hashtagFormatter;
