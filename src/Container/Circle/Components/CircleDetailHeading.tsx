/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import useTheme from '@Hooks/useTheme';
import Text from '@Atom/Text';
import {Button} from '@Atom/Button';
import {Avatar} from '@Atom/Avatar';
import {Colors} from '@Theme/Variables';
import {useTranslation} from 'react-i18next';

const data = {
  coverImageUrl:
    'https://images.news18.com/ibnlive/uploads/2021/11/bitcoin-2-163792336016x9.png',
  profilePictureUrl:
    'https://images.theconversation.com/files/506823/original/file-20230127-16-4cgk1e.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
  title: 'Bitcoin',
  description: "welcome to the group, let's cuan together",
  isPremium: true,
  amount: '99.000',
  members: '5.2K',
  createdBy: {
    profilePictureUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAOShp1i5XEWQJz53daNCTu20Mf-rH9LrhZcir2hrz6sM6XQ4cwE1YGQq3ON0qISUfWsc&usqp=CAU',
    username: '@tirtafarisaldi',
  },
};

const CircleDetailHeading = () => {
  const {Layout} = useTheme();
  const [join, setJoin] = React.useState(false);

  const toggleJoinClick = React.useCallback(() => {
    setJoin(!join);
  }, [join]);

  const {t} = useTranslation();

  return (
    <>
      <Image
        style={[
          Layout.fullWidth,
          {
            height: 117,
          },
        ]}
        source={{
          uri: data.coverImageUrl,
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          paddingBottom: 18,
          paddingHorizontal: 16,
          marginBottom: 16,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginTop: -36,
              borderWidth: 5,
              borderColor: 'white',
            }}
            source={{
              uri: data.profilePictureUrl,
            }}
          />
          <Button
            type="primary"
            colors={join ? Colors.neutral[300] : Colors.primary[600]}
            title={join ? t('connect.joined') : t('connect.join')}
            titleStyle={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 12,
            }}
            style={{
              height: 36,
              paddingVertical: 10,
            }}
            onPress={toggleJoinClick}
          />
          <Button type="iconOnly" icon="bell" iconSize={'xl'} noBorder />
          <Button
            type="iconOnly"
            icon="more-vertical"
            iconSize={'xl'}
            noBorder
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text variant="bold" text={data.title} size={'xl'} />
            {join ? null : (
              <Button type="iconOnly" icon="lock" iconSize={'lg'} noBorder />
            )}
          </View>
          <Text
            text={`IDR ${data.amount}`}
            variant="bold"
            color={Colors.secondary[600]}
            size={'sm'}
          />
        </View>
        {data.isPremium && <Text text="premium" color="#7555DA" size={'xs'} />}
        <Text text={data.description} size={'sm'} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 8,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar
              size={30}
              style={{
                marginRight: 8,
              }}
              imageUrl={data.createdBy.profilePictureUrl}
            />
            <Text
              text={data.createdBy.username}
              color={Colors.secondary[600]}
              size={'sm'}
            />
          </View>
          <Text
            text={`+${data.members} Members`}
            color={Colors.neutral[300]}
            size={'sm'}
          />
        </View>
      </View>
      <View />
    </>
  );
};

export default React.memo(CircleDetailHeading);
