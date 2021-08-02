import fleekStorage from "@fleekhq/fleek-storage-js";
import { FirebaseStorage } from "../config/firebase";

export const importImage = async (event, uploadImage, setImageFile) => {
  const files = event.target.files;
  let reader = new FileReader();

  const onError = (error) => { 
    console.log("error", error) 
  }

  if (files.length > 0) {
    const fileInfo = {
      name: files[0].name,
      size: files[0].size,
      type: files[0].type,
    }
    
    const fileEncoding = "UTF-8"
    console.log('files[0]', files[0]);
    reader.onload = (event) => {
      uploadImage(reader.result);
      setImageFile(files[0]);
    }
    reader.readAsDataURL(files[0], fileEncoding);
  }
}

// filename: string
// data: Blob coming from line 46 in the above function importImage.
export const uploadToFleek = async (filename, data) => {
  const fleekStorageConfig = {
      apiKey: process.env.REACT_APP_FLEEK_KEY,
      apiSecret: process.env.REACT_APP_FLEEK_SECRET,
      ContentType: 'image/png',
      bucket: "mrrobot16-team-bucket",
      key: `proof-of-attendance/${filename}`,
      data,
  }
  console.log('fleekStorageConfig', fleekStorageConfig);

  const uploadedFile = await fleekStorage.upload(fleekStorageConfig);
  console.log('uploadedFile', uploadedFile);
}

// Calling this function requires making a deposit. 
// Store an image image using "@textile/near-storage"
export const storeImageTextile = async (image) => {
  console.log('store image utils', image);
  const obj =  {hello123123: 'world2' };
  const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
    try {
      const file = blob;
      const store = await window.api.store(file)
      console.log('store', store)
    } catch (error) {
      console.log('error in store', error);
    }
}

export const storeImageFirebase = async (filename, image) => {
  const file = image;
  let metadata = {
    contentType: 'image/jpeg',
  };

  FirebaseStorage.ref().child(filename.name).put(file, metadata).then((snapshot) => {
    console.log('snapshot', snapshot);
    console.log('Uploaded a blob or file!');
  });
}