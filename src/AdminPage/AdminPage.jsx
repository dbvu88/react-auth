import React from "react";

import { userService } from "@/_services";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.setState = {
      user: null
    };
  }

  componentDidMount() {
    userService.getAll().then(users => this.setState({ users }));
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <p>This page is for admin only</p>

        <div>
          All users:
          {users && (
            <ul>
              {users.map(user => (
                <li key={user.id}>
                  {user.firstName} {user.lastName}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export { AdminPage };
