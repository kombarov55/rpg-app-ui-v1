import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import List from "../../../Common/Lists/List";
import BulletList from "../../../Common/Lists/BulletList";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import HandledCheckButton from "../../../Common/Buttons/HandledCheckButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import Validation from "../../../../util/Validation";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState == null ?
            this.initialState :
            props.initialState
    }

    initialState = {
        selectedCreditOffer: null,
        amount: null,
        duration: null,
        purpose: null
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Заполнение заявки на кредит"}/>

                <List title={"Выберите кредитную программу:"}
                      values={this.props.creditOffers.map(creditOffer =>
                          <ExpandableListItem name={creditOffer.name}
                                              description={creditOffer.description}
                                              expandableElements={[
                                                  <div>
                                                      <BulletList values={[
                                                          creditOffer.currency.name,
                                                          `Ставка: ${creditOffer.rate}`,
                                                          "От " + creditOffer.minAmount + " до " + creditOffer.maxAmount,
                                                          `До ${creditOffer.maxDurationInDays} дней`
                                                      ]}/>
                                                      <HandledCheckButton uncheckedText={"Выбрать"}
                                                                          checkedText={"Выбрано"}
                                                                          checked={this.state.selectedCreditOffer?.id === creditOffer.id}
                                                                          onClick={() => this.setState({selectedCreditOffer: creditOffer})}
                                                      />
                                                  </div>
                                              ]}
                                              alwaysExpand={true}
                          />
                      )}
                />

                <InputLabel text={"Сумма кредита:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <InputLabel text={"Длительность:"}/>
                <input value={this.state.duration}
                       onChange={e => this.setState({duration: e.target.value})}
                />

                <InputLabel text={"Назначение кредита:"}/>
                <InputTextarea autoExpand={true}
                               value={this.state.purpose}
                               onChange={e => this.setState({purpose: e.target.value})}
                />


                <SubmitButton text={"Отправить"}
                              onClick={() => {
                                  const success = Validation.run(
                                      Validation.nonNull(this.state.selectedCreditOffer, "Выберите кредитное предложение"),
                                      Validation.isNumeric(this.state.amount, "'Сумма кредита' должна быть цифрой"),
                                      Validation.isNumeric(this.state.duration, "'Длительность' должна быть цифрой"),
                                      Validation.nonNull(this.state.purpose, "Заполните поле 'Назначение'"),
                                  )
                                  if (success) {
                                      this.props.onSubmit(this.state)
                                  }
                              }}
                />
            </div>
        )
    }
}