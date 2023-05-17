/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import Separator from '@Atom/Separator';
import {Button} from '@Atom/Button';
import Footer, {type FooterProps} from '@Molecule/Footer';
import AvatarHeader, {type AvatarHeaderProps} from '@Molecule/AvatarHeader';
import Popup, {type PopupProps} from '@Molecule/Popup';
import {Colors} from '@Theme/Variables';

export interface PostCardProps {
  heading: AvatarHeaderProps;
  content: JSX.Element;
  footer: FooterProps;
}

const popupdummy: PopupProps = {
  contents: [
    {
      icon: 'user-plus',
      name: 'Make Circle Admin',
      color: {
        icon: Colors.primary[600],
      },
    },
    {
      icon: 'user-x',
      name: 'Kick Member',
      color: {
        icon: Colors.red[600],
        name: Colors.red[600],
      },
    },
    {
      icon: 'delete',
      name: 'Ban Member',
      color: {
        icon: Colors.red[600],
        name: Colors.red[600],
      },
    },
    {
      icon: 'info',
      name: 'Report User',
      color: {
        icon: Colors.red[600],
        name: Colors.red[600],
      },
    },
  ],
};

const CirclePostCard = (props: PostCardProps) => {
  const {heading, content, footer} = props;
  const [showPopup, setShowPopup] = React.useState(false);

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingBottom: 18,
        paddingHorizontal: 16,
      }}>
      {showPopup ? (
        <View
          style={{
            alignItems: 'flex-end',
            marginRight: 50,
          }}>
          <Popup {...popupdummy} />
        </View>
      ) : null}
      <AvatarHeader
        author={{
          name: heading?.author.name,
          label: heading?.author.label,
          profilePicture: {
            uri: heading.author.profilePicture.uri,
          },
          online: heading.author.online,
        }}
        createdAt={heading.createdAt}
        rightElement={
          <Button
            iconSize={'xl3'}
            type="iconOnly"
            icon="more-vertical"
            onPress={() => setShowPopup(!showPopup)}
            noBorder
          />
        }
      />
      <View style={{marginLeft: 68}}>{content}</View>

      <View style={{marginLeft: 68}}>
        <Footer
          leftElement={footer.leftElement}
          rightElement={footer.rightElement}
        />
      </View>

      <Separator
        variant="horizontal"
        size={{
          height: 2,
        }}
        margin={12}
      />
    </View>
  );
};

export default React.memo(CirclePostCard);
