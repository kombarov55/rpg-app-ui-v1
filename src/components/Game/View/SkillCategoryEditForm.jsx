import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../styles/FormViewStyle";
import InputLabel from "../../Common/Labels/InputLabel";
import {upload} from "../../../util/HttpRequests";
import {findSkillCategoryUrl, uploadServerUrl, uploadUrl} from "../../../util/Parameters";
import {InputTextarea} from "primereact/inputtextarea";
import Btn from "../../Common/Buttons/Btn";
import {get} from "../../../util/Http";

export default connect(
    state => ({
        skillCategoryId: state.changeViewParams.id
    }),
    dispatch => ({})
)(class SkillCategoryEditForm extends React.Component {

    constructor(props) {
        super(props);

        get(findSkillCategoryUrl(this.props.skillCategoryId), rs => this.setState(rs))

        this.state = {}
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <InputLabel text={"Название:"}/>
                <input
                    name={"name"}
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value})}/>
                <InputLabel text={"Картинка:"}/>
                <input type={"file"}
                       name={"img"}
                       onChange={e => upload(
                           uploadUrl,
                           e.target.files[0],
                           rs => this.setState({img: uploadServerUrl + "/" + rs.data.filename}))
                       }
                />
                <InputLabel text={"Описание:"}/>
                <InputTextarea autoResize={true}
                               name={"description"}
                               value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}
                />

                <Btn text={"Сохранить"} onClick={() => console.log(this.state)}/>
            </div>
        )
    }

})