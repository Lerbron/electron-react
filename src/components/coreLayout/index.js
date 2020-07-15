import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import {connect} from 'react-redux';

// import PageLoading from './pageLoading'



class CoreLayout extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <Route path="/" render={props => {
        return (                  
          <Fragment>{this.props.children}</Fragment>        
        )
      }} />
    )
  }

  
  
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
