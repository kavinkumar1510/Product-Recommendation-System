import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";

function NewPro() {
  const [title, SetTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleproduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/product", {
        title: title,
        price: price,
        image: image,
      });
      if (response.data.sucess) {
        swal({
          title: "Done",
          text: response.data.sucess,
          icon: "success",
          timer: 2000,
          buttons: false,
        });
        SetTitle("");
        setPrice("");
        setImage("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  const handleimage = async (e) => {
    const file = e.target.files[0];
    if (!allowedTypes.includes(file.type)) {
      alert("Please select a valid image file (JPEG, PNG, or GIF).");
      e.target.value = null;
      return;
    }
    const fileSizeInMB = file.size / (1024 * 1024);
    const maxAllowedSizeInMB = 2;
    if (fileSizeInMB > maxAllowedSizeInMB) {
      alert(`Please select an image within ${maxAllowedSizeInMB} MB.`);
      e.target.value = null;
      return;
    }
    const base = await baseConverter(file);
    setImage(base);
  };
  const baseConverter = (file) => {
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
  return (
    <>
      <div className="container">
        <div
          style={{
            height: "100vh",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="wrapper p-3">
            <h4
              className="text-center text-uppercase text-dark mt-3 fw-bold t"
              style={{
                letterSpacing: "2px",
              }}
            >
              New Product
            </h4>
            <p className="text-center mt-1">
              Enter the details for the Prodcut.
            </p>
            <div className="p-3 text-center">
              <input
                type="text"
                required={true}
                placeholder="Title"
                value={title}
                onChange={(e) => SetTitle(e.target.value)}
                className="form-control my-3"
              />

              <input
                type="number"
                required={true}
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control mb-0 my-3"
              />
              <input
                type="file"
                required={true}
                placeholder="Expiring date"
                value={image}
                onChange={(e) => handleimage(e)}
                className="form-control mb-0 my-3 p-3"
              />

              <button className="login_btn mt-3 w-100" onClick={handleproduct}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="text-center text-uppercase">
          <h3
            style={{
              fontFamily: "Space Grotesk",
              letterSpacing: "1px",
              fontSize: "30px",
            }}
          >
            All Product
          </h3>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default NewPro;
