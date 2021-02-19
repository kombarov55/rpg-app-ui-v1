import React from "react";

export default function({className, alignSelf = "auto", fontSize, onClick = () => {}}) {
    return (
        <i className={className}
           style={{
               "fontSize": fontSize,
               "alignSelf": alignSelf
           }}
           onClick={() => onClick()}
        />
    )
}