import React from "react";
import FormMode from "../../../../data-layer/enums/FormMode";

export default class CountryDetailsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.formInitialState
    }

    formInitialState = {
        addShopVisible: false,
        shopForm: null,
        shopFormMode: FormMode.CREATE
    }

    render() {
        return (
            <div>

            </div>
        )
    }


}