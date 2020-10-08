import React, { useState } from "react";
import {
  renderCustomComponent,
  addResponseMessage,
  toggleMsgLoader,
} from "react-chat-widget";

import menu, { forms } from "../arrayrefs";
import getQuery from "../functions";
import DateForm from "./DateForm";

function MenuCard(props) {
  const [isTriggered, setIsTriggered] = useState(false);
  const handleClick = async (e) => {
    if (!isTriggered) {
      toggleMsgLoader();
      const response = await getQuery(e.target.value);
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

      setIsTriggered(true);
    }
  };

  return (
    <div className="card" style={{ width: "14rem" }}>
      <div className="card-header bg-info text-white">{props.title}</div>
      {props.options.map((option) => (
        <button
          className="btn btn-outline-info rounded-0"
          key={props.id + "_" + option}
          value={option}
          onClick={handleClick}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default MenuCard;
