import React, { useState } from "react";

import { Form, Spinner, Col } from "react-bootstrap";

import { useDispatch } from "react-redux";
import store from "../redux/store";

import {
  selectApp,
  selectProcess,
  fetchProcessArray,
  fetchProcessDefn,
  getTemplate,
} from "../redux";

import menu from "../arrayrefs";

import CsvFileUploadCard from "./CsvFileUploadCard";
import Template from "./Template";

const SelectForm = () => {
  const dispatch = useDispatch();
  const [state] = useState(store.getState());
  const [app, setApp] = useState(state.selectApp.app);
  const [process, setProcess] = useState(state.selectProcess.process);
  const [processArray, setProcessArray] = useState(state.processArray.response);
  const [processArrayLoading, setProcessArrayLoading] = useState(false);
  const [processDefnLoading, setProcssDefnLoading] = useState(true);
  const [templateAvailable, setTemplateAvailable] = useState(false);

  return (
    <Form className="mt-3">
      <Form.Row>
        <Form.Group
          as={Col}
          md="6"
          className="text-info border-info"
          controlId="selectCompany"
        >
          <Form.Label>Company</Form.Label>
          <Form.Control
            className="text-info border-info"
            as="select"
            defaultValue={"Choose..."}
            name="company"
          >
            <option value="Choose..." disabled>Choose...</option>
          </Form.Control>
        </Form.Group>
        <Form.Group
          as={Col}
          md="6"
          className="text-info border-info"
          controlId="selectBranch"
        >
          <Form.Label>Branch</Form.Label>
          <Form.Control
            className="text-info border-info"
            as="select"
            defaultValue={"Choose..."}
            name="branch"
          >
            <option value="Choose..." disabled>Choose...</option>
          </Form.Control>
        </Form.Group>
        <Form.Group
          as={Col}
          md="6"
          className="text-info border-info"
          controlId="selectApp"
        >
          <Form.Label>App</Form.Label>
          <Form.Control
            className="text-info border-info"
            as="select"
            value={app ? app : "Choose an App"}
            name="app"
            onChange={(e) => {
              setProcssDefnLoading(true);
              setProcessArrayLoading(true);
              dispatch(selectApp(e.target.value));
              setApp(e.target.value);
              dispatch(fetchProcessDefn([]));
              dispatch(fetchProcessArray(e.target.value)).then((arr) => {
                setProcessArrayLoading(false);
                setProcessArray(arr);
              });
            }}
          >
            <option disabled>Choose an App</option>
            {menu[0].options.map((option) => (
              <option key={option + Math.random()} value={option}>
                {option}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group
          as={Col}
          md="6"
          className="text-info border-info"
          controlId="selectProcess"
        >
          <Form.Label>Process</Form.Label>
          {processArrayLoading && (
            <Spinner
              animation="border"
              size="sm"
              variant="info"
              className="ml-2"
            />
          )}
          <Form.Control
            className="text-info border-info"
            as="select"
            value={process ? process : "Choose a Process"}
            name="process"
            onChange={(e) => {
              setProcssDefnLoading(true);
              setProcess(e.target.value);
              dispatch(selectProcess(e.target.value));
              dispatch(getTemplate(e.target.value)).then((data) =>
                data[0]
                  ? setTemplateAvailable(true)
                  : setTemplateAvailable(false)
              );
              dispatch(fetchProcessDefn(e.target.value)).then((data) =>
                setProcssDefnLoading(false)
              );
            }}
          >
            <option disabled>Choose a Process</option>
            {processArray.map((el) => (
              <option key={el.short_text + Math.random()} value={el.process}>
                {" "}
                {el.short_text}{" "}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      {templateAvailable && <Template />}
      {app && process && !processDefnLoading && <CsvFileUploadCard />}
    </Form>
  );
};

export default SelectForm;
