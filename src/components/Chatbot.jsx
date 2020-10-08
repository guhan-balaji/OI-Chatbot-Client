import React, { useEffect } from "react";
import {
  Widget,
  addResponseMessage,
  renderCustomComponent,
  toggleMsgLoader,
} from "react-chat-widget";

import { useDispatch } from "react-redux";
import { fetchFromDialogflow } from "../redux";

import MenuCard from "./MenuCard";
import ViewLogic from "./ViewLogic";

import menu from "../arrayrefs";

import "react-chat-widget/lib/styles.css";

function Chatbot() {
  useEffect(() => {
    const defaultMenu = menu.find(({ id }) => id === "SelectApp");
    addResponseMessage("Welcome to AUDIRE.");
    renderCustomComponent(() => (
      <MenuCard title={defaultMenu.title} options={defaultMenu.options} />
    ));
  }, []);

  const dispatch = useDispatch();

  const handleNewUserMessage = async (newMessage) => {
    toggleMsgLoader();
    dispatch(fetchFromDialogflow(newMessage)).then((data) => {
      toggleMsgLoader();
      renderCustomComponent(() => (
        <ViewLogic intent={data.intent} value={data.value} />
      ));
    });
  };

  return (
    <div className="Chatbot">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="AUDIRE"
        subtitle="Smart Finance"
      />
    </div>
  );
}

export default Chatbot;