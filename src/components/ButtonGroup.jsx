import React from "react";
import { renderCustomComponent, toggleMsgLoader } from "react-chat-widget";

import { useDispatch } from "react-redux";
import { fetchFromDialogflow } from "../redux";

import ViewLogic from "./ViewLogic";

function ButtonGroup(props) {
  const dispatch = useDispatch();

  return (
    <div>
      <h4 className="text-info">{props.title}</h4>
      {props.options.map((option) => (
        <button
          className="btn btn-outline-info m-1"
          style={{ borderRadius: "15px" }}
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

export default ButtonGroup;
