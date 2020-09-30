import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import {InputTextarea} from "primereact/inputtextarea";
import {upload} from "../../../../util/HttpRequests";
import {uploadUrl} from "../../../../util/Parameters";
import InputLabel from "../../../Common/Labels/InputLabel";
import {InputSwitch} from "primereact/inputswitch";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import Popup from "../../../../util/Popup";

export default class SkillCategoryForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.initialState == null ?
            this.initialState :
            this.props.initialState
    }

    initialState = {
        name: "",
        img: "",
        description: "",
        complex: false,
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Добавление категории навыка"}/>

                <InputLabel text={"Название:"}/>
                <input placeholder={"Название.."}
                       value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Картинка:"}/>
                <input type={"file"}
                       name={"img"}
                       onChange={e => upload(
                           uploadUrl,
                           e.target.files[0],
                           filename => this.setState({img: filename}))}
                />

                <InputLabel text={"Описание:"}/>
                <InputTextarea placeholder={"Описание.."}
                               value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}

                               autoResize={true}
                />

                {
                    this.state.id == null &&
                    <>
                        <InputLabel text={"Сложный?"}/>
                        <InputSwitch checked={this.state.complex}
                                     onChange={e => this.setState({complex: e.value})}
                        />
                    </>
                }

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  console.log("submit: ")
                                  console.log(this.state)
                                  if (
                                      this.state.name == "" ||
                                      this.state.description == ""
                                  ) {
                                      Popup.error("Заполните все поля: Название, Картинка, Описание.")
                                      return
                                  }

                                  this.props.onSubmit(this.state)
                                  this.setState(this.initialState)
                              }}
                />
            </div>
        )
    }

}