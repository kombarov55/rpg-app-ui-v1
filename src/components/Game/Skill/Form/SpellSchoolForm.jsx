import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import IconSelect from "../../../Common/Input/IconSelect";
import SkillIcons from "../../../../data-layer/enums/SkillIcons";
import FileUpload from "../../../Common/Input/FileUpload";
import {InputTextarea} from "primereact/inputtextarea";
import PriceInput from "../../../Common/Input/PriceInput";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import Popup from "../../../../util/Popup";
import _ from "lodash"

export default class SpellSchoolForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props.initialState == null ?
            this.initialState :
            this.props.initialState
    }

    initialState = {
        name: "",
        img: "",
        description: "",
        minSpellCountToUpgrade: 1,

        purchasePriceCombinations: []
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Создание школы навыков:"}/>

                <InputLabel text={"Название:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Картинка:"}/>
                <IconSelect imgList={SkillIcons.values()}
                            onSelected={img => this.setState({img: img})}
                />

                <InputLabel text={"Или загрузите:"}/>
                <FileUpload onChange={filename => this.setState({img: filename})}/>

                <InputLabel text={"Описание:"}/>
                <InputTextarea value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}
                />

                <InputLabel text={"Мин. изученных заклинаний для перехода на сл. уровень:"}/>
                <input value={this.state.minSpellCountToUpgrade}
                       onChange={e => this.setState({minSpellCountToUpgrade: e.target.value})}
                />

                <List title={"Стоимость изучения школы:"}
                      noItemsText={"Не указана.."}
                      values={this.state.purchasePriceCombinations.map(listOfAmounts =>
                          <ListItem text={listOfAmounts.map(amount => amount.name + ": " + amount.amount).join(" + ")}
                                    onDelete={() => this.setState(state => ({
                                        purchasePriceCombinations: state.purchasePriceCombinations.filter(savedEntries => !_.isEqual(listOfAmounts, savedEntries))
                                    }))}
                          />
                      )}
                />
                <PriceInput currencies={this.props.currencyNames}
                            onSubmit={listOfAmounts => this.setState(state => ({purchasePriceCombinations: state.purchasePriceCombinations.concat([listOfAmounts])}))}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  if (
                                      this.state.name == "" ||
                                      this.state.img == "" ||
                                      this.state.description == ""
                                  ) {
                                      Popup.error("Пожалуйста, заполните все поля: [Название, Картинка, Описание].")
                                      return
                                  } else if (this.state.minSpellCountToUpgrade < 0) {
                                      Popup.error("Количество заклинаний для повышения не может быть отрицательным.")
                                      return
                                  }

                                  this.props.onSubmit(this.state)
                                  this.setState(this.initialState)
                              }}
                />

            </div>
        )
    }

}