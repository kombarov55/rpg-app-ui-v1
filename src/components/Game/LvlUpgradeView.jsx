import React from "react";
import BulletList from "../Common/BulletList";

export default function (props) {
    return (
        <div style={containerStyle}>
            <div style={lvlNumStyle}>{props.title}</div>
            <div style={descriptionStyle}>{props.description}</div>
            <BulletList title={"Прокачка:"}
                        values={props.prices
                            .map(currencyToAmountList =>
                                currencyToAmountList
                                    .map(currencyToAmount => currencyToAmount.name + ": " + currencyToAmount.amount)
                                    .join(" + "))
                        }
            />
        </div>
    )
}

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "0 3vmin"
}

const lvlNumStyle = {
    fontSize: "2vmax",
    margin: "0.5vmax 0",
    textDecoration: "underline"
}

const descriptionStyle = {
    fontSize: "1.5vmax",
    margin: "0.5vmax 0"
}
