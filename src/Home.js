import React, { Component } from "react";
 
class Home extends Component {
  render() {
    return (
      <div>
        <h2>HELLO</h2>
        <p>Feature Flagger API is a a bare bones feature flag api that currently only supports boolean based features.</p>
        <h3>Features</h3>
        <ul>
          <li>List, Get, Create, Update, Delete features by name</li>
          <li>Fast Redis database to store your features</li>
        </ul>
      </div>
    );
  }
}
 
export default Home;