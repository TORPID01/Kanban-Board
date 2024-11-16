import React, { useState, useEffect } from "react";
import { useCardContext } from "../../StoreContext/Contex";
import {CardDisplay} from "../CardDisplay/CardDisplay";
import "./Grouping.css";
// const {CardDisplay}=Cardfunctions;
function Grouping() {
  const { category, users ,sortBy} = useCardContext();

  const [arr, setArr] = useState([]); 
  useEffect(() => {
    let updatedArr = [];
    if (category === "Priority") {
      updatedArr = ["URGENT", "HIGH", "MEDIUM", "LOW", "NOP"];
    } else if (category === "Status") {
      updatedArr = ["Todo", "In progress", "Backlog","Done","Canceled"];
    }
    if (category === "Users" && Array.isArray(users)) {
      updatedArr = users.map((item) => ({ id: item.id, name: item.name }));
    } else if (category === "Users") {
      updatedArr = []; 
    }
    setArr(updatedArr); 
  }, [category, users,sortBy]); 

  //console.log(arr);


  return (
    <>
      <div className="grouping-container">
        {arr.map((item, index) => (
          <div key={index} className="group-item">
            <div className="group-heading">
              {category === "Users" ? (
                <h4>{item.name}</h4>
              ) : (
                <h4>
                  {typeof item === "object" ? JSON.stringify(item) : item}
                </h4>
              )}
            </div>

            <ul className="group-list">
              <CardDisplay
                category={category}
                status={item}
                user={item.id}
                priority={arr.length - index - 1}
              />
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default Grouping;
