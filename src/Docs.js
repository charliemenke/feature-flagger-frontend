import React, { Component } from "react";
 
class Docs extends Component {
  render() {
    return (
      <div>
        <h2>GOT QUESTIONS?</h2>
        <ul>
          <li><a href="https://github.com/charliemenke/feature-flagger-frontend">Front End Source Code</a></li>
          <li><a href="https://github.com/charliemenke/feature-flagger-api">Back End Source Code</a></li>
          <li><a href="https://github.com/charliemenke/feature-flagger-node-sdk">SDK Source Code</a></li>
        </ul>
      </div>
    );
  }
}
 
export default Docs;