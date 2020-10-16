import React from "react";
import Carousel from "../../../Common/Lists/Carousel";
import {get} from "../../../../util/Http";
import {allGamesUrl} from "../../../../util/Parameters";

export default class MyGamesView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            games: []
        }

        get(allGamesUrl, rs => this.setState({games: rs}))

    }

    render() {
        return (
            <div>
                <Carousel items={this.state.games}
                          imgKey={"img"}
                          titleKey={"name"}
                          onSelected={game => console.log(game)}
                />
            </div>
        )
    }
}