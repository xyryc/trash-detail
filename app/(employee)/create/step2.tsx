import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import { StepComponentProps } from "@/types";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Location from "expo-location";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Step2({
  data,
  onComplete,
  goToStep,
}: StepComponentProps) {
  const [locationName, setLocationName] = useState(data.locationName || "");
  const [location, setLocation] = useState(data.location || null);
  const [problemTitle, setProblemTitle] = useState(data.problemTitle);
  const [additionalNotes, setAdditionalNotes] = useState(data.additionalNotes);
  const [isLocating, setIsLocating] = useState(false);

  const handleLocateMe = useCallback(async () => {
    try {
      if (isLocating) return;
      setIsLocating(true);

      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert(
          "Permission required",
          "Enable location access to autofill the problem location."
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const point = {
        type: "Point" as const,
        coordinates: [position.coords.longitude, position.coords.latitude] as [
          number,
          number,
        ],
      };
      setLocation(point);

      const [place] = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      if (place) {
        const line1 = [place.streetNumber, place.street]
          .filter(Boolean)
          .join(" ")
          .trim();

        const city = place.city || place.subregion;
        const region = place.region;
        const country = place.country;

        const friendly = [line1 || place.name, city, region, country]
          .filter(Boolean)
          .join(", ")
          .trim();

        if (friendly) setLocationName(friendly);
      }
    } catch (error) {
      console.error("Locate me error:", error);
      Alert.alert("Error", "Couldn't get your current location.");
    } finally {
      setIsLocating(false);
    }
  }, [isLocating]);

  const handleNext = () => {
    const updatedData = {
      locationName,
      location,
      problemTitle,
      additionalNotes,
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
      <ScrollView
        className="px-4 bg-[#F5F9F6]"
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      >
        {/* title */}
        <View className="flex-grow my-10">
          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className="text-lg text-center"
          >
            Problem Details
          </Text>
          <Text
            style={{ fontFamily: "SourceSans3-Medium" }}
            className="text-neutral-normal text-center"
          >
            Add a title and description for this issue
          </Text>
        </View>

        {/* image */}
        <View>
          {data.imageUri && (
            <Image
              source={{ uri: data.imageUri }}
              style={{
                height: 300,
                borderRadius: 10,
                marginHorizontal: 8,
              }}
              contentFit="cover"
            />
          )}
        </View>

        {/* form */}
        <View className="bg-white border-[0.5px] border-neutral-light-hover p-4 mx-2 rounded-lg mt-10 mb-20">
          <View>
            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className="text-neutral-normal mb-2"
            >
              Location:
            </Text>

            <TextInput
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
              placeholder="5th Avenue, Manhattan, New York"
              value={locationName}
              onChangeText={setLocationName}
            />

            <TouchableOpacity
              onPress={handleLocateMe}
              disabled={isLocating}
              accessibilityRole="button"
              accessibilityLabel="Locate me"
              className="flex-row items-center gap-2 mt-3"
            >
              {isLocating ? (
                <ActivityIndicator size="small" color="#386B45" />
              ) : (
                <MaterialIcons name="my-location" size={18} color="black" />
              )}
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-neutral-dark"
              >
                Locate me
              </Text>
            </TouchableOpacity>
          </View>

          <View className="my-5">
            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className="text-neutral-normal mb-2"
            >
              Problem Title:
            </Text>

            <TextInput
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
              placeholder="Car Parked"
              maxLength={20}
              value={problemTitle}
              onChangeText={setProblemTitle}
            />

            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className={`text-xs text-right mt-1 ${
                //@ts-ignore
                problemTitle.length > 18
                  ? "text-error-normal"
                  : "text-neutral-normal"
              }`}
            >
              {problemTitle?.length}/20
            </Text>
          </View>

          <View>
            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className="text-neutral-normal mb-2"
            >
              Additional Notes:
            </Text>

            <TextInput
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
              placeholder="We couldn't collect the trash because a car is blocking the bin."
              multiline={true}
              value={additionalNotes}
              onChangeText={setAdditionalNotes}
            />
          </View>
        </View>
      </ScrollView>

      {/* retake and next buttons */}
      <View className="absolute bottom-0 left-0 right-0 flex-row gap-8 py-4 px-6 bg-white border-t border-neutral-light-hover">
        <ButtonSecondary
          title="Retake"
          onPress={() => goToStep?.(1)}
          icon={<Feather name="camera" size={24} color="black" />}
          className="flex-grow"
        />

        <ButtonPrimary
          title="Next"
          onPress={handleNext}
          className="flex-grow"
        />
      </View>
    </AnimatedView>
  );
}
