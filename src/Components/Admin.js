import React, { useState } from "react";
import { FileDrop } from "react-file-drop";
import axios from "axios";
import { v4 } from "uuid";

export default function Admin() {
  const [urls, setUrls] = useState([]);

  const getSignedRequest = (files) => {
    files = Array.from(files);
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = `${v4()}-${file.name.replace(/\s/g, "-")}`;
      axios
        .get("/api/signs3", {
          params: {
            "file-name": fileName,
            "file-type": file.type,
          },
        })
        .then((res) => {
          const { signedRequest, url } = res.data;
          uploadFile(file, signedRequest, url);
        })
        .catch((err) => console.log(err));
    }
  };

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    axios.put(signedRequest, file, options).then((res) => {
      setUrls([...urls, url]);
    });
  };

  return (
    <main>
      <h1>Admin Portal</h1>
      <div id="drop-zone">
        <FileDrop
          onDrop={(files) => {
            getSignedRequest(files);
          }}
        >
          Select multiple pictures, and drop them here to upload
        </FileDrop>
      </div>
    </main>
  );
}
