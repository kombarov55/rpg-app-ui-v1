import React from "react";
import Btn from "../../../Common/Buttons/Btn";
import {get} from "../../../../util/Http";
import {findAvailableSpells} from "../../../../util/Parameters";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import AmountsToString from "../../../../util/AmountsToString";
import SpellToPurchaseListItem from "../../../ListItem/SpellToPurchaseListItem";
import List from "../../../Common/Lists/List";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listVisible: false,
            spells: []
        }
    }

    render() {
        return (
            !this.state.listVisible ?
                <Btn text={"Купить новое заклинание"}
                     onClick={() => get(findAvailableSpells(this.props.gameId, this.props.characterId), rs => this.setState({
                         spells: rs,
                         listVisible: true
                     }))}
                /> :
                <List title={"Можете изучить:"}
                      values={this.state.spells.map(spell =>
                          <SpellToPurchaseListItem spell={spell}
                                                   onSpellPurchase={(spell, amounts) => {
                                                       this.props.onSpellPurchase(spell, amounts)
                                                       this.setState({listVisible: false})
                                                   }}
                                                   isSpellLearned={spell => this.props.isSpellLearned(spell)}
                                                   key={spell.id}
                          />
                      )}
                />
        )
    }
}