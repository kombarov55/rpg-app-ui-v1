import React from "react";
import {connect} from "react-redux";
import ConnectedAnnouncementView from "../ConnectedAnnouncementView";

function mapStateToProps(state) {
    return {
        announcements: state.announcements.filter(it => it.authorId === state.userAccount.userId && !it.anonymous)
    }
}

export default connect(mapStateToProps)(ConnectedAnnouncementView)

