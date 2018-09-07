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
    this.cardRef = React.createRef();
    this[props.code] = React.createRef();
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

  shouldAnimateOff = ({ old, current }) => {
    const { table: oldTable } = old;
    const { table: newTable, code } = current;
    const codeInOldTable = oldTable.map(card => card.code).includes(code);
    const isNewTableEmpty = newTable.length === 0;

    return isNewTableEmpty && codeInOldTable;
  }

  animateCard = () => {
    const { center, playerId } = this.props;
    const cardHeight = this.cardRef.current.height;
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
  }

  // Todo: animate off towards the round winner
  animateCardOff = () => {
    this.setState({
      // cardStatus: 'player-card animate',
      styling: {
        left: 400,
        top: 100,
      },
    });
  }

  handleClick = () => {
    const {
      playerId, playRounds, addCardToTable, value, code,
    } = this.props;

    // Todo: refactor this
    const humanPlays = true;

    if ((playerId !== 0) || !humanPlays) {
      return;
    }

    playRounds();
    addCardToTable({ playerId, value, code });
  }

  render() {
    const { alt, src } = this.props;
    const { cardStatus, height, styling } = this.state;

    const styles = {
      container: {
        height,
        ...styling,
      },
    };

    return (
      <img
        ref={this.cardRef}
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
