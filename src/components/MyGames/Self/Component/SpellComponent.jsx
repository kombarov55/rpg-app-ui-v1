import React from "react";
import NameImgDescription from "../../../Common/Constructions/NameImgDescription";
import CheckButton from "../../../Common/Buttons/CheckButton";

export default class SpellComponent extends React.Component {

    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div>
                <NameImgDescription name={this.props.name}
                                    img={this.props.img}
                                    description={this.props.description}
                />
                {this.props.isCheckButtonVisible &&
                <CheckButton uncheckedText={"Выбрать"}
                             checkedText={"Выбрано"}
                             onClick={checked => {
                                 if (checked) {
                                     this.props.onSpellAdded()
                                 } else {
                                     this.props.onSpellRemoved()
                                 }
                             }}
                />
                }

            </div>
        )
    }
}