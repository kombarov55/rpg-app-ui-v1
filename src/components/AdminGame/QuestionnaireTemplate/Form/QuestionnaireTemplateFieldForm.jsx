import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import FieldType from "../../../../data-layer/enums/FieldType";
import {SelectButton} from "primereact/selectbutton";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import Btn from "../../../Common/Buttons/Btn";
import Popup from "../../../../util/Popup";

export default class QuestionnaireTemplateFieldForm extends React.Component {

    constructor(props) {
        super(props);

        const form = props.initialState == null ?
            this.initialState :
            props.initialState

        this.state = Object.assign({}, form, this.formInitialState)
    }

    initialState = {
        name: null,
        description: null,
        type: FieldType.STRING,
        choices: []
    }

    formInitialState = {
        choiceFormVisible: false,
        choiceForm: null
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Поле шаблона анкеты:"}/>
                <InputLabel text={"Название:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Описание:"}/>
                <InputTextarea autoResize={true}
                               value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}
                />

                <InputLabel text={"Тип:"}/>
                <SelectButton options={FieldType.values()}
                              value={this.state.type}
                              onChange={e => this.setState({type: e.target.value})}
                />

                {
                    this.state.type === FieldType.CHOICE &&
                    <div>
                        <List title={"Из чего выбирать:"}
                              noItemsText={"Пусто.."}
                              isAddButtonVisible={!this.state.choiceFormVisible}
                              onAddClicked={() => this.setState({choiceFormVisible: true})}
                              values={this.state.choices.map(v =>
                                  <ListItem text={v}
                                            onDelete={() => this.setState(state => ({choices: state.choices.filter(it => it !== v)}))}
                                            key={v}
                                  />)}
                        />
                        {
                            this.state.choiceFormVisible &&
                            <div>
                                <InputLabel text={"Новое значение из списка:"}/>
                                <input value={this.state.choiceForm}
                                       onChange={e => this.setState({choiceForm: e.target.value})}
                                />
                                <Btn text={"Добавить"}
                                     onClick={() => this.setState(state => ({
                                         choices: state.choices.concat(state.choiceForm),
                                         choiceForm: "",
                                         choiceFormVisible: false
                                     }))}
                                />
                            </div>
                        }
                    </div>
                }

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  if (
                                      this.state.name == null
                                  ) {
                                      Popup.error("Пожалуйста, введите название поля.")
                                      return
                                  } else if (this.state.type === FieldType.CHOICE && this.state.choices.length === 0) {
                                      Popup.error("Пожалуйста, введите хотя бы одно значения для выбора из списка")
                                      return
                                  }

                                  if (this.state.type !== FieldType.CHOICE) {
                                      const result = Object.assign({}, this.state, {
                                          choices: null
                                      })
                                      this.props.onSubmit(result)
                                  } else {
                                      this.props.onSubmit(this.state)
                                  }
                              }}
                />
            </div>
        )
    }
}