import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import IconSelect from "../../../Common/Input/IconSelect";
import SkillIcons from "../../../../data-layer/enums/SkillIcons";
import FileUpload from "../../../Common/Input/FileUpload";
import {InputTextarea} from "primereact/inputtextarea";
import PetUpgradeFormComponent from "../Component/PetUpgradeFormComponent";
import AmountsFormComponent from "../Component/AmountsFormComponent";
import Validation from "../../../../util/Validation";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState == null ?
            this.initialState :
            props.initialState
    }

    initialState = {
        name: null,
        img: null,
        description: null,
        upgrades: [],
        prices: []
    }

    render() {
        const {gameId, currencies, initialState, onSubmit} = this.props

        return (
            <div>
                <FormTitleLabel text={initialState == null ?
                    "Создание питомца" :
                    "Редактирование питомца"}
                />

                <InputLabel text={"Имя:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Выберите картинку:"}/>
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

                <PetUpgradeFormComponent gameId={gameId}
                                         currencies={currencies}
                                         upgrades={this.state.upgrades}
                                         onAddUpgrade={v => this.setState(state => ({upgrades: state.upgrades.concat(v)}))}
                                         onEditUpgrade={v => this.setState(state => ({
                                             upgrades: state.upgrades.filter(petUpgrade => petUpgrade.lvl !== v.lvl).concat(v)
                                         }))}
                                         onDeleteUpgrade={v => this.setState(state => ({
                                             upgrades: state.upgrades.filter(petUpgrade => petUpgrade.lvl !== v.lvl)
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
                                  const success = Validation.run(
                                      Validation.nonNull(this.state.name, "Имя"),
                                      Validation.nonNull(this.state.img, "Картинка")
                                  )

                                  if (success) {
                                      onSubmit(this.state)
                                  }
                              }}
                />
            </div>
        )
    }
}