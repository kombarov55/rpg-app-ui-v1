import React from "react"
import {connect} from "react-redux"
import FormViewStyle from "../../../styles/FormViewStyle";

export default connect(
    state => ({}),
    dispatch => ({})
)(class ShopView extends React.Component {
    render() {
        return (
            <div style={FormViewStyle}>
                Магазин
            </div>
        )
    }
})