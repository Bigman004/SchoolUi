import React, { useState, useEffect } from "react";
import { listResult } from "../Service/Service";
import "./ResultList.css";
import Nav from "./Nav";
const ResultList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function returnList() {
      const response = await listResult();
      console.log(response.data[0]);
      setList(response.data);
    }
    returnList();
  }, []);

  console.log(list);

  return (
    <>
      <Nav />
      <div className="result-page">
        {list.map((termList, index) => (
          <div className="termtable" key={index}>
            <details open>
              <summary>{termList[index].term}</summary>
              <table>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Math</th>
                    <th>English</th>
                    <th>Basic science</th>
                    <th>Social studies</th>
                    <th>Crk</th>
                    <th>Phe</th>
                  </tr>
                </thead>
                <tbody>
                  {termList.map((result, idx) => (
                    <tr key={idx}>
                      <td data-label="Student ID">{result.studentId}</td>
                      <td data-label="Name">
                        {result.firstName + " " + result.lastName}
                      </td>
                      <td data-label="Math">{result.math}</td>
                      <td data-label="English">{result.english}</td>
                      <td data-label="Basic science">{result.basicScience}</td>
                      <td data-label="Social studies">
                        {result.socialStudies}
                      </td>
                      <td data-label="Crk">{result.crk}</td>
                      <td data-label="Phe">{result.phe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResultList;
