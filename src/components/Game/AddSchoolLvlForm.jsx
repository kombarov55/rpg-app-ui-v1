import React from "react";
import FormTitleLabel from "../Common/FormTitleLabel";
import InputLabel from "../Common/InputLabel";
import List from "../Common/List";
import ListItemExpand from "./ListItemExpand";
import SpellSchoolLvlUpgradePriceForm from "./SpellSchoolLvlUpgradePriceForm";
import InnerFormStyle from "../../styles/InnerFormStyle";
import AddItemButton from "../Common/AddItemButton";
import SpellCreationView from "./View/SpellCreationView";
import priceCombinationListToString from "../../util/priceCombinationListToString";
import ListItemSmallDeletable from "../Common/ListItemSmallDeletable";
import Btn from "../Common/Btn";

export default class AddSchoolLvlForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        spells: [],
        schoolLvlUpgradePriceCombinations: [],

        addSpellFormVisible: false
    }

    render() {
        return (
            <div style={InnerFormStyle}>
                <FormTitleLabel text={"Создание круга заклинаний:"}/>

                <InputLabel text={this.props.lvl + " круг:"}/>
                <InputLabel text={"Заклинания:"}/>
                <List noItemsText={"Нет заклинаний"}
                      values={this.state.spells.map(spell =>
                          <ListItemExpand
                              name={spell.name}
                              img={spell.img}
                              description={spell.description}
                          />
                      )}
                />
                {
                    this.state.addSpellFormVisible && <SpellCreationView
                        onSubmit={data => this.onaAddSpellFormSubmitted(data)}
                    />
                }
                {
                    !this.state.addSpellFormVisible &&
                    <AddItemButton text={"Создать заклинание"} onClick={() => this.onAddSpellClicked()}/>
                }


                <InputLabel text={"Стоимость заклинаний:"}/>
                <List noItemsText={"Не указана"}
                      values={this.state.schoolLvlUpgradePriceCombinations.map(schoolLvlUpgradePriceCombination =>
                          <ListItemSmallDeletable
                              text={schoolLvlUpgradePriceCombination.spellCount + " заклинаний: " + priceCombinationListToString(schoolLvlUpgradePriceCombination.priceCombinationList)}
                              onDelete={() => this.setState(state => ({
                                  schoolLvlUpgradePriceCombinations: this.state.schoolLvlUpgradePriceCombinations.filter(it => it !== schoolLvlUpgradePriceCombination)
                              }))}
                          />
                      )}
                />

                <SpellSchoolLvlUpgradePriceForm spellCount={this.state.schoolLvlUpgradePriceCombinations.length} onSubmit={data => this.setState(state => ({
                    schoolLvlUpgradePriceCombinations: this.state.schoolLvlUpgradePriceCombinations.concat(data)
                }))}/>

                <Btn text={"Сохранить круг заклинаний"} onClick={() => this.onSubmit()}/>
            </div>
        )
    }

    onAddSpellClicked() {
        this.setState({addSpellFormVisible: true})
    }

    onaAddSpellFormSubmitted(data) {
        this.setState(state => ({
            spells: state.spells.concat(data),
            addSpellFormVisible: false
        }))
    }

    onSubmit() {
        const result = Object.assign({}, this.state, {
            lvl: this.props.lvl
        })

        this.props.onSubmit(result)
        this.setState(this.initialState)
    }

}