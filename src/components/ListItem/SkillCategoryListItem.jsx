import React from "react";
import ExpandableListItemWithButtons from "../Common/ListElements/ExpandableListItemWithButtons";

export default class extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const skillCategory = this.props.skillCategory

        return (
            <ExpandableListItemWithButtons
                img={skillCategory.img}
                name={skillCategory.name}
                description={skillCategory.description}
                onDeleteClicked={() => this.props.onDeleteClicked()}
                onEditClicked={() => this.props.onEditClicked()}
                onDetailsClicked={() => this.props.onDetailsClicked()}
            />
        )
    }
}