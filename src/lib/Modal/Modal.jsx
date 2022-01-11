import React from 'react'
import PropTypes from 'prop-types'

import { merge, seconds, contain, compare, apply, replace } from '../../util'
import { Icon } from '../../lib'

import { styles } from '../../styles'

function getStyle(props, show) {
  let style = merge(
    contain(styles.TModal),
    contain(styles[props.name]),
    contain(props.style)
  )
  style = replace(style, 'transition', props.transition)
  if (!show) {
    style = merge(style, styles.TModal.hidden)
  }
  return style
}

const ICON_CLOSE = 'close'

class Modal extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {
      show: false,
      countdown: 0
    }
    this.style = getStyle(props, false)
    this.event = new CustomEvent('showModal', {})
    this.screenRef = React.createRef()
    this.containerRef = React.createRef()
    this.contentRef = React.createRef()
    this.stepCountdown = this.stepCountdown.bind(this)
    this.startCountdown = this.startCountdown.bind(this)
    this.stopCountdown = this.stopCountdown.bind(this)
    this.showModal = this.showModal.bind(this)
    this.updateStyle = this.updateStyle.bind(this)
    this.position = this.position.bind(this)
    this.close = this.close.bind(this)
    this.screenClick = this.screenClick.bind(this)
    this.containerClick = this.containerClick.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    document.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('resize', this.handleResize)
    this.showModal(this.props.show)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.show !== this.state.show && this.state.show) {
      setTimeout(() => {
        this.updateStyle(getStyle(this.props, true))
        this.startCountdown()
        document.dispatchEvent(this.event)
      }, 0)
    }
    if (prevProps.show !== this.props.show) {
      this.showModal(this.props.show)
    }
    this.position()
  }

  componentWillUnmount() {
    this.mounted = false
    clearTimeout(this.showTimer)
    clearTimeout(this.countdownTimer)
    document.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('resize', this.handleResize)
    delete this.event
  }

  showModal(show) {
    if (show) {
      this.setState({ show: true })
    } else {
      this.updateStyle(getStyle(this.props, false))
      this.showTimer = setTimeout(() => {
        if (this.mounted) {
          this.setState({ show: false })
        }
      }, this.props.transition)
    }
  }

  position() {
    if (this.containerRef.current && this.props.show) {
      let rect = this.containerRef.current.getBoundingClientRect()
      let margin = this.props.margin
      let winHeight = window.innerHeight - margin * 2
      let conHeight = rect.height
      let top = margin
      if (conHeight < winHeight) {
        top = margin + Math.ceil((winHeight - conHeight) / 2)
        this.containerRef.current.style.height = this.style.container.height
        this.contentRef.current.style.height = this.style.content.height
        this.contentRef.current.style.overflowY = this.style.content.overflowY
      } else {
        if (this.props.fitHeight) {
          this.containerRef.current.style.height = winHeight + 'px'
          this.contentRef.current.style.height = '100%'
          this.contentRef.current.style.overflowY = 'auto'
        }
      }
      this.containerRef.current.style.top = top + 'px'
    }
  }

  updateStyle(style) {
    apply(this.style.screen, style.screen, this.screenRef.current.style)
    apply(
      this.style.container,
      style.container,
      this.containerRef.current.style
    )
    this.position()
    this.style = style
  }

  close() {
    this.stopCountdown()
    if (this.props.onClose) {
      this.props.onClose({
        name: this.props.name,
        data: this.props.data,
        button: ICON_CLOSE
      })
    }
    this.showModal(false)
  }

  stepCountdown() {
    clearTimeout(this.countdownTimer)
    if (this.state.countdown > 0) {
      this.countdownTimer = setTimeout(() => {
        if (this.mounted) {
          this.setState({ countdown: this.state.countdown - 1 })
          this.stepCountdown()
        }
      }, 1000)
    } else {
      this.close()
    }
  }

  startCountdown() {
    if (this.mounted && this.props.show && this.props.countdown) {
      let countdown = this.props.countdown
      if (isNaN(countdown)) {
        countdown = seconds(countdown)
      }
      if (countdown > 0) {
        clearTimeout(this.countdownTimer)
        this.setState({ countdown: countdown })
        this.stepCountdown()
      }
    }
  }

  stopCountdown() {
    clearTimeout(this.countdownTimer)
    if (this.mounted) {
      this.setState({ countdown: 0 })
    }
  }

  screenClick() {
    if (this.props.show && this.props.outerClick) {
      this.close()
    }
  }

  containerClick(event) {
    if (this.props.show && this.props.outerClick) {
      event.stopPropagation()
    }
  }

  handleCancel() {
    this.close()
  }

  handleKeyDown(event) {
    if (event.key === 'Escape' && this.props.show && this.props.escape) {
      this.close()
    }
  }

  handleResize() {
    if (this.state.show) {
      this.position()
    }
  }

  render() {
    let show = !this.state.show ? { screen: { display: 'none' } } : {}
    let style = merge(this.style, show)

    let header = this.props.showHeader ? (
      <div style={style.header}>
        {this.state.countdown > 0 ? (
          <div style={style.timer}>{this.state.countdown}</div>
        ) : (
          <div></div>
        )}
        <div style={style.caption}>{this.props.caption}</div>
        <Icon
          style={contain(style.close)}
          name={ICON_CLOSE}
          onClick={this.handleCancel}
        />
      </div>
    ) : null

    let title = this.props.titleContent ? (
      <div style={style.title}>{this.props.titleContent}</div>
    ) : null

    let content = this.props.children ? (
      <div style={style.content} ref={this.contentRef}>
        {this.props.children}
      </div>
    ) : null

    let footer = this.props.footerContent ? (
      <div style={style.footer}>{this.props.footerContent}</div>
    ) : null

    return (
      <div style={style.screen} ref={this.screenRef} onClick={this.screenClick}>
        <div
          style={style.container}
          ref={this.containerRef}
          onClick={this.containerClick}>
          {header}
          {title}
          {content}
          {footer}
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
  data: PropTypes.any,
  show: PropTypes.any,
  countdown: PropTypes.any,
  caption: PropTypes.string,
  showHeader: PropTypes.any,
  escape: PropTypes.any,
  outerClick: PropTypes.any,
  transition: PropTypes.number,
  titleContent: PropTypes.any,
  footerContent: PropTypes.any,
  fitHeight: PropTypes.any,
  margin: PropTypes.number,
  onClose: PropTypes.func.isRequired
}

Modal.defaultProps = {
  showHeader: true,
  escape: false,
  outerClick: false,
  transition: 250,
  fitHeight: false,
  margin: 8
}

export default Modal
