import { supabase } from "./supabaseClient";

/**
 * Checks if the profile-pictures bucket exists and creates it if not
 */
export async function ensureBucketExists() {
  try {
    // List all buckets
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      console.error("Error listing buckets:", error);
      return { success: false, error };
    }

    // Check if our bucket exists
    const bucketExists = buckets.some(
      (bucket) => bucket.name === "profile-pictures"
    );

    if (!bucketExists) {
      console.log("profile-pictures bucket does not exist, creating it...");

      // Create the bucket
      const { error: createError } = await supabase.storage.createBucket(
        "profile-pictures",
        {
          public: true, // Make it public
          fileSizeLimit: 5 * 1024 * 1024, // 5MB limit
        }
      );

      if (createError) {
        console.error("Error creating bucket:", createError);
        return { success: false, error: createError };
      }

      console.log("Bucket created successfully");
    } else {
      console.log("profile-pictures bucket already exists");
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error ensuring bucket exists:", error);
    return { success: false, error };
  }
}

/**
 * Tests if we can upload to the bucket
 */
export async function testBucketUpload() {
  try {
    // Create a small test file
    const testFile = new Blob(["test"], { type: "text/plain" });

    // Try to upload it
    const { data, error } = await supabase.storage
      .from("profile-pictures")
      .upload("test-upload.txt", testFile, {
        upsert: true,
      });

    if (error) {
      console.error("Test upload failed:", error);
      return { success: false, error };
    }

    console.log("Test upload succeeded");
    return { success: true };
  } catch (error) {
    console.error("Unexpected error during test upload:", error);
    return { success: false, error };
  }
}
