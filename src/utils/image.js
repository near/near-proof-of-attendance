import PapaParse from "papaparse";

import { FirebaseStorage } from "../config/firebase";

export const importImage = async (event, callback, callback2) => {
  const files = event.target.files;
  console.log('files', files);
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
    
    const parserOptions = {
      // header: true,
      // dynamicTyping: true,
      // skipEmptyLines: true,
      // transformHeader: header =>
      //   header
      //     .replace(/\W/g, '_')
    }

    reader.onload = (event) => {
      const imageData = PapaParse.parse(
        reader.result,
        Object.assign(parserOptions, {
          error: onError,
          encoding: fileEncoding,
        }),
      )
      const data = imageData.data;
      // console.log('data', data);
      const imageByteData = data[0][1];
      callback(imageByteData);
      callback2(files[0])
    }
    reader.readAsDataURL(files[0], fileEncoding);
  }
}

export const storeImage = async (image) => {
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
  // console.log('image', image);
  const file = image;
  console.log('filename', filename.name);
  console.log('FirebaseStorage', FirebaseStorage);
  console.log('FirebaseStorage.ref()', FirebaseStorage.ref());
  let metadata = {
    contentType: 'image/jpeg',
  };
  console.log('FirebaseStorage.ref().child()', FirebaseStorage.ref().child(filename.name));
  FirebaseStorage.ref().child(filename.name).put(file, metadata).then((snapshot) => {
    console.log('snapshot', snapshot);
    console.log('Uploaded a blob or file!');
  });

}