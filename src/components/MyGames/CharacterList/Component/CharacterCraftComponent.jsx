import React from "react";
import Btn from "../../../Common/Buttons/Btn";
import CharacterCraftForm from "../Form/CharacterCraftForm";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false
        }
    }

    render() {
        return (
            !this.state.formVisible ?
                <Btn text={"Крафт"}
                     onClick={() => this.setState({formVisible: true})}
                /> :
                <CharacterCraftForm onSubmit={form => {
                    this.setState({formVisible: false})
                    this.props.onItemCrafted(form)
                }}
                />

        )
    }
}