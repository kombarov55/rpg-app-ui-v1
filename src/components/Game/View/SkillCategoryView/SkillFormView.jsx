import React from "react";
import {connect} from "react-redux"
import SkillForm from "../../SkillForm";

export default connect(
    state => ({
        onBackClicked: state.changeViewParams.onBackClicked,
        onSubmit: state.changeViewParams.onSubmit
    }),
    null
)
(SkillForm)