import React from "react";
import NoItemsLabel from "./NoItemsLabel";

export default function (props) {
    return (
        <div className={"list"}>
            {
                props.values.length === 0 ?
                    <NoItemsLabel text={props.noItemsText}/> :
                    props.values
            }
        </div>
    )
}