import React from "react";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import GetDestinationByName from "../../../../data-layer/enums/GetDestinationByName";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";
import List from "../../../Common/Lists/List";

export default class OrganizationItemsComponent extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <List title={"Склад:"}
                  noItemsText={"Пусто.."}
                  values={this.props.items.map(item =>
                      <ExpandableListItemWithBullets
                          img={item.img}
                          name={item.name}
                          description={item.description}

                          bullets={[
                              GetDestinationByName(item.destination),
                              "Категория: " + item.category.name,
                              "Тип: " + item.type.name,
                              item.slots + " слот(ов)",
                              item.skillInfluences.map(it => SkillInfluenceToString(it)).join(", ")
                          ]}

                          alwaysExpand={true}
                          key={item.id}
                      />
                  )}
            />
        )
    }
}