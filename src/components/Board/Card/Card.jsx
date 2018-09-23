import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { calculateTablePosition, cardMoveDirection } from '../../../helpers/roundHelpers';
import BACK from '../../../img/hoyleback1.jpg';
import * as animation from '../../../helpers/animationHelpers';
import { HUMAN_PLAYER_ID } from '../../App/appConstants';

class Card extends React.Component {
  static propTypes = {
    playerId: PropTypes.number.isRequired,
    winner: PropTypes.number,
    center: PropTypes.shape({
      centerX: PropTypes.number,
      centerY: PropTypes.number,
    }).isRequired,
    addCardToTable: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    blockClick: PropTypes.func.isRequired,
    block: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    winner: null,
  }

  constructor(props) {
    super(props);
    this.cardRef = React.createRef();
    this[props.code] = React.createRef();

    this.state = {
      styling: {},
      flip: false,
      centered: false,
      flush: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { flush } = this.state;

    if (flush) {
      return this.removeCard();
    }

    if (animation.shouldRotateCard({ old: prevProps, current: this.props })) {
      return this.rotateCard();
    }

    if (animation.shouldAnimateCard({ old: prevState, current: this.state })) {
      return this.animateCard();
    }

    if (animation.isCentered({ old: prevState, current: this.state })) {
      return this.playNextCard();
    }

    if (animation.shouldAnimateOff({ old: prevProps, current: this.props })) {
      return this.animateCardOff();
    }
  }

  removeCard = async () => {
    const { removeCard, code } = this.props;
    await animation.pause(200);
    return removeCard(code);
  }

  rotateCard = () => this.setState({ flip: true })

  animateCard = async () => {
    const { center, playerId } = this.props;
    const cardHeight = this.cardRef.current.height;
    const { top, left } = calculateTablePosition({ playerId, cardHeight });

    const leftPosition = center.centerX + left;
    const topPosition = center.centerY + top;

    await animation.pause(300);

    this.setState({
      centered: true,
      styling: {
        position: 'absolute',
        transitionDuration: '0.5s',
        left: leftPosition,
        top: topPosition,
      },
    });
  }

  animateCardOff = () => {
    const { winner, center } = this.props;
    const { left = 0, top = 0 } = cardMoveDirection({ playerId: winner, left: center.centerX, top: center.centerY });

    this.setState({
      flush: true,
      styling: {
        position: 'absolute',
        transitionDuration: '0.5s',
        left,
        top,
      },
    });
  }

  playNextCard = async () => {
    const { animationFinished } = this.props;
    await animation.pause(200);
    animationFinished();
  }

  handleClick = () => {
    const {
      playerId, addCardToTable, value, code, block,
    } = this.props;

    if ((playerId !== HUMAN_PLAYER_ID) || block) {
      return;
    }

    this.props.blockClick();
    addCardToTable({ playerId, value, code });
  }

  renderCard = ({ src, alt }) => {
    const { playerId } = this.props;
    const { flip } = this.state;
    const source = ((playerId === HUMAN_PLAYER_ID) || flip) ? src : BACK;

    return (
      <img
        src={source}
        alt={alt}
        className="img"
      />
    );
  }

  render() {
    const { alt, src } = this.props;
    const {
      styling,
    } = this.state;

    return (
      <div className="container" style={styling} onClick={this.handleClick} ref={this.cardRef}>
        {this.renderCard({ src, alt })}
      </div>
    );
  }
}

export default Card;
