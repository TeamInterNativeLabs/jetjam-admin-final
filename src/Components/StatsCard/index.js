import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const StatsCard = (props) => {
  return (
    <>
      <div className="statsCard">
        <div className="statsContent">
          <div className="statsImg">
            <img src={props.item.image} alt="Card Icon" />
          </div>
          <div className="statsData">
            <h3 className="statsNumber">{props.item.number}</h3>
            <p className="statsText">{props.item.text}</p>
          </div>
        </div>
        {
          props?.item?.increase && props.item.change &&
          <div className="statsChange">
            <p>
              {props.item.increase ? (
                <FontAwesomeIcon
                  icon={faArrowCircleUp}
                  className="me-2 greenColor"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faArrowCircleDown}
                  className="me-2 redColor"
                />
              )}
              {props.item.change}%
            </p>
            <p>{props.item.subData}</p>
          </div>
        }
      </div>
    </>
  );
};

export default StatsCard;
