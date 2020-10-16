import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import {SelectButton} from "primereact/selectbutton";
import Popup from "../../../../util/Popup";
import IsNumeric from "../../../../util/IsNumeric";

export default class SkillCategoryToPointsForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState == null ?
            this.initialState :
            props.initialState
    }

    initialState = {
        skillCategory: null,
        amount: null
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Распределение начальных очков"}/>
                <InputLabel text={"Категория:"}/>
                <SelectButton options={this.props.skillCategories.map(skillCategory => ({
                    label: skillCategory.name,
                    value: skillCategory
                }))}
                              value={this.state.skillCategory}
                              onChange={e => this.setState({skillCategory: e.target.value})}
                />

                <InputLabel text={"Количество:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  if (
                                      this.state.amount == null ||
                                      this.state.skillCategory == null
                                  ) {
                                      Popup.error("Пожалуйста, заполните все обязательные поля: [Категория, Количество]")
                                      return
                                  } else if (
                                      !IsNumeric(this.state.amount)
                                  ) {
                                      Popup.error("Количество должно быть числом!")
                                      return
                                  }

                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}