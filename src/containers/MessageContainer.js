import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageBoard from '../components/MessageBoard';

class MessageContainer extends Component {
  constructor(props){
    super(props);
    this.renderMessages = this.renderMessages.bind(this);
  }
  renderMessages(){
    let messages = this.props.messages.split(/[ ]{2,}/).filter(x => x !== "");
    return(
      messages.map((message,idx) => {
        return <MessageBoard key={idx} message={message} />
      })
    )
  }
  render(){
    return(
      <div>
        {this.renderMessages()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.mapGenerated.message
  };
}

export default connect(mapStateToProps)(MessageContainer)
