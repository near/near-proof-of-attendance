import fleekStorage from "@fleekhq/fleek-storage-js";
import { BASE_URL } from "./endpoints";

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

export const storeImageFleek = async (file = [], setFleekUrl) => {
  const form = new FormData();
  const blob = new Blob([file]);
  form.append("binary_data", blob);
  form.append("filename", file.name);
  const endpoint = `${BASE_URL}/fleek/upload`;
  
  const response = await fetch(endpoint, {
    method: "POST",
    body: form,
  });
  // const json = await response.json()
  const { url } = await response.json();
  if(url) {
    window.open(url);
    setFleekUrl(url);
  }
}