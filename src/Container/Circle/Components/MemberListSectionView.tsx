/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from '@Atom/Button';
import Text from '@Atom/Text';
import Icon from '@Atom/Icon';
import AvatarHeader, {type AvatarHeaderProps} from '@Molecule/AvatarHeader';
import {Colors} from '@Theme/Variables';
import {ACTION_TYPES} from 'src/Redux/constants/actionTypes';

const dummies: AvatarHeaderProps[] = [
  {
    author: {
      name: 'Agus sebastian',
      label: 'Admin',
      profilePicture: {
        uri: 'https://api.duniagames.co.id/api/content/upload/file/16061886261671541043.jpg',
      },
      online: true,
    },
    description: '@aguswarewolf',
    rightElement: (
      <Button type="iconOnly" icon="more-vertical" iconSize={'xl2'} noBorder />
    ),
  },
  {
    author: {
      name: 'Tirta sebastian',
      label: 'Admin',
      profilePicture: {
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAOShp1i5XEWQJz53daNCTu20Mf-rH9LrhZcir2hrz6sM6XQ4cwE1YGQq3ON0qISUfWsc&usqp=CAU',
      },
    },
    description: '@aguswarewolf',
    rightElement: (
      <Button type="iconOnly" icon="more-vertical" iconSize={'xl2'} noBorder />
    ),
  },
  {
    author: {
      name: 'Melius sebastian',
      profilePicture: {
        uri: 'https://cdnb.artstation.com/p/assets/images/images/008/898/373/large/henry-qiu-asset.jpg?1515982395',
      },
    },
    description: '@aguswarewolf',
    rightElement: (
      <Button type="iconOnly" icon="more-vertical" iconSize={'xl2'} noBorder />
    ),
  },
  {
    author: {
      name: 'Vita sebastian',
      label: 'Admin',
      profilePicture: {
        uri: 'https://sm.ign.com/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.jpg',
      },
    },
    description: '@aguswarewolf',
    rightElement: (
      <Button type="iconOnly" icon="more-vertical" iconSize={'xl2'} noBorder />
    ),
  },
  {
    author: {
      name: 'Reja sebastian',
      profilePicture: {
        uri: 'https://live.staticflickr.com/7004/6597729607_906d76f77b_w.jpg',
      },
    },
    description: '@aguswarewolf',
    rightElement: (
      <Button type="iconOnly" icon="more-vertical" iconSize={'xl2'} noBorder />
    ),
  },
];

const MemberListSectionView = () => {
  const [search, setSearch] = React.useState('');
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({
      type: ACTION_TYPES.CIRCLE.SHOW_FLOATING_CREATE_POST,
      payload: {
        showFloatingCreatePost: false,
      },
    });
  }, [dispatch]);

  const handleChangeCallback = React.useCallback(e => {
    const {text} = e.nativeEvent;

    setSearch(text);
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
        <Text variant="bold" text="Participants" />
        <Text text={`${dummies.length} Participants`} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: Colors.neutral[300],
          borderWidth: 1,
          borderRadius: 12,
          marginBottom: 30,
          paddingLeft: 14,
        }}>
        <Icon name="search" size={'xl'} />
        <TextInput
          placeholder="Search..."
          style={{
            paddingLeft: 12,
            paddingVertical: 5,
          }}
          onChange={handleChangeCallback}
        />
      </View>
      {dummies.map((dummy, i) => {
        if (dummy.author.name.toLowerCase().includes(search)) {
          return (
            <AvatarHeader
              key={i}
              author={dummy.author}
              description={dummy.description}
              rightElement={dummy.rightElement}
            />
          );
        }
      })}
    </View>
  );
};

export default MemberListSectionView;
