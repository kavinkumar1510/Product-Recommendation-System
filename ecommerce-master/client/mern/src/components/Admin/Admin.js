import axios from "axios";
import swal from "sweetalert";
import "./Admin.css";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import NewPro from "./NewProduct";
function Admin() {
  const [cou, setCou] = useState("");
  const [title, setTitle] = useState("");
  const [offer, setOffer] = useState("");
  const [Code, setCode] = useState("");
  const [date, setDate] = useState("");
  const [couponCodes, setCouponCodes] = useState([]);
  const [newproduct, Setnewproduct] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTimeForCoupons();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [couponCodes]);

  const handlecoupon = async (e) => {
    e.preventDefault();
    if (title === "" || offer === "" || Code === "" || date === "") {
      return;
    }

    const expirationDate = new Date(date);
    const currentTime = new Date();

    if (expirationDate <= currentTime) {
      toast.error("expiring time should be greater than current time !");
      return;
    }
    if (offer <= 0) {
      toast.error("Please provide an Valid offer");
      return;
    }
    const data = {
      title: title,
      offer: offer,
      code: Code,
      date: expirationDate,
    };
    await axios
      .post("http://localhost:3002/coupon", {
        data: data,
      })
      .then((res) => {
        if (res.data.success) {
          swal({
            title: "Done",
            text: res.data.success,
            icon: "success",
            timer: 2000,
            buttons: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, [2500]);

          setTitle("");
          setCode("");
          setOffer("");
          setDate("");
          return;
        }
        if (res.data.error) {
          alert(res.data.error);
        }
        console.log(res);
      });
  };
  const deletepanalama = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handledelete(id);
      } else {
        swal("Your Coupon is safe!");
      }
    });
  };
  const handledelete = async (id) => {
    try {
      const deletes = await axios.post("http://localhost:3002/deletecoupon", {
        id: id,
      });
      if (deletes.data.success) {
        swal({
          title: "Deleted",
          text: deletes.data.success,
          icon: "success",
          timer: 2000,
          buttons: false,
        });
        setCouponCodes((prevCoupons) =>
          prevCoupons.filter((coupon) => coupon._id !== id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchcoupon = async () => {
    try {
      const response = await axios.get("http://localhost:3002/coupon");
      if (response.data) {
        setCouponCodes(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  function calculateRemainingTime(expirationDate) {
    const now = new Date(); // Current time
    const expirationTime = new Date(expirationDate); // Expiration time
    const timeDifference = expirationTime - now; // Difference in milliseconds

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }
  function setRemainingTimeForCoupons() {
    setCouponCodes((prevCoupons) => {
      return prevCoupons.map((coupon) => {
        const remainingTime = calculateRemainingTime(coupon.expirationdate);
        return { ...coupon, remainingTime };
      });
    });
  }
  return (
    <>
      <Toaster />
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="text-center">
          <button
            className="btn btn-dark"
            onClick={() => {
              fetchcoupon();
              setCou(!cou);
            }}
          >
            Coupon
          </button>
          <button
            className="btn btn-dark mx-3"
            onClick={() => Setnewproduct(true)}
          >
            New Product
          </button>
          <button className="btn btn-dark">Customer Details</button>
        </div>
        <div>
          {cou && (
            <>
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
                    New Coupon
                  </h4>
                  <p className="text-center mt-1">
                    Enter the details for the Coupon.
                  </p>
                  <div className="p-3 text-center">
                    <input
                      type="text"
                      required={true}
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control my-3"
                    />
                    <input
                      type="text"
                      required={true}
                      placeholder="Coupon Code"
                      value={Code}
                      onChange={(e) => setCode(e.target.value)}
                      className="form-control mb-0 my-3"
                    />
                    <input
                      type="number"
                      required={true}
                      placeholder="Offer %"
                      value={offer}
                      onChange={(e) => setOffer(e.target.value)}
                      className="form-control mb-0 my-3"
                    />
                    <input
                      type="date"
                      required={true}
                      placeholder="Expiring date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="form-control mb-0 my-3 p-3"
                    />

                    <button
                      className="login_btn mt-3 w-100"
                      onClick={handlecoupon}
                    >
                      Add Coupon
                    </button>
                  </div>
                </div>
              </div>
              <div className="container ">
                <p
                  className="text-center text-uppercase fw-bold"
                  style={{
                    fontFamily: "Space Grotesk",
                    letterSpacing: "1px",
                    fontSize: "30px",
                  }}
                >
                  All Coupons
                </p>
                <div>
                  <div className="container mt-5">
                    <div className="row gy-5 text-center">
                      {couponCodes.length <= 0 ? (
                        <div className="text-center">
                          <p className="mt-3"> No Coupons Available</p>
                        </div>
                      ) : (
                        <>
                          {couponCodes.map((coup) => (
                            <div className="col-xl-6" key={coup._id}>
                              <div className="product__coupon-item mb-30 p-relative d-md-flex justify-content-between align-items-center">
                                <span className="product__coupon-border"></span>
                                <div className="product__coupon-item-left d-sm-flex align-items-center">
                                  <div className="product__coupon-content">
                                    <h3
                                      className="product__coupon-title text-center"
                                      style={{
                                        fontFamily: "Space Grotesk",
                                        letterSpacing: "1px",
                                      }}
                                    >
                                      {coup.title}
                                    </h3>
                                    <p
                                      className="product__coupon-offer mb-15 text-center"
                                      style={{
                                        fontFamily: "Space Grotesk",
                                        letterSpacing: "1px",
                                      }}
                                    >
                                      <span>{coup.offer}%</span> OFF
                                    </p>
                                    <div
                                      className="product__coupon-countdown"
                                      data-countdown=""
                                    >
                                      <div className="product__coupon-countdown-inner">
                                        <ul>
                                          <li>
                                            <span data-days="">
                                              {
                                                calculateRemainingTime(
                                                  coup.expirationdate
                                                ).days
                                              }
                                            </span>{" "}
                                            Day
                                          </li>
                                          <li>
                                            <span data-hours="">
                                              {
                                                calculateRemainingTime(
                                                  coup.expirationdate
                                                ).hours
                                              }
                                            </span>{" "}
                                            Hrs
                                          </li>
                                          <li>
                                            <span data-minutes="">
                                              {
                                                calculateRemainingTime(
                                                  coup.expirationdate
                                                ).minutes
                                              }
                                            </span>{" "}
                                            Min
                                          </li>
                                          <li>
                                            <span data-seconds="">
                                              {
                                                calculateRemainingTime(
                                                  coup.expirationdate
                                                ).seconds
                                              }
                                            </span>{" "}
                                            Sec
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="product__coupon-item-right pl-20 text-center">
                                  <div className="product__coupon-status mb-10 d-flex align-items-center">
                                    <p className="text-lead">
                                      Coupon{" "}
                                      <span className="active">
                                        {new Date(coup.expirationdate) >
                                        new Date()
                                          ? "Active"
                                          : "Inactive"}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="text-center">
                                    <button
                                      className="delete_btn"
                                      onClick={() => deletepanalama(coup._id)}
                                    >
                                      delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {newproduct && <NewPro />}
    </>
  );
}

export default Admin;
