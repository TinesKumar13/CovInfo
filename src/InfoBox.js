import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
import CountUp from "react-countup";


function InfoBox({ title, cases, total, active, isRed, ...props }) {
  console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
     +<CountUp start={total} end={cases} duration={2.50} separator="," /> 
    
        </h2>
        
        <Typography className="infoBox__total" color="textSecondary">
       <CountUp start={cases} end={total} duration={2.50} separator="," /> Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;