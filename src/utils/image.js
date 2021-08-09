import fleekStorage from "@fleekhq/fleek-storage-js";

import { FirebaseStorage } from "../config/firebase";

export const importImage = async (event, uploadImage, setImageFile) => {
  const files = event.target.files;
  let reader = new FileReader();
  const file = files[0];
  if(file.type.substr(0, 5) === "image") {
      const fileEncoding = "UTF-8";
      reader.onloadend = (event) => {
        uploadImage(reader.result);
        setImageFile(file);
      }
      reader.readAsDataURL(file, fileEncoding);
  } else {
    console.log("this is not an image you are trying to upload");
  }
}

export const storeImageFleek = async (filename, data, setFleekUrl) => {
  const config = {
      apiKey: process.env.REACT_APP_FLEEK_KEY,
      apiSecret: process.env.REACT_APP_FLEEK_SECRET,
      bucket: "mrrobot16-team-bucket",
      key: `proof-of-attendance/${filename}`,
      data,
  }

  const uploadedFile = await fleekStorage.upload(config);
  const url = `https://ipfs.fleek.co/ipfs/${uploadedFile.hash}`
  window.open(url);
  setFleekUrl(url)
}

// For future storing alternative.
export const storeImageTextile = async (image, filename, setNFTHash, checkHasDeposit) => {
    try {
      const raw = {
        image
      }
      const blob = new Blob([JSON.stringify(raw, null, 2)], { type: "application/json"});
      const file = blob;
      const store = await window.api.store(file);
      // console.log('store', store);
      const url = `https://ipfs.io/ipfs/${store.cid["/"]}`;
      window.open(url);
      setNFTHash(url);
    } catch (error) {
      console.log('error in store', error);
      checkHasDeposit();
      alert("Before storing data using textile first make a deposit");    
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