import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import FormMode from "../../../../data-layer/enums/FormMode";
import IconSelect from "../../../Common/Input/IconSelect";
import SkillIcons from "../../../../data-layer/enums/SkillIcons";
import FileUpload from "../../../Common/Input/FileUpload";
import {InputTextarea} from "primereact/inputtextarea";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import _ from "lodash"
import PriceInput from "../../../Common/Input/PriceInput";
import {InputSwitch} from "primereact/inputswitch";
import Popup from "../../../../util/Popup";

export default class SkillForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.formMode == FormMode.CREATE ?
            this.initialState :
            props.initialState
    }

    initialState = {
        name: "",
        img: "",
        description: "",
        prices: [],
        upgradable: false
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Навык:"}/>

                <InputLabel text={"Название:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Картинка:"}/>
                <IconSelect imgList={SkillIcons.values()}
                            onSelected={img => this.setState({img: img})}
                />

                <InputLabel text={"Или загрузите:"}/>
                <FileUpload onChange={img => this.setState({img: img})}/>

                <InputLabel text={"Описание:"}/>
                <InputTextarea autoResize={true}
                               value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}
                />

                <InputLabel text={"Стоимость:"}/>
                <List title={"Стоимость:"}
                      noItemsText={"Не указана"}
                      values={this.state.prices.map(amounts =>
                          <ListItem text={amounts.map(amount => amount.name + ": " + amount.amount).join(" + ")}
                                    onDelete={() => this.setState(state => ({prices: state.prices.filter(savedAmounts => !_.isEqual(savedAmounts, amounts))}))}
                          />
                      )}
                />
                <PriceInput currencies={this.props.currencyNames}
                            onSubmit={amounts => this.setState(state => ({prices: state.prices.concat([amounts])}))}
                />

                {
                    this.props.formMode == FormMode.CREATE &&
                    <>
                        <InputLabel text={"Прокачиваемый?"}/>
                        <InputSwitch checked={this.state.upgradable}
                                     onChange={e => this.setState({upgradable: e.value})}
                        />
                    </>
                }

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  if (
                                      this.state.name == "" ||
                                      this.state.img == "" ||
                                      this.state.description == ""
                                  ) {
                                      Popup.error("Пожалуйста, заполните все поля: [Название, Картинка, Описание].")
                                      return
                                  }
                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}