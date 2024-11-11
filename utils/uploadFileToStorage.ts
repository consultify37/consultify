import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase"

export const uploadFileToStorage = async (file: File) => {
  return new Promise(async (resolve, reject) => {
    try {
      const reference = ref(storage, file?.name)
      let fileSnapshot = await uploadBytes(reference, file!)

      let fileUrl = await getDownloadURL(reference)
      resolve({ fileName: fileSnapshot.ref.fullPath, url: fileUrl })
    } catch (e) {
      reject(e)
    }
  })
}