import React, { useState } from "react";

import fileDownload from "js-file-download";

import { Card } from "react-bootstrap";

import { useDispatch } from "react-redux";

import { downloadTemplate } from "../redux";
import store from "../redux/store";

const Template = () => {
  const dispach = useDispatch();
  const [state] = useState(store.getState());

  return (
    <Card
      className="mt-2 mb-2 text-center border-info rounded"
      style={{ width: "14rem" }}
    >
      <Card.Header className="text-light bg-info" as="h4">
        Template
      </Card.Header>
      <Card.Body>
        <h6 className="text-info">{state.getTemplate.response}</h6>
        <i
          className="fas fa-download fa-template-card btn fa-lg"
          onClick={() =>
            dispach(downloadTemplate(state.fileData)).then((blob) =>
              fileDownload(blob, state.getTemplate.response)
            )
          }
        ></i>
      </Card.Body>
    </Card>
  );
};

export default Template;
