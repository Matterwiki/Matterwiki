import React from 'react';
import {Link} from 'react-router';
import Loader from 'Loader/loader.jsx';

class ListUsers extends React.Component {

  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);

  }

  deleteUser(id,e) {

    e.preventDefault();

    this.props.deleteUser(id);

  }


  render () {

    if(this.props.loading)

      return <Loader />

    else

      return(
        <div className="users">
          <div className="list-group bordered-scroll-box">
              {
                this.props.users.map(user => (
                <div key={user.id} href="#" className="list-group-item">
                  <span className="pull-right">
                    <Link to={'user/edit/'+user.id} className="btn btn-default">Edit</Link>
                    {
                      (user.id!=1) ?
                        <button className="btn btn-default" type="button"onClick={(e) => this.deleteUser(user.id,e)}>Delete</button>
                      : ''
                    }
                  </span>
                  <h4 className="list-group-item-heading">{decodeURIComponent(user.name)}</h4>
                  <p className="list-group-item-text">{decodeURIComponent(user.about)}</p>
                </div>
                ))}
            </div>
        </div>);
  }
}

export default ListUsers;
