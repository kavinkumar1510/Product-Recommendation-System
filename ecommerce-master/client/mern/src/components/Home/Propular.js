import BestSelling from "./Tabs/BestSelling";
import LatestProduct from "./Tabs/LatestProduct";
import TopRated from "./Tabs/TopRated";
import "./home.css";
import { useState } from 'react'
function Popular() {
  const[tabs,setTabs]=useState(1);
  const handletabs =(id)=>{
    setTabs(id);
  }
  return (
    <>
      <div
        className="container"
        style={{
          marginTop: "80px",
        }}
      >
        <div className="pop_container">
          <div className="pop_row">
            <div className="pop_col">
              <span
                class="popular_title"
                style={{
                  fontSize: "15px",
                }}
              >
                Popular Products
              </span>
            </div>{" "}
            <div className="pop_col container">
              <div className="tabs">
                <span
                  style={{
                    width: "100%",
                    textAlign: "end",
                    marginRight: "15px",
                  }}
                  className={tabs === 1 ? "show-content active-tab" : ""}
                onClick={()=>handletabs(1)}>
                  Top Rated
                </span>
                <span
                  style={{
                    width: "100%",
                    textAlign: "end",
                    marginRight: "15px",
                  }}
                  className={tabs === 2 ? "show-content active-tab" : ""}
                  onClick={()=>handletabs(2)}>
                  Best Selling
                </span>
                <span style={{ width: "100%", textAlign: "end" }}
                className={tabs === 3 ? "show-content active-tab" : ""}
                onClick={()=>handletabs(3)}>
                  Latest Product
                </span>
              </div>
            
            </div>
          </div>
        </div>
        <div className={tabs === 1 ? "" : "content"} style={{marginTop:"50px"}}>
        <TopRated />
              </div>
              <div className={tabs === 2 ? "" : "content"} style={{marginTop:"50px"}}>
               <BestSelling />
              </div>
              <div className={tabs === 3 ? "" : "content"} style={{marginTop:"50px"}}>
              <LatestProduct />
              </div>
      </div>
    </>
  );
}

export default Popular;
