import React from "react";

export default function (props) {
    return (
        <div className={"mobile-button"}
             onClick={() => {
                 if (props.onClick != null) {
                     props.onClick()
                 }
             }}>
            {props.text}
        </div>
    )
}