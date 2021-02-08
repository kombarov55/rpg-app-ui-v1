import React from "react";
import NoItemsLabel from "../Labels/NoItemsLabel";
import CenterPlusButton from "../Buttons/CenterPlusButton";
import getOrDefault from "../../../util/getOrDefault";

export default function (props) {
    const onAddClicked = props.onAddClicked == null ? () => {} : props.onAddClicked

    const listValues = getOrDefault(props.children, props.values)

    return (
        <div style={listWrapperStyle}>
            <div style={listTitleStyle}>{props.title}</div>
            <div className={"list"}>
                {
                    listValues == null || listValues.length === 0 ?
                        <NoItemsLabel text={props.noItemsText != null ? props.noItemsText : "Пусто.."}/> :
                        listValues
                }
            </div>
            {
                (props.isAddButtonVisible !== undefined ? props.isAddButtonVisible : true) &&
                props.onAddClicked &&
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

    fontSize: "2.5vmax",
    textDecoration: "underline"
}