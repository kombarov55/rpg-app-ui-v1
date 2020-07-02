import React from "react";
import NoItemsLabel from "./NoItemsLabel";

export default function (props) {
    return (
        <div style={listWrapperStyle}>
            <div style={listTitleStyle}>{props.title}</div>
            <div className={"list"}>
                {
                    props.values == null || props.values.length === 0 ?
                        <NoItemsLabel text={props.noItemsText}/> :
                        props.values
                }
            </div>
        </div>
    )
}

const listWrapperStyle = {
    display: "flex",
    flexDirection: "column",

    width: "100%"
}

const listTitleStyle = {
    alignSelf: "flex-start",

    margin: "0 0 0.5vmax 5vmin",

    fontSize: "2.5vmax"
}