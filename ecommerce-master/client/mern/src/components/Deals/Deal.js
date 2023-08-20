import { useState, useEffect } from "react";
import "./Deal.css";
import { Coupon } from "./Coupon"; // Assuming this contains your static coupons
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

function DealOfDay() {
  const [couponCodes, setCouponCodes] = useState([]);

  useEffect(() => {
    const fetchcoupon = async () => {
      try {
        const response = await axios.get("http://localhost:3002/coupon");
        const fetchedCoupons = response.data.map((coupon) => {
          return {
            ...coupon,
            copied: false,
          };
        });
        setCouponCodes([...Coupon, ...fetchedCoupons]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchcoupon();
  }, []);

  function calculateRemainingTime(expirationDate) {
    const now = new Date(); // Current time
    const expirationTime = new Date(expirationDate); // Expiration time
    const timeDifference = expirationTime - now; // Difference in milliseconds

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
   
    return { days, hours, minutes, seconds };
  }

  const handleCopyCoupon = (value) => {
    navigator.clipboard
      .writeText(value)
      toast.success("Code copied!");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTimeForCoupons();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
      <div
        className="container"
        style={{
          marginTop: "80px",
        }}
      >
        <div>
          <span
            className="popular_title"
            style={{
              fontSize: "15px",
            }}
          >
            Deal Of The Day
          </span>
        </div>
        <div>
          <div className="container mt-5">
            <div className="row gy-5 text-center">
              {couponCodes.map((coup) => (
                <div className="col-xl-6" key={coup._id}>
                  <div className="product__coupon-item mb-30 p-relative d-md-flex justify-content-between align-items-center">
                    <span className="product__coupon-border"></span>
                    <div className="product__coupon-item-left d-sm-flex align-items-center">
                      <div className="product__coupon-content">
                        <h3 className="product__coupon-title text-center" style={{
                          fontFamily:"Space Grotesk",
                          letterSpacing:"1px"
                        }}>
                          {coup.title}
                        </h3>
                        <p className="product__coupon-offer mb-15 text-center" style={{
                          fontFamily:"Space Grotesk",
                          letterSpacing:"1px"
                        }}>
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
                            {calculateRemainingTime(coup.expirationdate).days}
                          </span>{" "}
                          Day
                        </li>
                        <li>
                          <span data-hours="">
                            {calculateRemainingTime(coup.expirationdate).hours}
                          </span>{" "}
                          Hrs
                        </li>
                        <li>
                          <span data-minutes="">
                            {calculateRemainingTime(coup.expirationdate).minutes}
                          </span>{" "}
                          Min
                        </li>
                        <li>
                          <span data-seconds="">
                            {calculateRemainingTime(coup.expirationdate).seconds}
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
                          <span className="active">{new Date(coup.expirationdate) > new Date() ? "Active" : "Inactive"}</span>
                        </p>
                      </div>
                      <div className="product__coupon-date text-center">
                        <button onClick={() => handleCopyCoupon(coup.code)} disabled={new Date(coup.expirationdate) < new Date()}>
                          <span>{coup.copied ?  "Copied" : coup.code}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DealOfDay;
