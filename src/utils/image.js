import fleekStorage from "@fleekhq/fleek-storage-js";
import { FirebaseStorage } from "../config/firebase";

export const importImage = async (event, uploadImage, setImageFile) => {
  const files = event.target.files;
  let reader = new FileReader();
  const file = files[0];
  if(file.type.substr(0, 5) === "image") {
      const fileEncoding = "UTF-8";
      reader.onloadend = (event) => {
        uploadImage(reader.result); // uploadImage function comes from CreateNewBadges.js line 124.
        setImageFile(file); // this for setting a filename. setImageFile(useState Setter) function is being passed from CreateNewBadges.js line 129.
      }
      reader.readAsDataURL(file, fileEncoding);
  } else {
    console.log("this is not an image you are trying to upload");
  }
}

// filename: string
// data: Blob coming from line 46 in the above function importImage.
export const uploadToFleek = async (filename, data) => {
  const fleekStorageConfig = {
      apiKey: process.env.REACT_APP_FLEEK_KEY,
      apiSecret: process.env.REACT_APP_FLEEK_SECRET,
      ContentType: 'image/png', // I tried doing this but it is irrelevant.
      bucket: "mrrobot16-team-bucket",
      key: `proof-of-attendance/${filename}`,
      data, // this comes from CreateNewBadges.js line 141
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