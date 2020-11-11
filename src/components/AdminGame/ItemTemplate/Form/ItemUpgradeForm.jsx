import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import List from "../../../Common/Lists/List";
import AmountsToString from "../../../../util/AmountsToString";
import PriceInput from "../../../Common/Input/PriceInput";
import ListItem from "../../../Common/ListElements/ListItem";
import SkillInfluenceForm from "./SkillInfluenceForm";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";
import _ from "lodash"
import FormMode from "../../../../data-layer/enums/FormMode";

export default class ItemUpgradeForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = Object.assign(
            {},
            this.props.initialState != null ? this.props.initialState : this.initialState,
            {
                lvlNum: props.lvlNum,

                skillInfluenceFormVisible: false,
                skillInfluenceForm: null,
                skillInfluenceFormMode: FormMode.CREATE
            })
    }


    initialState = {
        skillInfluences: [],
        prices: []
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={this.state.lvlNum + " уровень:"}/>

                <List title={"Влияние на навыки:"}
                      noItemsText={"Отсутствует.."}
                      isAddButtonVisible={!this.state.skillInfluenceFormVisible}
                      onAddClicked={() => this.setState({skillInfluenceFormVisible: true})}
                      values={this.state.skillInfluences.map(skillInfluence =>
                          <ListItem text={SkillInfluenceToString(skillInfluence)}
                                    onDelete={() => this.setState(state => ({skillInfluences: state.skillInfluences.filter(v => v != skillInfluence)}))}
                          />
                      )}
                />
                {
                    this.state.skillInfluenceFormVisible &&
                    <SkillInfluenceForm
                        skills={this.props.skills}
                        onSubmit={form => {
                            this.setState(state => ({
                                skillInfluences: state.skillInfluences.concat(form),
                                skillInfluenceFormVisible: false
                            }))
                        }}
                    />
                }

                <List title={"Стоимость:"}
                      noItemsText={"Бесплатно!"}
                      values={this.state.prices.map(amounts =>
                          <ListItem text={AmountsToString(amounts)}
                                    onDelete={() => this.setState(state => ({
                                        prices: state.prices.filter(savedList => !_.isEqual(savedList, amounts))
                                    }))}
                          />
                      )}
                />

                <PriceInput currencies={this.props.currencyNames}
                            onSubmit={amounts => this.setState(state => ({prices: state.prices.concat([amounts])}))}
                />

                <SubmitButton text={"Сохранить"} onClick={() => this.onSubmit()}/>
            </div>
        );
    }

    onSubmit() {
        this.props.onSubmit(this.state)
        this.setState(this.initialState)
    }

}