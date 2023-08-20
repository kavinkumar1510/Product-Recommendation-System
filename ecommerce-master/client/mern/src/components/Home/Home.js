import DealOfDay from "../Deals/Deal";
import Add from "./Add";
import Popular from "./Propular";
import Subscribe from "./Subscribe";
import { useNavigate } from "react-router-dom";
import "./home.css";
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div class="home">
        <div className="container">
          <div
            class="row align-self-end"
            style={{
              marginTop: "130px",
            }}
          >
            <div class="col-xl-6 col-lg-6">
              <div class="slider__content-13">
                <span
                  class="slider__title-pre-13"
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Best Ear <br />
                  Headphones
                </span>
                <h3 class="slider__title-13 mt-3 display-3">
                  Music To <br /> Fill Your Heart
                </h3>
                <div class="slider__btn-13 mt-5">
                  <button onClick={()=>navigate("/shop")}>
                    <p>Show Now</p>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 d-flex align-items-center">
              <div class="slider__thumb-13 text-end mr-40">
                <div>
                  <img
                    alt="slider img"
                    src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fslider-1.b3c73448.png&w=640&q=75"
                    width="460"
                    height="525"
                    style={{ zIndex: "1",position:"relative"}}
                  />
                </div>
                <div>
                  <span class="slider__thumb-13-circle-1"></span>
                  <span class="slider__thumb-13-circle-2"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popular />
      <DealOfDay />
      <div style={{
        marginTop:"100px"
      }}></div>
      <Add />
      <Subscribe />
    </>
  );
}

export default Home;
