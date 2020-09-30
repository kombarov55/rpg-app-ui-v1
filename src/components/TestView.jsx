import React from "react";
import IconSelect from "./Common/Input/IconSelect";
import MoneyIcons from "../data-layer/enums/MoneyIcons";

export default class TestView extends React.Component {
    render() {
        return (
            <div>
                <IconSelect
                    imgList={MoneyIcons.values()}
                    onSelected={img => console.log(img)}
                />
            </div>
        )
    }
}