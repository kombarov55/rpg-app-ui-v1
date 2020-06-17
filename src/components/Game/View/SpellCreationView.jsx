import React from "react";
import {connect} from "react-redux"
import InputLabel from "../../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    return (
        <div style={style}>
            <InputLabel text={"Название заклинания:"}/>
            <input/>

            <InputLabel text={"Картинка:"}/>
            <input type={"file"}/>

            <InputLabel text={"Описание:"}/>
            <InputTextarea/>
        </div>
    )
})

const style = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",

    width: "90%"
}