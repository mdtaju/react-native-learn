import CustomButton from "@/components/custom-button";
import FormField from "@/components/form-field";
import { getCurrentUser, signIn } from "@/config/appWrite";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User Signed in Successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error as string);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="">
        <View className="w-full min-h-full justify-center items-center">
          <View className="w-full h-fit justify-center items-center px-4">
            <Image
              source={images.logo}
              className="w-[115px] h-[35px]"
              resizeMode="contain"
            />
            <Text className="text-white text-2xl font-semibold mt-10 text-center">
              Log in to Aora
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              containerStyles="mt-7"
              keyboardType="email-address"
              placeholder="Enter your email"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              containerStyles="mt-7"
              keyboardType="password"
              placeholder="Enter your password"
            />

            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-7 w-full"
              textStyles=""
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have account?
              </Text>
              <Link
                href={"/sign-up"}
                className="text-lg font-semibold text-secondary">
                Sign Up
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
