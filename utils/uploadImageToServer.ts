import { useUploadImageMutation } from "@/store/slices/employeeApiSlice";

// Function to upload image to the server
export const uploadImageToServer = async (
  imageUri: string,
  uploadImage: ReturnType<typeof useUploadImageMutation>[0]
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: `problem-${Date.now()}.jpg`,
    } as any);

    const uploadResult = await uploadImage(formData).unwrap();

    // Log the upload result to see its structure
    console.log("Upload Result:", uploadResult);

    // Check the response structure and access imageUrl safely
    if (uploadResult.success) {
      return uploadResult.fileUrl; // Assuming `fileUrl` contains the image URL
    } else {
      throw new Error("Image upload failed: No success or data returned");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};
