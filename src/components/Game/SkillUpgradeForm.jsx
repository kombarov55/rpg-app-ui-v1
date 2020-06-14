import React from "react";
import InputLabel from "../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import AddItemButton from "../Common/AddItemButton";
import MultiCheckButtonGroup from "../Common/MultiCheckButtonGroup";
import Icon from "../Common/Icon";
import AddItemButtonCircle from "../Common/AddItemButtonCircle";
import CenterPlusButton from "../Common/CenterPlusButton";

const style = {
    padding: "0.1vmax 2vmin 1vmax 2vmin",
    margin: "2vmax 0",

    background: "rgba(0, 0, 0, 0.24)",
    borderRadius: "5px"
}

function OptionInput(props) {
    const formStyle = {
        display: "flex",
        flexDirection: "row",

        margin: "2vmax 0 1vmax 0"
    }

    const nameStyle = {
        margin: "1vmax 2vmin"
    }

    const inputStyle = {
        height: "4vmax"
    }

    return (
        <form style={formStyle}>
            <div style={nameStyle}>{props.name}</div>
            <input
                style={inputStyle}
                value={props.value}
                onChange={e => props.onChange(e)}
            />
        </form>
    )
}

export default function (props) {

    return (
        <form style={style}>
            <div>
                <InputLabel text={"1 Уровень:"}/>
                <InputLabel text={"Описание:"}/>
                <InputTextarea/>
                <InputLabel text={"Повышение: (+)"}/>
                <MultiCheckButtonGroup options={["Золото", "Опыт", "Серебро"]}
                                       onChecked={({name, checked}) => {}}
                />
                <OptionInput name={"Золото:"}/>
            </div>
        </form>
    )
}