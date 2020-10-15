import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";

export default class MerchandiseUpgradeForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = Object.assign(
            {},
            this.props.initialState != null ? this.props.initialState : this.initialState,
            {lvlNum: props.lvlNum})
    }


    initialState = {}

    render() {
        return (
            <div>
                <FormTitleLabel text={this.state.lvlNum + " уровень:"}/>

                <SubmitButton text={"Сохранить"} onClick={() => this.onSubmit()}/>
            </div>
        );
    }

    onSubmit() {
        this.props.onSubmit(this.state)
        this.setState(this.initialState)
    }

}