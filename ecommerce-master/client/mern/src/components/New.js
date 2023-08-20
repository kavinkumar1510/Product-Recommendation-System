import React from "react";
import { useRecoilValue } from "recoil";
import { FoodItem} from "../store";

function New() {
  const food = useRecoilValue(FoodItem);

  return (
    <>
      {food.map((item) => (
        <div key={item.id}>
          <h3>{item.foodname}</h3>
        </div>
      ))}
    </>
  );
}

export default New;
