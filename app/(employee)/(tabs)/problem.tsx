import EmployeeHeader from "@/components/employee/EmployeeHeader";
import ProblemCard from "@/components/shared/ProblemCard";
import SearchBar from "@/components/shared/SearchBar";
import { useGetProblemListQuery } from "@/store/slices/employeeApiSlice";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Problem = () => {
  const router = useRouter();
  const {
    data: problemList,
    isLoading,
    isFetching,
    refetch,
  } = useGetProblemListQuery();
  const problems = problemList?.data;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1">
        <LinearGradient
          colors={["#EDFDF1", "#FFFFFF"]} // 0% to 100%
          start={{ x: 0, y: 0 }} // Top
          end={{ x: 0, y: 1 }} // Bottom (180deg)
          style={{ paddingHorizontal: 24 }}
        >
          <EmployeeHeader name={"Anik"} email={"mdtalathunnabi@gmail.com"} />

          <View className="pt-8 pb-6">
            <SearchBar />
          </View>
        </LinearGradient>

        {/* problem list */}
        <View className="flex-1 px-6">
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
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) =>
              isLoading ? (
                <SafeAreaView className="flex-1 justify-center items-center bg-white">
                  <ActivityIndicator size="large" color="#E2F2E5" />
                </SafeAreaView>
              ) : (
                <Pressable
                  onPress={() =>
                    router.push(`/(employee)/problem/details/${item._id}`)
                  }
                >
                  <ProblemCard data={item} />
                </Pressable>
              )
            }
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={refetch}
                colors={["#22C55E"]}
                tintColor="#22C55E"
              />
            }
            contentContainerStyle={{ gap: 12, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Problem;
