import CustomButton from "@/components/custom-button";
import FormField from "@/components/form-field";
import { createUser } from "@/config/appWrite";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (
      form.name === "" ||
      form.email === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      return Alert.alert("Error", "All filed are required");
    }

    if (form.password !== form.confirmPassword) {
      return Alert.alert("Error", "Password doesn't matched.");
    }

    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.name);
      setUser(result);
      setIsLoggedIn(true);
      console.log(result);
      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error as string);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-full justify-center items-center">
          <View className="w-full h-fit justify-center items-center px-4">
            <Image
              source={images.logo}
              className="w-[115px] h-[35px]"
              resizeMode="contain"
            />
            <Text className="text-white text-2xl font-medium mt-5 text-center">
              Sign Up to Aora
            </Text>

            <FormField
              title="Full Name"
              value={form.name}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              containerStyles="mt-6"
              keyboardType="text"
              placeholder="Enter your full name"
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              containerStyles="mt-6"
              keyboardType="email-address"
              placeholder="Enter your email"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              containerStyles="mt-6"
              keyboardType="password"
              placeholder="Enter your password"
            />
            <FormField
              title="Confirm Password"
              value={form.confirmPassword}
              handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
              containerStyles="mt-6"
              keyboardType="password"
              placeholder="Enter your confirm password"
            />

            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7 w-full"
              textStyles=""
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Have an account already?
              </Text>
              <Link
                href={"/sign-in"}
                className="text-lg font-semibold text-secondary">
                Sign In
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
