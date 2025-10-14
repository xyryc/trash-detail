import EmptySearchList from "@/components/shared/EmptySearchList";
import Header from "@/components/shared/Header";
import ProblemCard from "@/components/shared/ProblemCard";
import SearchBar from "@/components/shared/SearchBar";
import { useAppSelector } from "@/store/hooks";
import { useGetAdminProblemListQuery } from "@/store/slices/adminApiSlice";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Problem = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const router = useRouter();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { data, isLoading, isFetching, refetch } = useGetAdminProblemListQuery(
    undefined,
    {
      skip: !isAuthenticated || !user,
      refetchOnMountOrArgChange: true,
    }
  );
  const problems = data?.data || [];

  // Filter problems (not chatListData) based on search and tab
  const filteredProblems = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      // If no search, just filter by tab
      return problems.filter((problem) => {
        if (selectedTab === "all") return true;
        if (selectedTab === "pending") return problem.status === "pending";
        if (selectedTab === "forwarded") return problem.status === "forwarded";
        return false;
      });
    }

    return problems.filter((problem) => {
      // Safe access with fallback to empty string
      const title = problem.title?.toLowerCase() || "";
      const customerId = problem.customerId?.toLowerCase() || "";
      const problemId = problem.problemId?.toLowerCase() || "";
      const locationName = problem.locationName?.toLowerCase() || "";
      const additionalNotes = problem.additionalNotes?.toLowerCase() || "";

      const matchesSearch =
        title.includes(query) ||
        customerId.includes(query) ||
        problemId.includes(query) ||
        locationName.includes(query) ||
        additionalNotes.includes(query);

      const matchesTab =
        selectedTab === "all" ||
        (selectedTab === "pending" && problem.status === "pending") ||
        (selectedTab === "forwarded" && problem.status === "forwarded");

      return matchesSearch && matchesTab;
    });
  }, [problems, searchText, selectedTab]);

  // Calculate counts for each tab
  const allCount = problems.length;
  const pendingCount = problems.filter((p) => p.status === "pending").length;
  const forwardedCount = problems.filter(
    (p) => p.status === "forwarded"
  ).length;

  // console.log(filteredProblems);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 relative">
        <LinearGradient
          colors={["#EDFDF1", "#FFFFFF"]} // 0% to 100%
          start={{ x: 0, y: 0 }} // Top
          end={{ x: 0, y: 1 }} // Bottom (180deg)
          style={{
            paddingHorizontal: 24,
            paddingBottom: 12,
          }}
        >
          <Header title={"Problem List"} />

          <SearchBar onSearch={(text) => setSearchText(text)} />
        </LinearGradient>

        {/* Tabs */}
        <View className="flex-row gap-3 px-6">
          {/* All */}
          <Pressable
            onPress={() => setSelectedTab("all")}
            className={`px-3.5 py-3 ${selectedTab === "all" ? "border-b-2 border-green-normal" : ""}`}
          >
            <Text
              className={`text-sm ${
                selectedTab === "all"
                  ? "text-green-normal"
                  : "text-neutral-normal"
              }`}
              style={{ fontFamily: "SourceSans3-Medium" }}
            >
              All ({allCount})
            </Text>
          </Pressable>

          {/* Pending */}
          <Pressable
            onPress={() => setSelectedTab("pending")}
            className={`px-3.5 py-3 relative ${selectedTab === "pending" ? "border-b-2 border-green-normal" : ""}`}
          >
            <Text
              className={`text-sm ${
                selectedTab === "pending"
                  ? "text-green-normal"
                  : "text-neutral-normal"
              }`}
              style={{ fontFamily: "SourceSans3-Medium" }}
            >
              Pending ({pendingCount})
            </Text>

            {/* Red dot indicator - only show if there are pending items */}
            {pendingCount > 0 && (
              <View className="absolute top-2.5 right-1 w-2 h-2 bg-secondary-orange-500 rounded-full" />
            )}
          </Pressable>

          {/* Forwarded */}
          <Pressable
            onPress={() => setSelectedTab("forwarded")}
            className={`px-3.5 py-3 ${selectedTab === "forwarded" ? "border-b-2 border-green-normal" : ""}`}
          >
            <Text
              className={`text-sm ${
                selectedTab === "forwarded"
                  ? "text-green-normal"
                  : "text-neutral-normal"
              }`}
              style={{ fontFamily: "SourceSans3-Medium" }}
            >
              Forwarded ({forwardedCount})
            </Text>
          </Pressable>
        </View>

        <View className="flex-1 px-6">
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
          {isLoading || isFetching ? (
            <View className="flex-1 justify-center">
              <ActivityIndicator size="small" color="#E2F2E5" />
            </View>
          ) : (
            <FlatList
              data={filteredProblems}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    router.push(`/(admin)/problem/details/${item._id}`)
                  }
                >
                  <ProblemCard data={item} />
                </TouchableOpacity>
              )}
              contentContainerStyle={{ gap: 12, paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isFetching}
                  onRefresh={refetch}
                  colors={["#22C55E"]}
                  tintColor="#22C55E"
                />
              }
              ListEmptyComponent={
                <EmptySearchList
                  searchQuery={searchText}
                  setSearchQuery={setSearchText}
                />
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Problem;
