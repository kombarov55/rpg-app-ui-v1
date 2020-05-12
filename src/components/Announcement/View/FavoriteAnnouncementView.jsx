import React from "react";
import ConnectedAnnouncementView from "../ConnectedAnnouncementView";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        announcements: state.userAccount.userAccountPreferences.favAnnouncementIds.map(id =>
            state.announcements.find(announcement =>
                announcement.id === id))
    }
}

export default connect(mapStateToProps)(ConnectedAnnouncementView)