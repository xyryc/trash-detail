import { Platform } from "react-native";

export const uploadImageToServer = async (
  imageUri: string
): Promise<string> => {
  try {
    // Properly format URI for Android
    let uri = imageUri;
    if (Platform.OS === "android" && !uri.startsWith("file://")) {
      uri = `file://${uri}`;
    }

    const formData = new FormData();
    
    // For React Native, FormData expects an object with uri, type, and name
    formData.append("file", {
      uri: uri,
      type: "image/jpeg",
      name: `problem-${Date.now()}.jpg`,
    } as any);
    
    formData.append(
      "upload_preset",
      process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    console.log("Uploading image with URI:", uri);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const result = await response.json();
    console.log("Image upload result:", result);

    if (!response.ok) {
      console.error("Cloudinary upload error:", result);
      throw new Error(result.error?.message || "Upload failed");
    }

    return result.secure_url;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};