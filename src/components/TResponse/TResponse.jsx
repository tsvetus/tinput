import React from 'react'
import PropTypes from 'prop-types'

import { merge, contain } from '../../util'

import { styles } from '../../styles'

import TButton from '../TButton'
import TLoad from '../TLoad'

class TResponse extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    if (this.props.onClose) {
      this.props.onClose({
        name: this.props.name,
        data: this.props.data,
        message: this.props.message,
        error: this.props.error
      })
    }
  }

  render() {
    let style = merge(
      contain(styles.TResponse),
      contain(styles[this.props.name]),
      contain(this.props.style)
    )

    let content = null
    //        if (this.props.children) {
    if (this.props.error || this.props.message) {
      content = (
        <TButton style={style.button} onClick={this.handleClick}>
          {'OK'}
        </TButton>
      )
    } else if (this.props.wait) {
      content = <TLoad inline={true} show={true} />
    } else {
      content = this.props.children
    }
    //        }

    let error = this.props.error ? (
      <div
        style={style.error}
        dangerouslySetInnerHTML={{ __html: this.props.error }}></div>
    ) : null

    let message = this.props.message ? (
      <div
        style={style.message}
        dangerouslySetInnerHTML={{ __html: this.props.message }}></div>
    ) : null

    return (
      <div style={style.container}>
        {error}
        {message}
        {content}
      </div>
    )
  }
}

TResponse.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
  data: PropTypes.any,
  error: PropTypes.string,
  message: PropTypes.string,
  wait: PropTypes.any,
  onClose: PropTypes.func
}

export default TResponse
