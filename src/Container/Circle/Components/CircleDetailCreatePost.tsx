/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Separator from '@Atom/Separator';
import {TextInput} from '@Atom/TextInput';
import {Button} from '@Atom/Button';
import {Avatar} from '@Atom/Avatar';
import {Colors} from '@Theme/Variables';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useTranslation} from 'react-i18next';

const CircleDetaiCreatePost = () => {
  const [activeCamera, setActiveCamera] = React.useState(false);
  const {t} = useTranslation();
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          paddingBottom: 18,
          padding: 16,
          marginBottom: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar
            size={48}
            style={{
              marginRight: 19,
            }}
          />
          <TextInput placeholder={t('connect.write')} />
        </View>
        <Separator
          variant="horizontal"
          size={{
            height: 2,
          }}
          margin={12}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button
            icon="gif-box-outline"
            iconColor={Colors.primary[600]}
            iconSize={30}
            noBorder
            title={t('connect.gif')}
            style={{
              backgroundColor: 'transparent',
              marginLeft: -20,
            }}
          />

          <Separator
            variant="vertical"
            size={{
              width: 2,
            }}
          />

          <Button
            icon="camera"
            iconColor={Colors.primary[600]}
            iconSize={30}
            noBorder
            title={t('connect.camera')}
            style={{
              backgroundColor: 'transparent',
            }}
            onPress={() => setActiveCamera(true)}
          />
        </View>
      </View>
      {device && <Camera device={device} isActive={activeCamera} />}
    </>
  );
};

export default React.memo(CircleDetaiCreatePost);
