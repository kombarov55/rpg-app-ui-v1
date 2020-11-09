import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import {SelectButton} from "primereact/selectbutton";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import IconSelect from "../../../Common/Input/IconSelect";
import SkillIcons from "../../../../data-layer/enums/SkillIcons";
import FileUpload from "../../../Common/Input/FileUpload";
import MerchandisePublisherType from "../../../../data-layer/enums/MerchandisePublisherType";

export default class ShopForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props.initialState != null ?
            this.props.initialState :
            this.initialState
    }

    initialState = {
        name: "",
        img: "",
        type: ""
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={this.props.title}/>

                <InputLabel text={"Название:"}/>
                <input value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>

                <InputLabel text={"Картинка:"}/>
                <IconSelect imgList={SkillIcons.values()}
                            onSelected={img => this.setState({img: img})}
                />
                <InputLabel text={"Или загрузите:"}/>
                <FileUpload onChange={img => this.setState({img: img})} />

                <InputLabel text={"Кто может выставлять предметы на продажу?"}/>
                <SelectButton
                    options={MerchandisePublisherType.values}
                    value={this.state.type}
                    onChange={e => this.setState({type: e.target.value})}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  if (this.state.name == "" || this.state.type == "") return

                                  this.props.onSubmit(this.state)
                                  this.setState(this.initialState)
                              }}
                />
            </div>
        )
    }

}