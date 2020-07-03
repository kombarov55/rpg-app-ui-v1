import React from "react";
import NoItemsLabel from "../Labels/NoItemsLabel";
import CenterPlusButton from "../Buttons/CenterPlusButton";

export default function (props) {
    const onAddClicked = props.onAddClicked == null ? () => {} : props.onAddClicked

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
            {
                props.addButtonVisible &&
                <CenterPlusButton onClick={() => onAddClicked()} />
            }

        </div>
    )
}

const listWrapperStyle = {
    display: "flex",
    flexDirection: "column",

    margin: "1vmax 0",
    width: "100%"
}

const listTitleStyle = {
    alignSelf: "flex-start",

    margin: "0 0 0.5vmax 5vmin",

    fontSize: "2.5vmax"
}