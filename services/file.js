import { noop } from "@/utils/utils";
import * as firebase from "firebase/app";
import "firebase/storage";

export function fileUpload({
  file,
  id,
  folder,
  progress = noop,
  error = noop,
  success = noop
}) {
  console.log(file);
  const storageRef = firebase.storage().ref(`${folder}/` + id);
  const task = storageRef.put(file);

  task.on("state_changed", progress, error, () => {
    task.snapshot.ref.getDownloadURL().then(downloadUrl => {
      success(downloadUrl);
    });
  });
}

export function deleteFile({ folder, id }) {
  // Create a reference to the file to delete
  const storageRef = firebase.storage().ref(`${folder}/` + id);

  // Delete the file
  return storageRef.delete();
}
