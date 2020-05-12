import React from "react";
import {get} from "../../../util/Http";
import {restoreCommentUrl} from "../../../util/Parameters";
import {incAnnouncementField, restoreComponent} from "../../../data-layer/ActionCreators";
import {connect} from "react-redux";

function mapDispatchToProps(dispatch, props) {
    return {
        restoreInStore: () => dispatch(restoreComponent(props.id)),
        incCommentsCount: () => dispatch(incAnnouncementField(props.announcementId, "commentsCount"))
    }
}

function RestoreComment(props) {

    async function onLinkClicked() {
        props.restoreInStore()
        props.incCommentsCount()

        get(restoreCommentUrl(props.announcementId, props.id))
    }

    return (
        <div className={"restore-comment"}>
            <div className={"restore-comment-text"}>
                Комментарий удалён
            </div>
            <div className={"restore-comment-link"} onClick={() => onLinkClicked()}>
                [Восстановить]
            </div>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(RestoreComment)
