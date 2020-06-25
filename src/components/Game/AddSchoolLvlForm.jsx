import React from "react";
import FormTitleLabel from "../Common/FormTitleLabel";
import InputLabel from "../Common/InputLabel";
import List from "../Common/List";
import ListItemExpand from "./ListItemExpand";
import SpellSchoolLvlUpgradePriceForm from "./SpellSchoolLvlUpgradePriceForm";
import InnerFormStyle from "../../styles/InnerFormStyle";
import AddItemButton from "../Common/AddItemButton";
import SpellCreationView from "./View/SpellCreationView";

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

                <InputLabel text={"1 круг:"}/>
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
                <List noItemsText={"Не указана"}/>

                <SpellSchoolLvlUpgradePriceForm onSubmit={data => this.setState(state => ({
                    schoolLvlUpgradePriceCombinations: this.state.schoolLvlUpgradePriceCombinations.concat(data)
                }))}/>
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

}