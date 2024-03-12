import { Api_Url } from "../api";

export async function CreateNewJob(formData) {
  return await fetch(Api_Url + "upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
