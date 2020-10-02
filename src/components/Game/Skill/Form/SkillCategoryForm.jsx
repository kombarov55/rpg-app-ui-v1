import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import {InputTextarea} from "primereact/inputtextarea";
import {upload} from "../../../../util/HttpRequests";
import {uploadUrl} from "../../../../util/Parameters";
import InputLabel from "../../../Common/Labels/InputLabel";
import {InputSwitch} from "primereact/inputswitch";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import Popup from "../../../../util/Popup";
import IconSelect from "../../../Common/Input/IconSelect";
import SkillIcons from "../../../../data-layer/enums/SkillIcons";
import Destination from "../../../../data-layer/enums/Destination";
import {SelectButton} from "primereact/selectbutton";

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
        destination: Destination.PLAYER,
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
                <IconSelect  imgList={SkillIcons.values()}
                             onSelected={img => this.setState({img: img})}
                />

                <InputLabel text={"Или загрузите:"}/>
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

                        <InputLabel text={"Для кого?"}/>
                        <SelectButton options={Destination.values.map(v => ({label: v.value, value: v.name}))}
                                      value={this.state.destination}
                                      onChange={e => this.setState({destination: e.target.value})}
                        />
                    </>
                }

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  console.log("submit: ")
                                  console.log(this.state)
                                  if (
                                      this.state.name == "" ||
                                      this.state.description == "" ||
                                      this.state.img == ""
                                  ) {
                                      Popup.error("Заполните все поля: [Название, Картинка, Описание].")
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