import React, { useEffect, useState } from "react";
import ReactDOM, { render } from "react-dom";
import { Applicant } from "./applicant";

const Popup = () => {
  const [currentURL, setCurrentURL] = useState<string>();

  const clear = () => {
      console.log("Clearing Local storage");
      chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });

    chrome.storage.sync.get({applicants:[]}, function(data){
      console.log(data.applicants)
    });
  }

  const refresh = () => {
    chrome.runtime.sendMessage({msg: "refresh"});
  }

  const autofill = (applicant:Applicant) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            applicant: applicant,
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  }

  const createCard = () => {  
    let card = [] as Array<any>;
    applicants.forEach(function(applicant){
      card.push(<> 
        <div className="card" style={{width: "9rem", float:"left"}}><img src={applicant.photoUrl} className="card-img-top" alt="..."/>      
          <div className="card-body">
            <h5 className="card-title">{applicant.firstName}</h5>
            <h5 className="card-title">{applicant.jobTitle}</h5>
            <p className="card-text"></p>
            <button onClick={() =>autofill(applicant)} className="btn btn-primary">Auto Fill</button>
          </div>
        </div>
      </>);
    });
 
    return card;
  };

  return (
    <>
   
      {createCard()}
      <div style={{clear:"both"}}></div>
      <ul style={{ minWidth: "700px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button
        onClick={clear}
        style={{ marginRight: "5px" }}
      >
        Clear
      </button>
      <button onClick={refresh}>Refresh</button>

      <a href="https://geekseat-dev.sandbox.operations.dynamics.com/?cmp=PTGI&mi=HcmApplicantListPage" target="_blank">Go to Dynamics</a>
    </>
  );
};



let applicants =  [] as Array<Applicant>;
console.log("Loading applicants");
chrome.storage.sync.get({applicants:[]}, function(data){
  console.log(data.applicants)
  applicants =data.applicants;
  RenderPage();
});

const RenderPage = () =>
{
  ReactDOM.render(
    <React.StrictMode>    
        <Popup />
    </React.StrictMode>,
    document.getElementById("root")
  );
  
}