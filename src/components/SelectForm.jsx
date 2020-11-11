import React from "react";

import { Form, Spinner, Col } from "react-bootstrap";

import { useDispatch, connect } from "react-redux";

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

const SelectForm = (props) => {
  const dispatch = useDispatch();
  const {
    app,
    process,
    processArray,
    processArrayLoading,
    processDefnLoading,
    templateAvailable,
  } = props;

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
            <option value="Choose..." disabled>
              Choose...
            </option>
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
            <option value="Choose..." disabled>
              Choose...
            </option>
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
              dispatch(selectApp(e.target.value));
              dispatch(selectProcess(""));
              dispatch(fetchProcessArray(e.target.value));
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
              dispatch(selectProcess(e.target.value));
              dispatch(getTemplate(e.target.value))
              dispatch(fetchProcessDefn(e.target.value));
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

const mapStateToProps = (state) => {
  return {
    app: state.selectApp.app,
    process: state.selectProcess.process,
    processArray: state.processArray.response,
    processArrayLoading: state.processArray.loading,
    processDefnLoading: state.processDefn.loading,
    templateAvailable: state.getTemplate.response[0],
  };
};

export default connect(mapStateToProps)(SelectForm);
