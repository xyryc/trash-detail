import EmployeeHeader from "@/components/employee/EmployeeHeader";
import ProblemCard from "@/components/employee/ProblemCard";
import SearchBar from "@/components/shared/SearchBar";
import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

const Problem = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        <EmployeeHeader name={"Anik"} email={"mdtalathunnabi@gmail.com"} />

        <View className="pt-8 pb-6">
          <SearchBar />
        </View>

        {/* problem list */}
        <View>
          <Text className="mb-3" style={{ fontFamily: "SourceSans3-Medium" }}>
            Previous problem
          </Text>

          {/* title */}

          {/* problem cards */}
          <ProblemCard />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Problem;
