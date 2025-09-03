import CustomerCard from "@/components/employee/CustomerCard";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import SearchBar from "@/components/shared/SearchBar";
import { useGetCustomerListQuery } from "@/store/slices/employeeApiSlice";
import { StepComponentProps } from "@/types";
import { Image } from "expo-image";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Step3({
  data,
  onComplete,
  goToStep,
}: StepComponentProps) {
  const [customerId, setCustomerId] = useState(data.customerId);
  const [selected, setSelected] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const { data: customerList, isLoading } = useGetCustomerListQuery();
  const customers = customerList?.data || [];

  // console.log("step3", customerId, selectedCustomerId);

  const handleNext = () => {
    const updatedData = {
      customerId,
    };

    // Call onComplete function to update the data object in the parent component
    onComplete(updatedData);
  };

  return (
    <AnimatedView
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
      className="py-4 flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="px-6 bg-[#F5F9F6]">
          {/* image */}
          {data.imageUri && (
            <Image
              source={{ uri: data.imageUri }}
              style={{
                width: 210,
                height: 210,
                borderRadius: 6,
                marginHorizontal: "auto",
              }}
              contentFit="cover"
            />
          )}

          {/* customer list */}
          <View className="my-4">
            <SearchBar className="bg-[#F2F2F2]" />

            <View className="my-3 px-2 bg-neutral-light rounded-lg h-2/3 border border-neutral-light-hover">
              {isLoading ? (
                <View className="flex-1 justify-center items-center">
                  <ActivityIndicator size="large" />
                </View>
              ) : (
                <FlatList
                  data={customers}
                  renderItem={({ item }) => (
                    <CustomerCard
                      customer={item}
                      isSelected={selectedCustomerId === item._id}
                      onPress={(customer: any) => {
                        setSelectedCustomerId(customer._id);
                        setCustomerId(item.userId);
                        setSelected(true);
                      }}
                    />
                  )}
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingVertical: 8 }}
                />
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* back and next buttons */}
      <View className="absolute bottom-0 left-0 right-0 flex-row gap-8 py-4 px-6 bg-white border-t border-neutral-light-hover">
        <ButtonSecondary
          title="Back"
          onPress={() => goToStep?.(2)}
          className="flex-grow"
        />

        <ButtonPrimary
          title="Overview"
          onPress={handleNext}
          className="flex-grow"
        />
      </View>
    </AnimatedView>
  );
}
