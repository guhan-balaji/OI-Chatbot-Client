import React from "react";
import { renderCustomComponent, toggleMsgLoader } from "react-chat-widget";

import { useDispatch } from "react-redux";
import { fetchFromDialogflow } from "../redux";

import ViewLogic from "./ViewLogic";

function MenuCard(props) {
  const dispatch = useDispatch();

  return (
    <div className="card" style={{ width: "14rem" }}>
      <div className="card-header bg-info text-white">{props.title}</div>
      {props.options.map((option) => (
        <button
          className="btn btn-outline-info rounded-0"
          key={props.title + "_" + option + Math.random()}
          value={option}
          onClick={(e) => {
            toggleMsgLoader();
            dispatch(fetchFromDialogflow(e.target.value)).then((data) => {
              toggleMsgLoader();
              renderCustomComponent(() => (
                <ViewLogic intent={data.intent} value={data.value} />
              ));
            });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default MenuCard;