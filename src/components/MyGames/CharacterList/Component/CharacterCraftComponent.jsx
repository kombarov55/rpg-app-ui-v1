import React from "react";
import Btn from "../../../Common/Buttons/Btn";
import CharacterCraftForm from "../Form/CharacterCraftForm";
import {get} from "../../../../util/Http";
import {getRecipesByGameId} from "../../../../util/Parameters";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            recipes: []
        }
    }

    render() {
        return (
            !this.state.formVisible ?
                <Btn text={"Крафт"}
                     onClick={() => get(getRecipesByGameId(this.props.gameId), rs => this.setState({
                         recipes: rs,
                         formVisible: true
                     }))}
                /> :
                <CharacterCraftForm recipes={this.state.recipes}
                                    items={this.props.items}
                                    learnedSkills={this.props.learnedSkills}
                                    onSubmit={form => {
                                        this.setState({formVisible: false})
                                        this.props.onItemCrafted(form)
                                    }}
                />

        )
    }
}