import React, { useEffect, useRef, useState } from "react";
import { TimeStatContext } from "./../../../tools/timerStatProvider";
import "./timestatpanel.css";

function Index() {
  const [times] = TimeStatContext();
  // useEffect(() => console.log(times))
  return (
    <div className="time-stat-container">
      <div className="column1">
        <div>
          <span className="right-stat-label">solve number: </span>
          <span className="right-stat">{times.num_time}</span>
        </div>
        <div>
          <span className="right-stat-label">best time: </span>
          <span className="right-stat">{times.best_time.text}</span>
        </div>
        <div>
          <span className="right-stat-label">worst time: </span>
          <span className="right-stat">{times.worst_time.text}</span>
        </div>
      </div>
      <div className="column2">
        <div>
          <span className="ao-label">ao3: </span>
          <span className="ao-time">{times.ao3.text}</span>
        </div>
        <div>
          <span className="ao-label">ao5: </span>
          <span className="ao-time">{times.ao5.text}</span>
        </div>
      </div>
      <div className="column3">
        <div>
          <div>
            <span className="bigao-label">ao12: </span>
            <span className="bigao-time">{times.ao12.text}</span>
          </div>
          <div>
            <span className="bigao-label">ao50: </span>
            <span className="bigao-time">{times.ao50.text}</span>
          </div>
          <div>
            <span className="bigao-label">ao100: </span>
            <span className="bigao-time">{times.ao100.text}</span>
          </div>
          <div>
            <span className="bigao-label">ao1000: </span>
            <span className="bigao-time">{times.ao1000.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
