import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import {InputTextarea} from "primereact/inputtextarea";
import InputLabel from "../../../Common/Labels/InputLabel";
import SkillInfluenceFormComponent from "./SkillInfluenceFormComponent";
import AmountsFormComponent from "../Component/AmountsFormComponent";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState == null ?
            this.initialState :
            props.initialState
    }

    initialState = {
        description: null,
        skillInfluences: [],
        prices: []
    }

    render() {
        const {gameId, currencies, lvl, onSubmit} = this.props

        return (
            <div>
                <FormTitleLabel text={"Уровень питомца:"}/>

                <InputLabel text={`${lvl} уровень:`}/>

                <InputLabel text={"Описание:"}/>
                <InputTextarea value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}
                />

                <SkillInfluenceFormComponent gameId={gameId}
                                             skillInfluences={this.state.skillInfluences}
                                             onAddSkillInfluence={v => this.setState(state => ({
                                                 skillInfluences: state.skillInfluences.concat(v)
                                             }))}
                                             onDeleteSkillInfluence={v => this.setState(state => ({
                                                 skillInfluences: state.skillInfluences.filter(skillInfluence => skillInfluence.skill.id !== v.skill.id)
                                             }))}
                />

                <AmountsFormComponent currencies={currencies}
                                      amountsList={this.state.prices}
                                      onAddAmounts={amounts => this.setState(state => ({prices: state.prices.concat([amounts])}))}
                                      onDeleteAmounts={deletedAmounts => this.setState(state => ({
                                          prices: state.prices.filter(savedAmounts => !(
                                              savedAmounts.length === deletedAmounts.length && savedAmounts.every(savedAmount =>
                                                  deletedAmounts.some(deletedAmount =>
                                                      deletedAmount.name === savedAmount.name)
                                              )))
                                      }))}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}