import React from "react";
import { connect } from "react-redux";

// import DateForm from "./DateForm";
import SelectForm from "./SelectForm";
import ButtonGroup from "./ButtonGroup";
// import MenuCard from "./MenuCard";

import menu, { forms } from "../arrayrefs";

function ViewLogic(props) {
  return props.intent && menu.some((el) => el.title === props.value) ? (
    <div>
      <ButtonGroup
        title={menu.find((el) => el.title === props.value).title}
        options={menu.find((el) => el.title === props.value).options}
      />
    </div>
  ) : props.value && props.intent && forms.includes(props.value) ? (
    <div>
      {/* <DateForm /> */}
      {props.visible && <SelectForm />}
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

const mapStateToProps = (state) => {
  return { visible: state.showSelectForm.visible };
};

export default connect(mapStateToProps)(ViewLogic);
