import React from "react";
import { Card, Button } from "react-bootstrap";
import { renderCustomComponent, toggleMsgLoader } from "react-chat-widget";

import { useDispatch } from "react-redux";
import { fetchFromDialogflow } from "../redux";

import ViewLogic from "./ViewLogic";

function MenuCard(props) {
  const dispatch = useDispatch();

  return (
    <Card style={{ width: "14rem" }}>
      <Card.Header className="bg-info text-white">{props.title}</Card.Header>
      {props.options.map((option) => (
        <Button
          variant="outline-info"
          className="rounded-0"
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
        </Button>
      ))}
    </Card>
  );
}

export default MenuCard;
