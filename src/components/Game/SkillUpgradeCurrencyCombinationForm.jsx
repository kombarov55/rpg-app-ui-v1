import React, {useState} from "react";
import SubmitButton from "../Common/SubmitButton";
import LabeledCheckbox from "../Common/LabeledCheckbox";
import updateObject from "../../util/updateObject";
import getOrDefault from "../../util/getOrDefault";
import Btn from "../Common/Btn";
import setProperty from "../../util/setProperty";

export default function (props) {
    const onSubmit = getOrDefault(props.onSubmit, () => {})

    const [checkedValues, setCheckedValues] = useState({})

    return (
        <form style={{margin: "1vmax 0"}}>
            {props.currencyNames.map(name =>
                <LabeledCheckbox
                    text={name}
                    checked={checkedValues[name]}
                    onChange={e => setCheckedValues(setProperty(checkedValues, name, e.target.checked))}
                />)
            }
            <Btn text={"Добавить"} onClick={() => {
                onSubmit(checkedValues)
                setCheckedValues({})
            }}
            />
        </form>
    )
}