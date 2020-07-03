import React from "react";

export default function(props) {
    return (
        <i className={props.className}
           style={{"fontSize": props.fontSize}}
           onClick={() => props.onClick()}
        />
    )
}