import React, { useState } from "react";
import DatePicker from "react-date-picker";

function DateForm() {
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
    <form className="bg-light p-1 rounded card">
      <h4 className="text-secondary">Enter Dates:</h4>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="startDate">Start Date</label>
          <span id="startDate">
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
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="endDate">End Date</label>
          <span id="endDate">
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
        </div>
      </div>
    </form>
  );
}
export default DateForm;
