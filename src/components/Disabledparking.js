import React from "react";
import { useCallback, useEffect, useState } from "react";
import "./Disabledparking.css";
export const Disabledparking = () => {
  const [apiData, setApiData] = useState();
  const [apiData1, setApiData1] = useState();
  const [disabledparking, setDisabledParking] = useState(null);
  const [carNumber, setCarNumber] = useState();
  const [carValidity, setCarValidity] = useState("");
  const callData = async () => {
    try {
      const response = await fetch(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&limit=200000"
      );
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      console.log(data.result.records);
      setApiData(data.result.records);
    } catch (err) {}
    try {
      const response = await fetch(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&limit=700000&offset=200000"
      );
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      console.log(data.result.records);
      setApiData1(data.result.records);
    } catch (err) {}
  };

  useEffect(() => {
    callData();
  }, []);

  const cheackParkingHandler = () => {
    const AllData = apiData.concat(apiData1);
    if (!carNumber) {
      setDisabledParking(null);
      return;
    }
    const SingleItemId = AllData.find(
      (item) => item["MISPAR RECHEV"].toString() === carNumber.toString() //91810001
    );
    if (SingleItemId) {
      setDisabledParking(SingleItemId);
    } else {
      setDisabledParking(false);
      return
    }
    const a = SingleItemId["TAARICH HAFAKAT TAG"].toString()
    let year = a.slice(0,4);
    let month = a.slice(4,6);
    let day = a.slice(6,8);
    setCarValidity(`${year}/${month}/${day}`)
  };

  return (
    <div className="parkingContainer">
      <h1>בדיקת סטטוס תו חניה לרכב נכה</h1>
      <input
        onChange={(e) => {
          setCarNumber(e.target.value);
        }}
      ></input>{" "}
      <br></br>
      <button onClick={cheackParkingHandler}>בדיקת תו חניית נכה</button>
      {disabledparking && (
        <div>
        <h3 className="haveParkingCard">לרכב זה יש תג חניית נכים</h3>
        <h4>תאריך הפקת התג: {carValidity}</h4>
        </div>
      )}
      {disabledparking == false && (
        <h3 className="noHaveParkingCard">לרכב זה אין תג חניית נכים</h3>
      )}
    </div>
  );
};
