import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-date-picker"; //modify css of datepicker to remove border.

import { useDispatch } from "react-redux";
import { dateForm } from "../redux";

function DateForm() {
  const dispatch = useDispatch();

  const [value1, onChange1] = useState(() => {
    let today = new Date();
    let date = new Date(today);
    date.setDate(today.getDate() - 90);
    return date;
  });
  const [value2, onChange2] = useState(() => {
    let today = new Date();
    let date = new Date(today);
    date.setDate(today.getDate());
    return date;
  });

  return (
    <Form
      className="bg-white p-1 rounded"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(
          dateForm({
            startDate: value1.toLocaleDateString("en-GB"),
            endDate: value2.toLocaleDateString("en-GB"),
          })
        );
      }}
    >
      <Form.Text as="h4">Enter Dates:</Form.Text>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <span>
            <DatePicker
              onChange={onChange1}
              value={value1}
              format="dd-MM-y"
              maxDate={new Date()}
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
            />
          </span>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <span>
            <DatePicker
              onChange={onChange2}
              value={value2}
              format="dd-MM-y"
              maxDate={new Date()}
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
            />
          </span>
        </Form.Group>
      </Form.Row>
      <Button variant="outline-secondary" type="submit" block>
        submit
      </Button>
    </Form>
  );
}

export default DateForm;
