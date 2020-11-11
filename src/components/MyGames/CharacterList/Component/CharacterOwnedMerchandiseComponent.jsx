import React from "react";
import List from "../../../Common/Lists/List";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";
import BulletList from "../../../Common/Lists/BulletList";
import Btn from "../../../Common/Buttons/Btn";

export default class CharacterOwnedMerchandiseComponent extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <List title={"Ваш склад:"}
                      values={this.props.merchandiseList.map(merchandise =>
                          <ExpandableListItem name={merchandise.name}
                                              img={merchandise.img}
                                              description={merchandise.description}
                                              expandableElements={[
                                                  <BulletList values={[
                                                      merchandise.category.name,
                                                      merchandise.type.name,
                                                      `${merchandise.slots} слотов`,
                                                      merchandise.canBeEquipped ? "Можно одеть" : null,
                                                      merchandise.canBeCrafted ? "Можно скрафтить" : null,
                                                      merchandise.canBeUsedInCraft ? "Можно использовать в крафте" : null,
                                                      `${merchandise.lvl} уровень предмета`
                                                  ]}/>,
                                                  <Btn text={"Передать"}/>,
                                                  <Btn text={"Выбросить"}/>
                                              ]}

                                              alwaysExpand={true}
                                              key={merchandise.id}
                          />
                      )}
                />
            </div>
        )
    }
}