import axios from "axios";
import React, { useState } from "react";

const UploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setLoading(true);
    axios
      .post("http://localhost:8080/uploadImage", { image: base64 })
      .then((res) => {
        setUrl(res.data);
        alert("Image upload Success");
        console.log(res);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        {url && (
          <div>
            Acess you file at {""}
            <a href={url} target="_blank" ref="noopener noreferrer">
              {url}
            </a>
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <div>Loading........</div>
        ) : (
          <>
            <label className="block text-black text-base mt-2" for="file">
              File
            </label>
            <input
              onChange={uploadImage}
              className=" border-2 rounded w-full text-black "
              type="file"
            />
          </>
        )}
      </div>
    </>
  );
};

export default UploadImage;
