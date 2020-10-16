import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import FormViewStyle from "../../../../styles/FormViewStyle";

export default class QuestionnaireTemplateForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState == null ?
            this.initialState :
            props.initialState
    }

    initialState = {

    }

    render() {
        return (
            <div style={FormViewStyle}>
                <FormTitleLabel text={"Шаблон анкеты"}/>

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}