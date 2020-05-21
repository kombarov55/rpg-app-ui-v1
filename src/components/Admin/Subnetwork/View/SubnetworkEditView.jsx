import React from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import {
    changeView,
    setActiveSubnetwork,
    setSubnetworks,
    updateSubnetworkForm
} from "../../../../data-layer/ActionCreators";
import {post, put, upload} from "../../../../util/Http";
import {editSubnetworkUrl, subnetworkUrl} from "../../../../util/Parameters";
import {networkView, subnetworkView} from "../../../../Views";
import InputLabel from "../../../Common/InputLabel";

function mapStateToProps(state, props) {
    return {
        subnetworkForm: state.subnetworkForm,
        networkId: state.activeNetwork.id,
        subnetworks: state.subnetworks,
        growl: state.growl,
        activeSubnetwork: state.activeSubnetwork
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateSubnetworkForm: fieldNameToValue => dispatch(updateSubnetworkForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view)),
        setSubnetworks: subnetworks => dispatch(setSubnetworks(subnetworks)),
        setActiveSubnetwork: subnetwork => dispatch(setActiveSubnetwork(subnetwork))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onSaveClicked() {
        put(editSubnetworkUrl(props.networkId, props.activeSubnetwork.id), props.subnetworkForm, rs => {
            props.setSubnetworks(props.subnetworks.filter(it => it.id !== rs.id).concat(rs))
            props.updateSubnetworkForm({title: "", description: ""})
            props.setActiveSubnetwork(rs)
            props.changeView(subnetworkView)
            props.growl.show({severity: "info", summary: "Подсеть отредактирована"})
        })
    }

    function onImgFileChange(e) {
        upload("https://novemis.ru:8082/uploadfile", e.target.files[0], rs => props.updateSubnetworkForm({img: rs.data.filename}))
    }

    function onBackgroundFileChange(e) {
        upload("https://novemis.ru:8082/uploadfile", e.target.files[0], rs => props.updateSubnetworkForm({background: rs.data.filename}))
    }

    return (
        <div className={"subnetwork-creation-view"}>
            <InputLabel text={"Название:"}/>
            <input className={"subnetwork-creation-view-input"}
                   value={props.subnetworkForm.title}
                   onChange={e => props.updateSubnetworkForm({title: e.target.value})}
            />

            <InputLabel text={"Ссылка на группу:"}/>
            <input className={"subnetwork-creation-view-input"}
                   value={props.subnetworkForm.groupLink}
                   onChange={e => props.updateSubnetworkForm({groupLink: e.target.value})}
            />

            <InputLabel text={"Картинка:"}/>
            <input type={"file"} onChange={e => onImgFileChange(e)} />

            <InputLabel text={"Фон:"}/>
            <input type={"file"} onChange={e => onBackgroundFileChange(e)} />

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}
                           rows={10}
                           value={props.subnetworkForm.description}
                           onChange={e => props.updateSubnetworkForm({description: e.target.value})}
            />
            <div className={"subnetwork-creation-save-button"}
                 onClick={() => onSaveClicked()}>
                Сохранить
            </div>
        </div>
    )
})