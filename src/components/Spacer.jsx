// Spacer
import React from 'react'

export default class Spacer extends React.Component {
  render () {
    const styles = {
      marginTop: this.props.top,
      marginBottom: this.props.bottom,
      marginLeft: this.props.left,
      marginRight: this.props.right
    }

    return (
      <div style={styles}></div>
    )
  }
}
