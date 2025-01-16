import { icons } from "@/constants";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const FormField = ({
  title = "",
  value = "",
  handleChangeText = () => "",
  containerStyles = "",
  keyboardType = "",
  placeholder = "",
}: {
  title: string;
  value: string;
  handleChangeText: (e: any) => any;
  containerStyles: string;
  keyboardType: string;
  placeholder: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 w-full ${containerStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-grow-[1] text-white font-psemibold text-base text-left"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "Password" || title === "Confirm Password") &&
            !showPassword
          }
        />
        {(title === "Password" || title === "Confirm Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="size-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
