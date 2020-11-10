import React, { useState, useRef } from "react";
import { toggleMsgLoader } from "react-chat-widget";

import { Card } from "react-bootstrap";

import { useDispatch } from "react-redux";

import store from "../redux/store";
import { fileData, csvUpload } from "../redux";

import MapTable from "./MapTable";

import "../App.css";

const CsvFileUploadCard = () => {
  const dispatch = useDispatch();
  const csvInput = useRef();
  const [state] = useState(store.getState());
  const [app] = useState(state.selectApp.app);
  const [process] = useState(state.selectProcess.process);
  const [loading, setLoading] = useState(true);
  const [fileDataLocal, setFileDataLocal] = useState({
    file: null,
    fileName: "",
    fileSize: "0.00 B",
  });

  const deleteFile = () => {
    csvInput.current.value = null;
    setFileDataLocal({
      file: null,
      fileName: "",
      fileSize: "0.00 B",
    });
    setLoading(true);
    dispatch(fileData(fileDataLocal));
  };

  const handleChange = (e) => {
    toggleMsgLoader();
    const size = e.target.files[0].size;
    let file_size = "0.00 B";
    if (size < 1024) file_size = size + " B";
    else if (size < 1048576) file_size = (size / 1024).toFixed(1) + " KB";
    else if (size < 1073741824) file_size = (size / 1048576).toFixed(1) + " MB";
    else file_size = (size / 1073741824).toFixed(3) + " GB";

    setFileDataLocal({
      ...fileDataLocal,
      file: e.target.files[0],
      fileName: e.target.files[0].name,
      fileSize: file_size,
    });
    dispatch(
      fileData({
        ...fileDataLocal,
        file: e.target.files[0],
        fileName: e.target.files[0].name,
        fileSize: file_size,
      })
    );
    dispatch(
      csvUpload({
        ...fileDataLocal,
        file: e.target.files[0],
        fileName: e.target.files[0].name,
        fileSize: file_size,
        processName: state.selectProcess.process,
      })
    ).then(() => {
      toggleMsgLoader();
      setLoading(false);
    });
  };

  return (
    <div>
      <Card
        bg={"info"}
        className="mt-4"
        style={{ width: "14rem", borderRadius: "1rem" }}
      >
        <Card.Header
          as="h4"
          style={{
            borderRadius: "1rem 1rem 0 0",
            display: "inline",
            color: "white",
          }}
        >
          {fileDataLocal.fileSize}
          <i
            className="fas fa-file-upload fa-lg fa-csv-card btn"
            onClick={() => csvInput.current.click()}
          ></i>
          <input
            ref={csvInput}
            type="file"
            accept="csv"
            onChange={handleChange}
            style={{ display: "none" }}
          ></input>
        </Card.Header>
        <Card.Body>
          {fileDataLocal.fileName ? (
            <Card.Text style={{ display: "inline", color: "white" }}>
              {fileDataLocal.fileName}
              <i
                className="fas fa-trash fa-csv-card btn"
                onClick={() => deleteFile()}
              ></i>
            </Card.Text>
          ) : (
            <Card.Text></Card.Text>
          )}
        </Card.Body>
      </Card>
      {app && process && !loading && <MapTable />}
    </div>
  );
};

export default CsvFileUploadCard;
