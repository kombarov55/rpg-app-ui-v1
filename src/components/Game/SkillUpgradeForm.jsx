import React, {useState} from "react";
import InputLabel from "../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import MultiCheckButtonGroup from "../Common/MultiCheckButtonGroup";
import CenterPlusButton from "../Common/CenterPlusButton";
import AddItemButton from "../Common/AddItemButton";
import List from "../Common/List";
import ListItemSmall from "../Common/ListItemSmall";
import Icon from "../Common/Icon";
import _ from "lodash"
import IsNumeric from "../../util/IsNumeric";

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
            <div style={nameStyle}>{props.name + ":"}</div>
            <input
                style={inputStyle}
                value={props.value}
                onChange={e => props.onChange(e)}
            />
        </form>
    )
}

const defaultFormValue = {
    description: "",
    selectedCurrencies: [],
    upgradeOptionsForm: [],
    upgradeOptions: []
}

export default function (props) {
    const [form, setForm] = useState(defaultFormValue)

    function onOptionValueChanged(name, value) {
        setForm(Object.assign({}, form, {
            upgradeOptionsForm:
                form
                    .upgradeOptionsForm
                    .filter(it => it.name !== name)
                    .concat({name: name, amount: value})
        }))
    }

    function upgradeOptionFormValue(name) {
        const x = form.upgradeOptionsForm.find(it => it.name === name)

        if (x != null) {
            return x.amount
        } else {
            return ""
        }
    }

    function optionAdded() {
        const formOptionNames = form.upgradeOptionsForm.map(it => it.name)
        const listOfListOfNames = form.upgradeOptions.map(list => list.map(it => it.name))

        const exists = listOfListOfNames.some(list => _.isEqual(list, formOptionNames))
        const validInput = form.upgradeOptionsForm.length !== 0 && form.upgradeOptionsForm.map(it => it.amount).every(it => IsNumeric(it))

        if (!exists && validInput) {
            setForm(Object.assign({}, form, {
                upgradeOptions: form.upgradeOptions.concat([form.upgradeOptionsForm]),
                upgradeOptionsForm: [],
                selectedCurrencies: []
            }))
        }
    }

    function optionDeleted(paramEntries) {
        setForm(Object.assign({}, form, {
            upgradeOptions: form.upgradeOptions.filter(savedEntries => !_.isEqual(paramEntries, savedEntries))
        }))
    }

    return (
        <div style={style}>
            <div>
                <InputLabel text={"1 Уровень:"}/>
                <InputLabel text={"Описание:"}/>
                <InputTextarea/>
                <InputLabel text={"Повышение: (+)"}/>
                <List noItemsText={"Нет вариантов повышения"}
                      values={form.upgradeOptions.map(entries =>
                          <ListItemSmall left={entries.map(it => it.name + ": " + it.amount).join(" + ")}
                                         right={
                                             <Icon
                                                 className={"pi pi-times"}
                                                 onClick={() => optionDeleted(entries)}
                                             />
                                         }
                          />
                      )}
                />

                {["Золото", "Серебро", "Опыт"].map(name =>
                    <OptionInput name={name}
                                 value={upgradeOptionFormValue(name)}
                                 onChange={e => onOptionValueChanged(name, e.target.value)}
                    />)
                }

                <CenterPlusButton onClick={() => optionAdded(form.upgradeOptionsForm)}/>
                <AddItemButton text={"Добавить"} onClick={() => props.onSubmit()}/>
            </div>
        </div>
    )
}