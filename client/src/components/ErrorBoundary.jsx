import { Component } from 'react'

const styles = {
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
}

export default class ErrorBoundary extends Component {
  state = { err: undefined }

  static getDerivedStateFromError(error) {
    return { err: error }
  }

  componentDidCatch(error) {
    this.setState({ err: error })
  }

  render() {
    if (this.state.err) {
      return <div style={styles}>Error catched: {this.state.err.message}</div>
    }

    return this.props.children
  }
}
