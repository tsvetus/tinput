import React from 'react'
import PropTypes from 'prop-types'

import { merge, contain } from '../../util'

import { styles } from '../../styles'

/**
 * Groups components in a single block
 */
class TGroup extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleLabel = this.handleLabel.bind(this)
  }

  handleClick(event) {
    if (this.props.onClick)
      this.props.onClick({
        name: this.props.name,
        data: this.props.data,
        preventDefault: event.preventDefault,
        stopPropagation: event.stopPropagation
      })
  }

  handleLabel(event) {
    if (this.props.onLabel) {
      event.preventDefault()
      event.stopPropagation()
      this.props.onLabel({
        name: this.props.name,
        data: this.props.data,
        preventDefault: event.preventDefault,
        stopPropagation: event.stopPropagation
      })
    }
  }

  render() {
    let style = merge(
      { label: styles.TComponent.label },
      styles.TGroup,
      contain(styles[this.props.name]),
      contain(this.props.style)
    )

    let label = null
    if (this.props.label) {
      const labelStyle = this.props.onLabel
        ? merge(style.label, { cursor: 'pointer' })
        : style.label
      label = (
        <div style={labelStyle} onClick={this.handleLabel}>
          {this.props.label}
        </div>
      )
    }

    return (
      <div style={style.container} onClick={this.handleClick}>
        {label}
        <div style={style.content}>{this.props.children}</div>
      </div>
    )
  }
}

TGroup.propTypes = {
  /** Component style: */
  style: PropTypes.shape({
    /** Style for outer component container */
    container: PropTypes.object,
    /** Style for component label */
    label: PropTypes.object,
    /**
     * Style for group content. By default content is a "flex box" so it is possible to use
     * "flex" styles without specifying "display: 'flex'" in "content" section
     */
    content: PropTypes.object
  }),
  /** Label caption. Default is undefined and label is hidden */
  label: PropTypes.string,
  /** Component name */
  name: PropTypes.string,
  /** Component data */
  data: PropTypes.any,
  /** On click event */
  onClick: PropTypes.func,
  /** On click event */
  onLabel: PropTypes.func
}

export default TGroup
