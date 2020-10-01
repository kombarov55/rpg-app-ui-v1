import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";

export default class SpellForm extends React.Component {

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
            <div>
                <FormTitleLabel text={"Заклинание:"}/>

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}