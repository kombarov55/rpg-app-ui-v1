import React, {useState} from "react";
import LabeledCheckbox from "../Common/LabeledCheckbox";
import getOrDefault from "../../util/getOrDefault";
import Btn from "../Common/Btn";

export default function (props) {
    const onSubmit = getOrDefault(props.onSubmit, () => {})

    const [checkedValues, setCheckedValues] = useState([])

    function isChecked(name) {
        const x = checkedValues.find(it => it.name === name)
        if (x == null) {
            return false
        } else {
            return x.checked
        }
    }

    return (
        <form style={{margin: "1vmax 0"}}>
            {props.currencyNames.map(name =>
                <LabeledCheckbox
                    key={"labeled-checkbox " + name}
                    text={name}
                    checked={isChecked(name)}
                    onChange={e => setCheckedValues(checkedValues
                        .filter(it => it.name !== name)
                        .concat({name: name, checked: e.target.checked}))}
                />)
            }
            <Btn text={"Добавить"} onClick={() => {
                onSubmit(checkedValues)
                setCheckedValues([])
            }}
            />
        </form>
    )
}