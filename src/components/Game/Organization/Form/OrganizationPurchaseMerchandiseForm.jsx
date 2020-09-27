import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import List from "../../../Common/Lists/List";
import SmallerExpandableListItem from "../../../Common/ListElements/SmallerExpandableListItem";
import SubmitButton from "../../../Common/Buttons/SubmitButton";

export default class OrganizationPurchaseMerchandiseForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.initialState
    }

    initialState = {
        merchandise: null,
        amount: 0
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Покупка товаров для организации:"}/>
                <List title={"Выберите товар:"}
                      noItemsText={"Товар либо не прогрузился, либо нет доступного."}
                      values={this.props.merchandiseList.map(merchandise =>
                          <SmallerExpandableListItem
                              img={merchandise.img}
                              name={merchandise.name}
                              description={merchandise.description}
                              onClick={() => this.setState({merchandise: merchandise})}
                              selected={merchandise == this.state.merchandise}

                              alwaysExpand={true}
                              key={merchandise.id}
                          />
                      )}
                />

                <InputLabel text={"Количество:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <SubmitButton text={"Сохранить"} onClick={() => {
                    this.props.onSubmit(this.state)
                    this.setState(this.initialState)
                }}/>
            </div>
        )
    }

}