import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import FormViewStyle from "../../../../styles/FormViewStyle";
import IconSelect from "../../../Common/Input/IconSelect";
import InputLabel from "../../../Common/Labels/InputLabel";
import FileUpload from "../../../Common/Input/FileUpload";
import SkillIcons from "../../../../data-layer/enums/SkillIcons";
import {InputTextarea} from "primereact/inputtextarea";

export default class QuestionnaireTemplateForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState == null ?
            this.initialState :
            props.initialState
    }

    initialState = {
        name: null,
        img: null,
        description: null
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <FormTitleLabel text={"Шаблон анкеты"}/>

                <InputLabel text={"Название:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Картинка:"}/>
                <IconSelect imgList={SkillIcons.values()}
                            onSelected={img => this.setState({img: img})}
                />
                <InputLabel text={"Или загрузите:"}/>
                <FileUpload onChange={img => this.setState({img: img})}/>

                <InputLabel text={"Описание:"}/>
                <InputTextarea autoResize={true}
                               value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}