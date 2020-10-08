import React, { useEffect } from "react";
import {
  Widget,
  addResponseMessage,
  renderCustomComponent,
  toggleMsgLoader,
} from "react-chat-widget";

import MenuCard from "./MenuCard";
import DateForm from "./DateForm";

import getQuery from "../functions";
import menu, { forms } from "../arrayrefs";

import "react-chat-widget/lib/styles.css";

function Chatbot() {
  useEffect(() => {
    const defaultMenu = menu.find(({ id }) => id === "SelectApp");
    addResponseMessage("Welcome to AUDIRE.");
    renderCustomComponent(() => (
      <MenuCard title={defaultMenu.title} options={defaultMenu.options} />
      // <DateForm />
    ));
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    toggleMsgLoader();
    const response = await getQuery(newMessage);
    toggleMsgLoader();
    if (response.intent) {
      if (menu.some((el) => el.title === response.value)) {
        const data = menu.find((el) => el.title === response.value);
        renderCustomComponent(() => (
          <MenuCard title={data.title} options={data.options} />
        ));
      } else if (forms.includes(response.value)) {
        renderCustomComponent(() => <DateForm />);
      } else {
        addResponseMessage(response.value);
      }
    } else {
      addResponseMessage(response.value);
    }
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
