import useTheme from '@Hooks/useTheme';
import React from 'react'
import { Image, View } from "react-native";

interface CircleProfilePicProps {
  imageUri: string,
  diameter: number,
}

const CircleProfilePic = ({
  imageUri,
  diameter,

}: CircleProfilePicProps) => {
  const { Gutters, Layout, Colors } = useTheme()

  return (
    <View style={{ borderColor: Colors.white, borderWidth: 3, borderRadius: diameter / 2, width: diameter, height: diameter }}>
      <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
    </View>
  )
}

export default CircleProfilePic;