import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { calculateTablePosition } from '../../../helpers/roundHelpers';

class Card extends React.Component {
  static propTypes = {
    playerId: PropTypes.number.isRequired,
    center: PropTypes.object.isRequired,
    addCardToTable: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    playRounds: PropTypes.func.isRequired,
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    // this.cardRef = React.createRef();
    // this[props.code] = React.createRef();
  }

  state = {
    cardStatus: 'player-card',
    styling: {},
    height: 50,
  }

  componentDidUpdate(prevProps) {
    if (this.shouldAnimateCard({ old: prevProps, current: this.props })) {
      this.animateCard();
    }

    if (this.shouldAnimateOff({ old: prevProps, current: this.props })) {
      this.animateCardOff();
    }
  }

  shouldAnimateCard = ({ old, current }) => {
    const { table: oldTable } = old;
    const { table: newTable, code } = current;
    const codeInOldTable = oldTable.map(card => card.code).includes(code);
    const codeInNewTable = newTable.map(card => card.code).includes(code);

    return codeInNewTable && !codeInOldTable;
  }

  shouldAnimateOff = ({ old, current }) => {}

  animateCard = () => {
    const {
      center, playerId, reference,
    } = this.props;
    // const cardHeight = this.cardRef.current.height;
    const cardHeight = reference.current.height;

    const { top, left } = calculateTablePosition({ playerId, cardHeight });

    this.setState({
      // cardStatus: 'player-card animate',
      styling: {
        position: 'absolute',
        left: center.centerX + left,
        top: center.centerY + top,
        zIndex: 1000,
      },
    });

    // // Todo: move to parent and to clickHandler
    // addCardToTable({ playerId, value });
  }

  animateCardOff = () => {}

  handleClick = () => {
    const {
      playerId, playRounds, addCardToTable, value, code,
    } = this.props;

    // Todo: refactor this
    const humanPlays = true;

    if ((playerId !== 0) || !humanPlays) {
      // Todo: uncomment this after implement computner play
      // return;
    }

    addCardToTable({ playerId, value, code });
    playRounds();
  }

  render() {
    const { alt, src, propStyles } = this.props;
    const { cardStatus, height, styling } = this.state;

    const styles = {
      container: {
        height,
        ...styling,
      },
    };

    return (
      <img
        ref={this.props.reference}
        className={cardStatus}
        alt={alt}
        src={src}
        onClick={this.handleClick}
        style={styles.container}
      />
    );
  }
}

export default Card;
