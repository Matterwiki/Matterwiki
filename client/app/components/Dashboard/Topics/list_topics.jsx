import React from 'react';
import {Link} from 'react-router';
import Loader from 'Loader/loader.jsx';

class ListTopics extends React.Component {

  constructor(props) {
    super(props);

    this.deleteTopic = this.deleteTopic.bind(this);

  }

  deleteTopic(id,e) {

    e.preventDefault();

    this.props.deleteTopic(id);

  }


  render () {

    if(this.props.loading)

      return <Loader />

    else

      return(
        <div className="topics">
          <div className="row container">
            <div className="col-md-12">
                <div className="list-group bordered-scroll-box">
                    {
                      this.props.topics.map(topic => (
                          <div key={topic.id} href="#" className="list-group-item">
                            <span className="pull-right">
                              <Link to={'topic/edit/'+topic.id} className="btn btn-default">Edit</Link>
                              {
                                (topic.id !== 1)?
                                <button className="btn btn-default" type="button" onClick={(e) => this.deleteTopic(topic.id,e)}>Delete</button>
                                : ''
                              }
                             </span>
                            <h4 className="list-group-item-heading">{decodeURIComponent(topic.name)}</h4>
                            <p className="list-group-item-text">{decodeURIComponent(topic.description)}</p>
                          </div>
                        ))
                    }
                </div>
            </div>
          </div>
        </div>);
  }
}

export default ListTopics;
