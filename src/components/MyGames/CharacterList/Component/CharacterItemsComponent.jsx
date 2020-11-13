import React from "react";
import List from "../../../Common/Lists/List";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import BulletList from "../../../Common/Lists/BulletList";
import Btn from "../../../Common/Buttons/Btn";

export default class CharacterItemsComponent extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <List title={"Инвентарь:"}
                      values={this.props.items.map(item =>
                          <ExpandableListItem name={item.name}
                                              img={item.img}
                                              description={item.description}
                                              expandableElements={[
                                                  <BulletList values={[
                                                      item.category.name,
                                                      item.type.name,
                                                      `${item.slots} слотов`,
                                                      item.canBeEquipped ? "Можно одеть" : null,
                                                      item.canBeCrafted ? "Можно скрафтить" : null,
                                                      item.canBeUsedInCraft ? "Можно использовать в крафте" : null,
                                                      `${item.lvl} уровень предмета`
                                                  ]}/>,
                                                  <Btn text={"Передать"}/>,
                                                  <Btn text={"Выбросить"} onClick={() => this.props.onDisposeItem(item)}/>
                                              ]}

                                              alwaysExpand={true}
                                              key={item.id}
                          />
                      )}
                />
            </div>
        )
    }
}