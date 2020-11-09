import React from "react";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import GetDestinationByName from "../../../../data-layer/enums/GetDestinationByName";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";
import List from "../../../Common/Lists/List";

export default class OwnedMerchandiseComponent extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <List title={"Склад:"}
                  noItemsText={"Пусто.."}
                  values={this.props.ownedMerchandise.map(warehouseEntry =>
                      <ExpandableListItemWithBullets
                          img={warehouseEntry.merchandise.img}
                          name={warehouseEntry.merchandise.name}
                          description={warehouseEntry.merchandise.description}

                          bullets={[
                              GetDestinationByName(warehouseEntry.merchandise.destination),
                              "Категория: " + warehouseEntry.merchandise.category.name,
                              "Тип: " + warehouseEntry.merchandise.type.name,
                              warehouseEntry.merchandise.slots + " слот(ов)",
                              warehouseEntry.merchandise.skillInfluences.map(it => SkillInfluenceToString(it)).join(", ")
                          ]}

                          alwaysExpand={true}
                          key={warehouseEntry.id}
                      />
                  )}
            />
        )
    }
}