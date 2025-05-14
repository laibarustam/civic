import { supabase } from "./supabaseClient";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/gif",
];

// Simplified upload function that bypasses bucket checking
export async function uploadProfilePicture(file, userId) {
  try {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size too large. Maximum size is 5MB.");
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error("Invalid file type. Allowed types are: JPG, PNG, GIF");
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `${fileName}`;

    console.log("Starting direct upload to Supabase:", filePath);

    // Direct upload to bucket without checking first
    const { data, error } = await supabase.storage
      .from("profile-pictures")
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
        cacheControl: "3600",
      });

    if (error) {
      console.error("Upload failed with error:", error);
      // Create a more user-friendly error message
      let errorMessage = "Failed to upload profile picture";

      if (error.message.includes("new_bucket")) {
        errorMessage =
          "The storage bucket doesn't exist. Please contact support.";
      } else if (error.message.includes("Permission denied")) {
        errorMessage =
          "Permission denied. The app doesn't have proper access to storage.";
      } else if (error.statusCode === 413) {
        errorMessage = "File is too large to upload.";
      }

      throw new Error(errorMessage);
    }

    // Get the public URL without checking for errors
    const { data: publicUrl } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(filePath);

    console.log("Upload successful, URL:", publicUrl?.publicUrl);

    return publicUrl.publicUrl;
  } catch (error) {
    console.error("Profile picture upload error:", error);
    throw error;
  }
}

export async function deleteProfilePicture(userId) {
  try {
    const { error } = await supabase.storage
      .from("profile-pictures")
      .remove([`${userId}`]);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting profile picture:", error);
    throw error;
  }
}
