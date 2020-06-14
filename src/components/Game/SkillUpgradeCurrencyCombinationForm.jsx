import React, {useState} from "react";
import LabeledCheckbox from "../Common/LabeledCheckbox";
import getOrDefault from "../../util/getOrDefault";
import Btn from "../Common/Btn";

export default function (props) {
    const onSubmit = getOrDefault(props.onSubmit, () => {
    })

    const [checkedValues, setCheckedValues] = useState([])

    return (
        <form style={{margin: "1vmax 0"}}>
            {props.currencyNames.map(name =>
                <LabeledCheckbox
                    key={"labeled-checkbox " + name}
                    text={name}
                    checked={checkedValues.filter(it => it.name === name).checked}
                    onChange={e => setCheckedValues(checkedValues
                        .filter(it => it.name !== name)
                        .concat({name: name, checked: e.target.checked}))}
                />)
            }
            <Btn text={"Добавить"} onClick={() => {
                onSubmit(checkedValues)
            }}
            />
        </form>
    )
}