import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
 

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const uploadImage = async (file: File): Promise<string> => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds 5MB limit");
  }

  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `images/${timestamp}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    if (error instanceof Error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while uploading the image");
    }
  }
};