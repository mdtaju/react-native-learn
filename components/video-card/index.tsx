import React from "react";
import { Text, View } from "react-native";
import { Models } from "react-native-appwrite";

const VideoCard = ({ data }: { data: Models.Document }) => {
  const { title } = data;
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default VideoCard;
