import React from "react"

import {changeView, setGrowl, toggleSidebar} from "../data-layer/ActionCreators";
import {connect} from "react-redux";
import AppMenu from "./AppMenu";
import {Sidebar} from "primereact/sidebar";
import {Growl} from "primereact/components/growl/Growl";
import Globals from "../util/Globals";

function mapStateToProps(state) {
    return {
        currentView: state.currentView,
        sidebarVisible: state.sidebarVisible
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeView: (nextView) => dispatch(changeView(nextView)),
        toggleSidebar: () => dispatch(toggleSidebar()),
        setGrowl: growl => dispatch(setGrowl(growl))
    }
}

class ConnectedMainFrame extends React.Component {

    render() {
        return (
            <div className={"main-vertical"}>
                <Sidebar style={{width: "80vw", background: "#382357"}}
                         visible={this.props.sidebarVisible}
                         onHide={() => this.props.toggleSidebar()}
                         showCloseIcon={false}
                >
                    <AppMenu/>
                </Sidebar>
                <Growl ref={el => Globals.growl = el}/>
                {
                    this.props.currentView.header == null ?
                        <div className={"main-frame-header"}>
                            <i className={"pi pi-bars"}
                               style={{"fontSize": "5vmax", "margin": "0vw 6vw 0 0"}}
                               onClick={() => this.props.toggleSidebar()}
                            />
                            <div className={"head-name"}>
                                {this.props.currentView.label}
                            </div>
                            {/*<div className={"head-logo"}>Лого</div>*/}
                        </div> :
                        this.props.currentView.header
                }
                <div className={"main-frame-body"}>
                    <div className={"main-frame-view"}>
                        {this.props.currentView.component}
                    </div>
                </div>
                {
                    this.props.currentView.footer == null ?
                        <div className={"main-frame-footer"}>
                            <div className={"footer-copyright"}>Копирайты</div>
                            <div className={"footer-copyright"}>Реклама текстовой строкой</div>
                        </div> :
                        this.props.currentView.footer
                }
                {/*<div className={"main-frame-footer"}>*/}
                {/*    {*/}
                {/*        this.props.currentView.footer == null ?*/}
                {/*            <>*/}
                {/*                <div className={"footer-copyright"}>Копирайты</div>*/}
                {/*                <div className={"footer-copyright"}>Реклама текстовой строкой</div>*/}
                {/*            </> :*/}
                {/*            this.props.currentView.footer*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        );
    }
}

const MainFrame = connect(mapStateToProps, mapDispatchToProps)(ConnectedMainFrame)

export default MainFrame