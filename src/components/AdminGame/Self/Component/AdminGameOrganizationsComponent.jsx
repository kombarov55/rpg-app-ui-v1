import React from "react";
import FormMode from "../../../../data-layer/enums/FormMode";
import List from "../../../Common/Lists/List";
import AdminGameOrganizationListItem from "../../../ListItem/AdminGameOrganizationListItem";
import OrganizationForm from "../../../MyGames/Organization/Form/OrganizationForm";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            form: null,
            formMode: FormMode.CREATE
        }
    }

    render() {
        return (
            <div>
                <List title={"Организации"}
                      isAddButtonVisible={!this.state.formVisible}
                      onAddClicked={() => this.setState({
                          formVisible: true,
                          formMode: FormMode.CREATE
                      })}
                      values={this.props.organizations.map(organization =>
                          <AdminGameOrganizationListItem organization={organization}
                                                         onEditClicked={() => {
                                                             this.setState({
                                                                 formVisible: true,
                                                                 formMode: FormMode.EDIT,
                                                                 form: organization
                                                             })
                                                         }}
                                                         onDeleteClicked={() => this.props.onDeleteOrganization(organization)}
                                                         onDetailsClicked={() => this.props.onOrganizationDetailsClicked(organization)}
                          />
                      )}
                />
                {
                    this.state.formVisible &&
                    (this.state.formMode === FormMode.CREATE ?
                        <OrganizationForm onSubmit={form => {
                            this.setState({formVisible: false})
                            this.props.onAddOrganization(form)
                        }}/> :
                        <OrganizationForm initialState={this.state.form}
                                          onSubmit={form => {
                                              this.setState({formVisible: false})
                                              this.props.onEditOrganization(form)
                                          }}
                        />)
                }
            </div>
        )
    }
}