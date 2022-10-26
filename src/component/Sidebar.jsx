import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./css/Sidebar.css";
import Loading from "./Loading";

const Sidebar = ({ title }) => {
  const [isOpen, setIsopen] = useState(false);
  const [logs, setlogs] = useState([]);
  const [loading, setloading] = useState(true);

  const url = "http://127.0.0.1:3001/logs";

  useEffect(() => {
    let subscribed = true;

    if (subscribed) {
      setloading(true);
      axios
        .get(url)
        .then((res) => {
          setloading(false);
          setlogs(res.data);
        })
        .catch((e) => {
          setloading(false);
          console.log("no logs found");
        });
    }

    return () => {
      subscribed = false;
    };
  }, [url]);

  return (
    <>
      <div className="container-fluid mt-2">
        <nav className="navbar navbar-expand-lg shadow-md">
          <div className="container-fluid p-2">
            <a className="navbar-brand text-primary mr-0">{title}</a>
            <div className="form-inline ml-auto">
              <div
                className="btn btn-primary"
                onClick={() => {
                  setIsopen((prev) => !prev);
                }}
              >
                <span>Logs</span>
              </div>
            </div>
          </div>
        </nav>
        <div className={`sidebar ${isOpen ? "active" : ""}`}>
          <div className="sd-header">
            <h4 className="mb-0">Logs</h4>
            <div
              className="btn btn-primary"
              onClick={() => {
                setIsopen((prev) => !prev);
              }}
            >
              <span>Close</span>
            </div>
          </div>
          <div className="sd-body">
            <ul>
              {loading ? (
                <Loading />
              ) : (
                logs &&
                logs.map((log, index) => (
                  <li key={index}>
                    <span className="sd-link">
                      {log.location}
                      <br />
                      {log.price}
                      <br />
                      {log.time}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div
          className={`sidebar-overlay ${isOpen ? "active" : ""}`}
          onClick={() => {
            setIsopen((prev) => !prev);
          }}
        ></div>
      </div>
    </>
  );
};

export default Sidebar;
