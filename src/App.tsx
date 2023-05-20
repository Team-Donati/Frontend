import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Buffer } from "buffer";

function App() {
  const image =
    '<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 345 465.66"><g id="Layer_1-2" data-name="Layer 1"><g><rect width="345" height="465" rx="17" ry="17" style="fill: #F6FDDB;"/><text transform="translate(65.26 441.35)" style="fill: #2F3A39; font-family: Poppins-SemiBold, Poppins; font-size: 41px; font-weight: 600; letter-spacing: -.04em;"><tspan x="0" y="-18">Mingyun Seo</tspan></text><text transform="translate(283.25 401.89)" style="fill: #B4D864; font-family: Poppins-Regular, Poppins; font-size: 14px;"><tspan x="-14" y="-18">FROM</tspan></text><line x1="32.71" y1="82.78" x2="200.88" y2="82.78" style="fill: none; stroke: #B4D864; stroke-miterlimit: 10;"/><line x1="32.71" y1="146.83" x2="310.87" y2="146.83" style="fill: none; stroke: #B4D864; stroke-miterlimit: 10;"/><line x1="32.71" y1="190.88" x2="310.87" y2="190.88" style="fill: none; stroke: #B4D864; stroke-miterlimit: 10;"/><line x1="32.71" y1="234.92" x2="310.87" y2="234.92" style="fill: none; stroke: #B4D864; stroke-miterlimit: 10;"/><line x1="32.71" y1="278.97" x2="310.87" y2="278.97" style="fill: none; stroke: #B4D864; stroke-miterlimit: 10;"/><line x1="32.71" y1="323.01" x2="310.87" y2="323.01" style="fill: none; stroke: #B4D864; stroke-miterlimit: 10;"/><text transform="translate(24.4 73.66)" style="fill: #24262b; font-family: SFProDisplay-Regular, &apos;SF Pro Display&apos;; font-size: 18px;"><tspan x="15" y="0" style="fill: #2F3A39;">Dear, My friend.</tspan><tspan x="15" y="64" style="letter-spacing: .02em; fill: #2F3A39;">hi</tspan><tspan x="15" y="108" style="letter-spacing: .02em; fill: #2F3A39;">im</tspan><tspan x="15" y="152" style="letter-spacing: .02em; fill: #2F3A39;">mingyun</tspan><tspan x="15" y="196" style="letter-spacing: .02em; fill: #2F3A39;">thanks a lot</tspan><tspan x="15" y="240" style="letter-spacing: .02em; fill: #2F3A39;">i love you</tspan></text></g></g></svg>';
  const buff = new Buffer(image);
  const base64data = buff.toString("base64");

  return <img src={`data:image/svg+xml;base64,${base64data}`} alt="" />;
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
