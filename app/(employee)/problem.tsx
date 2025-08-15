import problems from "@/assets/data/problems.json";
import EmployeeHeader from "@/components/employee/EmployeeHeader";
import ProblemCard from "@/components/employee/ProblemCard";
import SearchBar from "@/components/shared/SearchBar";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Problem = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        <EmployeeHeader name={"Anik"} email={"mdtalathunnabi@gmail.com"} />

        <View className="pt-8 pb-6">
          <SearchBar />
        </View>

        {/* problem list */}
        <View className="flex-1">
          <Text style={{ fontFamily: "SourceSans3-Medium" }}>
            Previous problem
          </Text>

          {/* title */}
          <View className="px-2 flex-row py-3">
            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-neutral-normal text-[10px] w-[38%]"
            >
              Problem
            </Text>

            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-neutral-normal text-[10px] w-[41%]"
            >
              Customer
            </Text>

            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-neutral-normal text-[10px] w-[21%]"
            >
              Status
            </Text>
          </View>

          {/* problem cards */}
          <FlatList
            data={problems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  router.push(`/employee/problem/details/${item.id}`)
                }
              >
                <ProblemCard data={item} />
              </Pressable>
            )}
            contentContainerStyle={{ gap: 12 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Problem;
