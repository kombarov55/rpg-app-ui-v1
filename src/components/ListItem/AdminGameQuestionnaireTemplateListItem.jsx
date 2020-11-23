import React from "react";
import ExpandableListItemWithBullets from "../Common/ListElements/ExpandableListItemWithBullets";

export default class extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const questionnaireTemplate = this.props.questionnaireTemplate

        return (
            <ExpandableListItemWithBullets
                name={questionnaireTemplate.name}
                description={questionnaireTemplate.description}
                img={questionnaireTemplate.img}
                onEditClicked={() => this.props.onEditClicked()}
                onDeleteClicked={() => this.props.onDeleteClicked()}
                onDetailsClicked={() => this.props.onDetailsClicked()}
                alwaysExpand={true}
                key={questionnaireTemplate.id}
            />
        )
    }
}