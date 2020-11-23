import React from "react";
import ExpandableListItemWithBullets from "../Common/ListElements/ExpandableListItemWithBullets";
import OrganizationType from "../../data-layer/enums/OrganizationType";

export default class extends React.Component {

    render() {
        const organization = this.props.organization

        return (
            <ExpandableListItemWithBullets
                name={organization.name}
                description={organization.description}
                bullets={[
                    "Тип: " + OrganizationType.getLabelByName(organization.type)
                ]}
                onEditClicked={() => this.props.onEditClicked()}
                onDeleteClicked={() => this.props.onDeleteClicked()}

                alwaysExpand={true}
                key={organization.id}
            />
        )
    }
}