import React, {useState} from "react";
import copy from "../../util/updateObject";
import getOrDefault from "../../util/getOrDefault";
import CenterPlusButton from "./CenterPlusButton";

export default function (props) {
    const {options} = props
    const onChecked = getOrDefault(props.onChecked, () => {
    })

    function CheckButton(props) {
        const {text} = props
        const [checked, setChecked] = useState(false)

        const uncheckedStyle = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",

            width: "100%",
            padding: "1vmax 2vmin",
            margin: "0.2vmax 0",

            borderRadius: "5px",
            background: "rgba(0, 0, 0, 0.24)"
        }

        const checkedStyle = copy(uncheckedStyle, {background: "grey"})

        function onClick() {
            onChecked({name: props.text, checked: !checked})
            setChecked(!checked)
        }

        return (
            <div style={checked ? checkedStyle : uncheckedStyle}
                 onClick={() => onClick()}
                 key={"multicheck + " + text}>
                <div>{text}</div>
            </div>
        )
    }

    return (
        <>
            <div className={"list"}>
                {
                    options.map(x => <CheckButton text={x}/>)
                }
            </div>
            {
                props.onSubmit != null &&
                <CenterPlusButton onClick={() => props.onSubmit()}/>
            }
        </>
    )
}