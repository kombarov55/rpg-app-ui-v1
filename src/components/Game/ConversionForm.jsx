import React from "react";
import {connect} from "react-redux";
import Btn from "../Common/Btn";
import InputLabel from "../Common/InputLabel";
import {SelectButton} from "primereact/selectbutton";

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch, props) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    return (
        <div className={"form-view"}>
            <div className={"input-group"}>
                <InputLabel text={"1 Валюта:"}/>
                <SelectButton
                    options={[
                        {label: "Золото", value: {}},
                        {label: "Серебро", value: {}},
                        {label: "Опыт", value: {}},
                    ]}
                />

                <InputLabel text={"2 Валюта:"}/>
                <SelectButton
                    options={[
                        {label: "Золото", value: {}},
                        {label: "Серебро", value: {}},
                        {label: "Опыт", value: {}},
                    ]}
                />

                <InputLabel text={"Обмен 1 в 2:"}/>
                <div className={"conversion-entry"}>
                    <div className={"conversion-currency-name"}>
                        1 Золото =
                    </div>
                    <input className={"conversion-input"}/>
                    <div className={"conversion-currency-name"}>
                        Серебро
                    </div>
                </div>
                <InputLabel text={"Обмен 2 в 1:"}/>
                <div className={"conversion-entry"}>
                    <div className={"conversion-currency-name"}>
                        1 Серебро =
                    </div>
                    <input className={"conversion-input"}/>
                    <div className={"conversion-currency-name"}>
                        Золото
                    </div>
                </div>
            </div>
            <Btn text={"Сохранить"}/>
        </div>
    )
})