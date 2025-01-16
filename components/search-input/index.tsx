import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";

const SearchInput = ({ initialQuery = "" }: { initialQuery?: string }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholder="Search a video topic"
        placeholderTextColor={"#CDCDE0"}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );
          if (pathname) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}>
        <Image source={icons.search} className="size-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
