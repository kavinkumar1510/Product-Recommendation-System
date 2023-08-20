import "./navbar.css";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { end } from "@popperjs/core";
export default function AppBar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const pagemaranum = (value) => {
   
 
    if (value === "home") {
      navigate("/");
      handleClose();
      return;
    }
    if(value === "shop"){
      navigate("/shop");
      handleClose();
      return;
    }
   
    if (value === "logout") {
      localStorage.clear();
      toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
        loading: "Logging out ...",
        success: <b>Logout successfully</b>,
        error: <b>Something went wrong</b>,
      });
      navigate("/signup");
      handleClose();
    }
  };
  return (
    <div>
      <Toaster position="top-center" />
      <Offcanvas show={show} placement={end} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center mt-3 off">
            <p onClick={() => pagemaranum("home")}>Home</p>
          </div>
          <hr />
          <div className="text-center mt-3 off">
            <p onClick={() => pagemaranum("post")}>Post</p>
          </div>
          <hr />
          <div className="text-center mt-3 off">
            <p onClick={() => pagemaranum("save")}>Saved</p>
          </div>
          <hr />
          <div className="text-center mt-3 off">
            <button
              className="btn btn-dark w-100 p-2 mt-2 ithuvera"
             
            >
              Sign up
            </button>
          </div>
          <div className="text-center mt-3  off">
            <button
              className="btn btn-danger  p-2 w-100 ithuvera w-100"
              onClick={() => pagemaranum("logout")}
            >
              Logout
            </button>
          </div>

          <hr />
        </Offcanvas.Body>
      </Offcanvas>
      <nav>
        <h2>
          <img src="/image/logo.png" alt="Logo" width="100px" />
        </h2>
        <div className="d-flex">
          <ul className="hello">
            <li onClick={() => pagemaranum("home")}>Home</li>
            <li onClick={() => pagemaranum("post")}>About us</li>
            <li onClick={() => pagemaranum("shop")}>Shop</li>
            <li class="has-dropdown">
              <a href="/about">Pages <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
  <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
</svg></a>
              <ul class="submenu">
                <li>
                  <a href="/faq">FAQs</a>
                </li>
                <li>
                  <a href="/policy">Privacy &amp; Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/register">Register</a>
                </li>
                <li>
                  <a href="/forgot">Forgot Password</a>
                </li>
                <li>
                  <a href="/cart">My Cart</a>
                </li>
                <li>
                  <a href="/wishlist">My Wishlist</a>
                </li>
                <li>
                  <a href="/checkout">Checkout</a>
                </li>
                <li>
                  <a href="/404">Error 404</a>
                </li>
              </ul>
            </li>
            <li onClick={() => pagemaranum("save")}>Contact us</li>
          </ul>
          <ul className="icon">
            <li onClick={()=>{
              navigate('/signin')
            }}>
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0001 19V17C17.0001 15.9391 16.5787 14.9217 15.8285 14.1716C15.0784 13.4214 14.061 13 13.0001 13H5.00012C3.93926 13 2.92184 13.4214 2.17169 14.1716C1.42155 14.9217 1.00012 15.9391 1.00012 17V19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M9.00012 9C11.2093 9 13.0001 7.20914 13.0001 5C13.0001 2.79086 11.2093 1 9.00012 1C6.79098 1 5.00012 2.79086 5.00012 5C5.00012 7.20914 6.79098 9 9.00012 9Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </li>
            <li>
              <svg
                width="23"
                height="20"
                viewBox="0 0 23 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0461 2.59133C19.5419 2.08683 18.9431 1.68663 18.2842 1.41358C17.6252 1.14054 16.9189 1 16.2056 1C15.4923 1 14.786 1.14054 14.127 1.41358C13.468 1.68663 12.8693 2.08683 12.365 2.59133L11.3185 3.63785L10.272 2.59133C9.25342 1.57276 7.87194 1.00053 6.43146 1.00053C4.99098 1.00053 3.6095 1.57276 2.59092 2.59133C1.57235 3.6099 1.00012 4.99139 1.00012 6.43187C1.00012 7.87235 1.57235 9.25383 2.59092 10.2724L3.63745 11.3189L11.3185 19L18.9996 11.3189L20.0461 10.2724C20.5506 9.76814 20.9508 9.16942 21.2239 8.51045C21.4969 7.85148 21.6374 7.14517 21.6374 6.43187C21.6374 5.71857 21.4969 5.01225 21.2239 4.35328C20.9508 3.69431 20.5506 3.09559 20.0461 2.59133V2.59133Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span class="tp">0</span>
            </li>
            <li>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.85739 19C8.33077 19 8.71453 18.6163 8.71453 18.1429C8.71453 17.6695 8.33077 17.2857 7.85739 17.2857C7.384 17.2857 7.00024 17.6695 7.00024 18.1429C7.00024 18.6163 7.384 19 7.85739 19Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M17.286 19C17.7594 19 18.1431 18.6163 18.1431 18.1429C18.1431 17.6695 17.7594 17.2857 17.286 17.2857C16.8126 17.2857 16.4288 17.6695 16.4288 18.1429C16.4288 18.6163 16.8126 19 17.286 19Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M1.00012 1H4.42869L6.72584 12.4771C6.80422 12.8718 7.0189 13.2263 7.3323 13.4785C7.64571 13.7308 8.03786 13.8649 8.44012 13.8571H16.7716C17.1738 13.8649 17.566 13.7308 17.8794 13.4785C18.1928 13.2263 18.4075 12.8718 18.4858 12.4771L19.8573 5.28571H5.28584"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span class="tp">0</span>
            </li>
          </ul>
        </div>
        <div id="mobile" onClick={handleShow}>
          <i id="bar" className="fas fa-bars"></i>
        </div>
      </nav>
    </div>
  );
}
