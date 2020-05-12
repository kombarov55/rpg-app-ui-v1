import React from "react";
import {connect} from "react-redux";
import {announcementCreationView} from "../../../Views";
import ConnectedAnnouncementView from "../ConnectedAnnouncementView";
import {changeView} from "../../../data-layer/ActionCreators";

function mapStateToProps(state) {
    return {
        announcements: state.announcements
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeViewToCreation: () => dispatch(changeView(announcementCreationView))
    }
}

const AnnouncementView = connect(mapStateToProps, mapDispatchToProps)(ConnectedAnnouncementView)

export default AnnouncementView;