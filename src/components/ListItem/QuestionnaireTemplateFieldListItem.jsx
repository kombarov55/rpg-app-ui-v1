import React from "react";
import ExpandableListItemWithBullets from "../Common/ListElements/ExpandableListItemWithBullets";
import FieldType from "../../data-layer/enums/FieldType";

export default class extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const field = this.props.field

        return (
            <ExpandableListItemWithBullets
                name={field.name}
                description={field.description}
                onEditClicked={() => this.props.onEditClicked()}
                onDeleteClicked={() => this.props.onDeleteClicked()}
                bullets={[
                    "Тип: " + FieldType.getLabel(field.type),
                    ...(field.type === FieldType.CHOICE ? ["Варианты:", ...field.choices] : "")
                ]}
            />
        )
    }
}