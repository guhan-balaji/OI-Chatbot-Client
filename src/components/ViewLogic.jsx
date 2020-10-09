import React from "react";

import DateForm from "./DateForm";
import ButtonGroup from "./ButtonGroup";
// import MenuCard from "./MenuCard";

import menu, { forms } from "../arrayrefs";

function ViewLogic(props) {
  return props.intent && menu.some((el) => el.title === props.value) ? (
    <div>
      {/* {renderCustomComponent(()=> */}
      {/* <MenuCard
        title={menu.find((el) => el.title === props.value).title}
        options={menu.find((el) => el.title === props.value).options}
      /> */}
      <ButtonGroup
        title={menu.find((el) => el.title === props.value).title}
        options={menu.find((el) => el.title === props.value).options}
      />
      {/* )} */}
    </div>
  ) : props.value && props.intent && forms.includes(props.value) ? (
    <div>
      {/* {renderCustomComponent(()=> */}
      <DateForm />
      {/* )} */}
    </div>
  ) : props.value && props.intent ? (
    <div
      className="d-inline-flex p-3 bg-light"
      style={{ borderRadius: "10px" }}
    >
      {props.value}
    </div>
  ) : props.value && !props.intent ? (
    <div
      className="d-inline-flex p-3 bg-light"
      style={{ borderRadius: "10px" }}
    >
      {props.value}
    </div>
  ) : (
    <div>{console.log("initial state from chatbot empty")}</div>
  );
}

export default ViewLogic;
