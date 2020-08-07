import { noop } from "@/utils/utils";
import * as firebase from "firebase/app";
import "firebase/storage";

export function fileUpload({
  file,
  progress = noop,
  error = noop,
  success = noop
}) {
  const storageRef = firebase.storage().ref("photos/" + file.name);
  const task = storageRef.put(file);

  task.on("state_changed", progress, error, () => {
    task.snapshot.ref.getDownloadURL().then(downloadUrl => {
      success(downloadUrl);
    });
  });
}
