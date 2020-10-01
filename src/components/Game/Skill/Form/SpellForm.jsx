import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import IconSelect from "../../../Common/Input/IconSelect";
import SkillIcons from "../../../../data-layer/enums/SkillIcons";
import FileUpload from "../../../Common/Input/FileUpload";
import {InputTextarea} from "primereact/inputtextarea";
import Popup from "../../../../util/Popup";

export default class SpellForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState == null ?
            this.initialState :
            props.initialState
    }

    initialState = {
        name: "",
        img: "",
        description: ""
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Заклинание:"}/>

                <InputLabel text={"Название:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Картинка:"}/>
                <IconSelect imgList={SkillIcons.values()}
                            onSelected={img => this.setState({img: img})}
                />

                <InputLabel text={"Или загрузите:"}/>
                <FileUpload onSubmit={img => this.setState({img: img})}/>

                <InputLabel text={"Описание:"}/>
                <InputTextarea autoResize={true}
                               value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  if (
                                      this.state.name == "" ||
                                      this.state.img == "" ||
                                      this.state.description == ""
                                  ) {
                                      Popup.error("Пожалуйста, заполните все поля: [Название, Картинка, Описание]")
                                      return
                                  }

                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}