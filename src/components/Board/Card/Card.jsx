import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { calculateTablePosition, cardMoveDirection } from '../../../helpers/roundHelpers';
import back from '../../../img/hoyleback.jpg';

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
    blockClick: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.cardRef = React.createRef();
    this[props.code] = React.createRef();

    this.state = {
      cardStatus: 'player-card',
      styling: {},
      height: 50,
      displayBack: props.playerId !== 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.shouldAnimateCard({ old: prevProps, current: this.props })) {
      setTimeout(() => this.animateCard, 2000);
      // this.animateCard();
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
    const direction = cardMoveDirection({ playerId });

    if (playerId !== 0) {
      this.flipCard();
    }

    this.setState({
      displayBack: false,
      // cardStatus: `player-card ${direction}-center`,
      // styling: {
      //   position: 'absolute',
      //   left: center.centerX + left,
      //   top: center.centerY + top,
      //   zIndex: 1000,
      // },
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

  flipCard = () => {
    this.setState({
      displayBack: false,
    });
  }

  handleClick = () => {
    const {
      playerId, playRounds, addCardToTable, value, code, blockClick,
    } = this.props;

    if ((playerId !== 0) || blockClick) {
      return;
    }

    setTimeout(() => {
      playRounds();
      addCardToTable({ playerId, value, code });
    }, 2000);
  }

  isHumanPlayer = () => this.props.playerId === 0;

  renderCard = ({ src, alt }) => {
    if (this.isHumanPlayer()) {
      return (
        <div className="front face">
          <img
            src={src}
            alt={alt}
            className="card-front img"
          />
        </div>
      );
    }
    return (
      <div className="f1_card">
        <div className="front face">
          <img
            src={back}
            alt="back of card"
            className="card-back img"
          />
        </div>
        <div className="back face center">
          <img
            src={src}
            alt={alt}
            className="card-front img"
          />
        </div>
      </div>
    );
  }

  render() {
    const { alt, src } = this.props;
    const {
      cardStatus, height, styling, displayBack,
    } = this.state;

    // Todo: set responsive height
    const styles = {
      container: {
        height,
        ...styling,
      },
    };
    //
    // // Todo add div wrapper flex: 1, and w, h 100% on image
    // return (
    //   <div>
    //
    //   <img
    //     ref={this.cardRef}
    //     className={cardStatus}
    //     // alt={alt}
    //     src={displayBack ? back : src}
    //     onClick={this.handleClick}
    //     // style={styles.container}
    //   />
    //   </div>
    // );

    return (
      <div className="f1_container" onClick={this.handleClick}>
        {this.renderCard({ src, alt })}
      </div>
    );
  }
}

export default Card;
