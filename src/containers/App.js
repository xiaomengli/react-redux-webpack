import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class App extends React.PureComponent {
  state = {
  }

  componentDidMount = () => {
  }

  componentWillReceiveProps = (nextProps) => {
  }

  render = () => (
    <div>
      Show app main content {this.props.user ? this.props.user.name : ''}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.auth.get('user')
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)