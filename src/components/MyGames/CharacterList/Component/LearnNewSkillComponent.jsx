import React from "react";
import Btn from "../../../Common/Buttons/Btn";
import {get} from "../../../../util/Http";
import {findSkillsByGameIdAndDestination} from "../../../../util/Parameters";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import AmountsToString from "../../../../util/AmountsToString";
import Destination from "../../../../data-layer/enums/Destination";
import List from "../../../Common/Lists/List";

export default class LearnNewSkillComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            skills: []
        }
    }

    render() {
        return (
            <div>
                <Btn text={"Выучить новый навык"} onClick={() => {
                    get(findSkillsByGameIdAndDestination(this.props.gameId, Destination.PLAYER), rs => {
                        this.setState({
                            skills: rs.filter(v => !this.props.learnedSkills.some(learnedSkill => learnedSkill.id === v.id)),
                            formVisible: true
                        })
                    })
                }}/>
                {this.state.formVisible &&
                <List title={"Выберите навык:"}
                      noItemsText={"Пусто.. "}
                      values={this.state.skills.map(skill =>
                          <ExpandableListItem
                              name={skill.name}
                              img={skill.img}
                              description={skill.description}
                              expandableElements={[
                                  <InputLabel text={`Категория: ${skill.categoryName}`}/>,
                                  ...(skill.prices.length !== 0 ? [
                                          <FormTitleLabel text={"Купить:"}/>,
                                          ...skill.prices.map(amounts =>
                                              <Btn text={AmountsToString(amounts)}
                                                   onClick={() => {
                                                       this.props.onSkillPurchase(skill, amounts)
                                                       this.setState({formVisible: false})
                                                   }}
                                              />
                                          )
                                      ] : [<Btn text={"Получить бесплатно."}
                                                onClick={() => {
                                                    this.props.onSkillPurchase(skill, [])

                                                }}
                                      />]
                                  )

                              ]}
                              alwaysExpand={true}
                              key={skill.id}
                          />
                      )}
                />
                }
            </div>
        )
    }
}