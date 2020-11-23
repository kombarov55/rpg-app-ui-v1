import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>

                <SubmitButton text={"Создать"}
                              onClick={() => {
                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}