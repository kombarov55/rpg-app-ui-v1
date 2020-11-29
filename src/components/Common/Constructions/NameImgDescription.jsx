import React from "react";
import ExpandableListItemStyle from "../../../styles/ExpandableListItemStyle";
import Img from "../Labels/Img";

export default function ({img, name, description, roundImg = false}) {
    return (
        <div style={ExpandableListItemStyle.containerStyle}>
            <div style={ExpandableListItemStyle.innerHorizontalStyle}>
                <div style={ExpandableListItemStyle.imgAndNameStyle}>
                    {
                        img &&
                        <Img src={img} round={roundImg}/>
                    }
                    <div style={ExpandableListItemStyle.nameStyle}>{name}</div>
                </div>
            </div>
            <div>{description}</div>
        </div>
    )
}