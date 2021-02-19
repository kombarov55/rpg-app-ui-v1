import React from "react";

export default function({className, center, fontSize, onClick = () => {}}) {
    return (
        <i className={className}
           style={{
               "fontSize": fontSize,
               "alignSelf": center ? "center" : "auto"
           }}
           onClick={() => onClick()}
        />
    )
}