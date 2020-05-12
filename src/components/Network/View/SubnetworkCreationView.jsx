import React from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import {changeView, setSubnetworks, updateSubnetworkForm} from "../../../data-layer/ActionCreators";
import {post} from "../../../util/Http";
import {subnetworkUrl} from "../../../util/Parameters";
import {networkView} from "../../../Views";

function mapStateToProps(state, props) {
    return {
        subnetworkForm: state.subnetworkForm,
        networkId: state.activeNetwork.id,
        subnetworks: state.subnetworks,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateSubnetworkForm: fieldNameToValue => dispatch(updateSubnetworkForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view)),
        setSubnetworks: subnetworks => dispatch(setSubnetworks(subnetworks))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function save() {
        post(subnetworkUrl(props.networkId), props.subnetworkForm, rs => {
            props.setSubnetworks(props.subnetworks.concat(rs))
            props.updateSubnetworkForm({title: "", description: ""})
            props.changeView(networkView)
            props.growl.show({severity: "info", summary: "Подсеть создана"})
        })
    }

    return (
        <div className={"subnetwork-creation-view"}>
            <div className={"subnetwork-creation-view-label"}>Название: </div>
            <input className={"subnetwork-creation-view-input"}
                   value={props.subnetworkForm.title}
                   onChange={e => props.updateSubnetworkForm({title: e.target.value})}
            />

            <div className={"subnetwork-creation-view-label"}>Картинка: </div>
            <input type={"file"} />

            <div className={"subnetwork-creation-view-label"}>Описание:</div>
            <InputTextarea autoResize={true}
                           rows={10}
                           value={props.subnetworkForm.description}
                           onChange={e => props.updateSubnetworkForm({description: e.target.value})}
            />
            <div className={"subnetwork-creation-save-button"}
                 onClick={() => save()}>
                Сохранить
            </div>
        </div>
    )
})