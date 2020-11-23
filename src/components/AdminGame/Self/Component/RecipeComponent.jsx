import React from "react";
import List from "../../../Common/Lists/List";
import AdminRecipeListItem from "../../../ListItem/AdminRecipeListItem";
import RecipeForm from "../Form/RecipeForm";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false
        }
    }

    render() {
        return (
            <div>
                <List title={"Формулы крафта:"}
                      isAddButtonVisible={!this.state.formVisible}
                      onAddClicked={() => this.setState({formVisible: true})}
                      values={this.props.recipes.map(recipe =>
                          <AdminRecipeListItem recipe={recipe}
                                               onDelete={() => this.props.onDeleteRecipe(recipe)}
                          />
                      )}
                />
                {
                    this.state.formVisible &&
                    <RecipeForm onSubmit={form => {
                        this.setState({formVisible: false})
                        this.props.onAddRecipe(form)
                    }}/>
                }
            </div>
        )
    }
}