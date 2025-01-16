import EmptyListState from "@/components/empty-list-state";
import SearchInput from "@/components/search-input";
import Trending from "@/components/trending";
import VideoCard from "@/components/video-card";
import { getAllPosts } from "@/config/appWrite";
import { images } from "@/constants";
import useAppWrite from "@/hooks/useAppWrite";
import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch } = useAppWrite(getAllPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard data={item} />}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">Aora</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={[{ id: "1" }, { id: "2" }]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyListState
            title="No videos available"
            subtitle="Upload first video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
