import { Platform } from "react-native";

export const uploadImageToServer = async (
  imageUri: string
): Promise<string> => {
  try {
    // Fix Android file path
    let uri = imageUri;
    if (Platform.OS === "android") {
      uri = uri.replace("file://", "");
    }

    const formData = new FormData();
    formData.append("file", {
      uri,
      type: "image/jpeg",
      name: `problem-${Date.now()}.jpg`,
    });
    formData.append(
      "upload_preset",
      process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }
    );

    const result = await response.json();
    console.log("image upload result", result);

    if (!response.ok) {
      console.error("Cloudinary upload error:", result);
      throw new Error(result.error?.message || "Upload failed");
    }

    // Cloudinary returns `secure_url` (HTTPS URL)
    return result.secure_url;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};
