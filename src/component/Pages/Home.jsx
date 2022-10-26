import React from "react";
import Loading from "../Loading";
import { loc, sqrft, bathroom, rooms } from "../../datalist";
import { useState } from "react";
import Button from "../button";
import axios from "axios";
import Dropdown from "../dropdown";

const Home = () => {
  const [location, setlocation] = useState("");
  const [sqft, setsqft] = useState();
  const [bath, setbath] = useState();
  const [bhk, setbhk] = useState();
  const [loading, setloading] = useState(false);
  const [result, setresult] = useState();

  const data = { location, sqft, bath, bhk };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);

    console.log("clicked");

    const url = "http://127.0.0.1:3001/predict";

    axios
      .post(url, data, {
        mode: "no-cors",
      })
      .then((res) => {
        setloading(false);
        setresult(res.data);
      })
      .catch((e) => {
        setloading(false);
        console.log(e);
      });
  };
  return (
    <>
      {loading ? (
        <div className="frm">
          <Loading />
          <div className="btton">
            <Button name="predict" />
          </div>
        </div>
      ) : (
        <form className="frm" onSubmit={handleSubmit}>
          <Dropdown
            value={location}
            onChange={setlocation}
            label="location"
            options={loc}
          />
          <Dropdown
            value={sqft}
            onChange={setsqft}
            label="sqft"
            options={sqrft}
          />
          <Dropdown
            value={bath}
            onChange={setbath}
            label="bathroom"
            options={bathroom}
          />
          <Dropdown value={bhk} onChange={setbhk} label="bhk" options={rooms} />
          <div>
            <Button name="Predict" />
          </div>
          {result && (
            <div className="result">
              <h3>
                Price : <bold>₹</bold>
                {result.price}K
              </h3>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default Home;
