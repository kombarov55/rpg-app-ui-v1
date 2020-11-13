import React from "react";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import Btn from "../../../Common/Buttons/Btn";
import BulletList from "../../../Common/Lists/BulletList";
import ItemTransferForm from "../Form/ItemTransferForm";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false
        }
    }

    render() {
        return (
            <ExpandableListItem name={this.props.item.name}
                                img={this.props.item.img}
                                description={this.props.item.description}
                                expandableElements={[
                                    <BulletList values={[
                                        this.props.item.category.name,
                                        this.props.item.type.name,
                                        `${this.props.item.slots} слотов`,
                                        this.props.item.canBeEquipped ? "Можно одеть" : null,
                                        this.props.item.canBeCrafted ? "Можно скрафтить" : null,
                                        this.props.item.canBeUsedInCraft ? "Можно использовать в крафте" : null,
                                        `${this.props.item.lvl} уровень предмета`
                                    ]}/>,
                                    <Btn text={"Передать"} onClick={() => this.setState({formVisible: true})}/>,
                                    (
                                        this.state.formVisible &&
                                        <ItemTransferForm gameId={this.props.gameId}
                                                          onSubmit={({destinationType, destination}) => this.props.onTransferItem(destinationType, destination)}
                                        />
                                    ),
                                    <Btn text={"Выбросить"} onClick={() => this.props.onDisposeItem(this.props.item)}/>
                                ]}

                                alwaysExpand={true}
            />
        )
    }
}