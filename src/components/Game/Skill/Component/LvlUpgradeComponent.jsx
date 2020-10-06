import React from "react";
import BulletList from "../../../Common/Lists/BulletList";

export default function (props) {
    return (
        <div style={containerStyle}>
            <div style={lvlNumStyle}>{props.lvlNum} Уровень:</div>
            <div style={descriptionStyle}>{props.description}</div>
            {
                props.prices.length !== 0 &&
                <BulletList title={"Варианты повышения:"}
                            values={props.prices
                                .map(currencyToAmountList =>
                                    currencyToAmountList
                                        .map(currencyToAmount => currencyToAmount.name + ": " + currencyToAmount.amount)
                                        .join(" + "))
                            }
                />
            }

        </div>
    )
}

const containerStyle = {
    display: "flex",
    flexDirection: "column",

    width: "100%",
    padding: "0 3vmin",
    margin: "0 0 0.5vmax 0",

    background: "#212121",
    borderRadius: "5px"

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
