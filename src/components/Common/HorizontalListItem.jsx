import React from "react";
import {connect} from "react-redux";

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch, props) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    const {name, description, imgSrc, onDelete, onEdit, onClick} = props

    return (
        <div className={"horizontal-list-item"}>
            <div className={"horizontal-list-item-head"}>
                <img className={"horizontal-list-img"}
                     src={imgSrc}
                     onClick={() => onClick()}
                />
                <div className={"horizontal-list-item-text-group"}>
                    <div className={"horizontal-list-item-text-group-vertical"}
                         onClick={() => onClick()}>
                        <div className={"horizontal-list-item-name"}>{name}</div>
                        <div className={"horizontal-list-item-description"}>{description}</div>
                    </div>
                    <div className={"horizontal-list-item-button-group"}>
                        {
                            props.onDelete &&
                            <i className={"pi pi-times"}
                               onClick={() => onDelete()}
                            />
                        }

                        {
                            props.onEdit &&
                            <i className={"pi pi-pencil"}
                               onClick={() => onEdit()}
                            />
                        }
                    </div>
                </div>
            </div>

        </div>
    )
})