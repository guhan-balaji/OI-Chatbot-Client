import React, { useState } from "react";
import axios from "axios";
import dateFormat from "dateformat";

import { Form, Table, Button, Spinner } from "react-bootstrap";

import { useDispatch } from "react-redux";

import { fileData, getTemplate, selectProcess, selectApp } from "../redux";
import store from "../redux/store";

import "../App.css";

const MapTable = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [state] = useState(store.getState());
  const [mapTableRows, setMapTableRows] = useState(() => {
    const arr = [];
    state.processDefn.response.forEach((o) => {
      state.csvUpload.response.data.forEach((element) => {
        if (element.process === o.process) {
          arr.push(o);
        }
      });
    });
    const man = arr.filter((ob) => ob.mandatory === 1);
    const nonMan = arr.filter((ob) => ob.mandatory !== 1);
    return [...man, ...nonMan];
  });
  const [processOptions] = useState(mapTableRows);
  const [selectValue, setSelectValue] = useState(() => {
    const obj = {};
    mapTableRows.forEach((element) => {
      obj[element.short_text] = element.process;
    });
    return obj;
  });

  const [unMapped, setUnMapped] = useState([]);

  return (
    <div className="text-center">
      <Table className="border-info mt-2 mb-2" responsive bordered>
        <thead className="text-white bg-info">
          <tr>
            <th>Process Defn</th>
            <th>CSV Headers</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="text-info">
          {mapTableRows.map((el) => (
            <tr key={el.key}>
              <td>{el.short_text}</td>
              <td>
                <Form.Control
                  id={el.short_text}
                  className="text-info border-info"
                  as="select"
                  value={selectValue[el.short_text]}
                  onChange={(e) => {
                    if (
                      !unMapped.includes(e.target.value) ||
                      e.target.value === ""
                    ) {
                      if (selectValue[e.target.id] !== "") {
                        setUnMapped([...unMapped, selectValue[e.target.id]]);
                      }
                      setSelectValue({ ...selectValue, [e.target.id]: "" });
                    } else {
                      if (selectValue[e.target.id] !== "") {
                        const um = unMapped.filter(
                          (val) => val !== e.target.value
                        );
                        setUnMapped([...um, selectValue[e.target.id]]);
                        setSelectValue({
                          ...selectValue,
                          [e.target.id]: e.target.value,
                        });
                      } else {
                        setUnMapped(
                          unMapped.filter((val) => val !== e.target.value)
                        );
                        setSelectValue({
                          ...selectValue,
                          [e.target.id]: e.target.value,
                        });
                      }
                    }
                  }}
                >
                  <option value=""></option>
                  {processOptions.map((option) => (
                    <option key={option.key + "00"} value={option.process}>
                      {option.short_text}
                    </option>
                  ))}
                </Form.Control>
              </td>
              <td>
                {!el.mandatory && (
                  <i
                    className="fas fa-trash fa-trash-table btn"
                    onClick={() => {
                      const rows = mapTableRows.filter(
                        (row) => row.key !== el.key
                      );
                      const id = mapTableRows.find((row) => row.key === el.key)
                        .short_text;
                      setMapTableRows(rows);
                      if (selectValue[id] !== "") {
                        setUnMapped([...unMapped, selectValue[id]]);
                      }
                    }}
                  ></i>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        variant="outline-info"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          const mappedData = [];
          const arr = mapTableRows.map((el) => el.short_text);
          arr.forEach((el) => {
            const val = state.processDefn.response.find(
              (obj) => obj.short_text === el
            );
            mappedData.push([[val.process, selectValue[el]]]);
          });
          console.log(mappedData);
          const token =
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjU5YzRiMTc0ZTExMzBiYjViMjA5ZWEiLCJ1c2VybmFtZSI6IkhhcmlzaCIsInRlbmFudF9pZCI6IkFCMDAwMDEiLCJlbWFpbCI6ImhhcmlwcmFrYXNoLmJhYnVAb25laW50ZWdyYWwuY29tIiwib3JnYW5pemF0aW9uIjoiQUdTIEdyb3VwIiwiaWF0IjoxNjAzMjYwOTQ5LCJleHAiOjE2MDMzMDQxNDl9.vOklf3lT_gie_UN_RiEh35X-bQm_UtAUDkEde-qrOkg";
          console.log(dateFormat(new Date(), "isoDateTime"));
          axios({
            method: "POST",
            url: "https://audiresb.oneintegral.com/backend/api/lease/mappedcsv",
            headers: {
              "Content-Type": "application/json; charset-utf-8",
              Authorization: token,
            },
            data: {
              config: mappedData,
              created_at: dateFormat(new Date(), "isoDateTime"),
              tenantId: "AB00001",
              org: "Ags Group",
              uploadedFileName: state.csvUpload.response.fileName,
              originalFileName: state.fileData.fileName,
              user: "Harish",
              process: [state.selectProcess.process],
              processName: state.selectProcess.process,
              system: "Audire",
              fileName: state.csvUpload.response.fileName,
            },
          }).then((response) => {
            console.log(response.data);
            setLoading(true);
            dispatch(getTemplate(""));
            setTimeout(() => {
              dispatch(
                fileData({
                  file: null,
                  fileName: "",
                  fileSize: "0.00 B",
                })
              );
              dispatch(selectProcess(""));
              dispatch(selectApp(""));
              setLoading(false);
            }, 1200);
          });
        }}
      >
        save
      </Button>
      {loading && (
        <Spinner animation="border" size="sm" variant="info" className="ml-2" />
      )}
    </div>
  );
};

export default MapTable;
