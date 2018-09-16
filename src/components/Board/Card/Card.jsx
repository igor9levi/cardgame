import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import { calculateTablePosition, cardMoveDirection } from '../../../helpers/roundHelpers';
import back from '../../../img/hoyleback.jpg';
import { pause } from '../../../helpers/animationHelpers';

class Card extends React.Component {
  static propTypes = {
    playerId: PropTypes.number.isRequired,
    winner: PropTypes.number,
    center: PropTypes.object.isRequired,
    addCardToTable: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    playRounds: PropTypes.func.isRequired,
    // flushTable: PropTypes.func,
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
      cardImageStyle: 'f1_card',
      animate: 'f1_container',
      flip: false,
      centered: false,
      // flush: false,
    };
    this.flush = false;
    this.counter = 0;
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.flush === false && prevState.flush === true) return;

    if (this.flush) {
      this.flush = false;
      this.counter += 1;

      console.warn('removing card...', this.props.code);
      setTimeout(() => {
        if (this.props.table !== 0) {
          if (this.counter === 1) {
            this.props.removeCard(this.props.code);
          }
        }
      }, 4000);

      return;
    }

    if (this.shouldRotateCard({ old: prevProps, current: this.props })) {
      console.warn('componentDidUpdate: rotating card...', this.props.code);
      return this.rotateCard();
    }

    if (this.shouldAnimateCard({ old: prevState, current: this.state })) {
      console.warn('componentDidUpdate: animating card...', this.props.code);
      return this.startAnimateCard();
    }

    if (this.isCentered({ old: prevState, current: this.state })) {
      console.warn('componentDidUpdate: CENTERED...', this.props.code, this.props.playerId);
      this.playNextCard();
    }

    if (this.shouldAnimateOff({ old: prevProps, current: this.props })) {
      console.log('animate OFF...', this.props.code);
      return this.animateCardOff();
    }
  }

  shouldAnimateCard = ({ old, current }) => {
    const { flip: oldFlip } = old;
    const { flip: newFlip } = current;

    const should = ((oldFlip !== newFlip) && (newFlip === true));
    return should;
  }

  shouldRotateCard = ({ old, current }) => {
    const { table: oldTable } = old;
    const { table: newTable, code } = current;
    const codeInOldTable = oldTable.map(card => card.code).includes(code);
    const codeInNewTable = newTable.map(card => card.code).includes(code);

    return codeInNewTable && !codeInOldTable;
  }

  isCentered = ({ old, current }) => {
    const { centered: oldCentered } = old;
    const { centered: newCentered } = current;

    return ((oldCentered !== newCentered) && (newCentered === true));
  }

  shouldAnimateOff = ({ old, current }) => {
    const { winner, table, code } = current;
    const cardIsInTable = table.map(card => card.code).includes(code);
    const result = cardIsInTable && (winner !== null) && (table.length > 0) && !this.flush;

    // console.warn(result, this.props.flushTable);
    return result;
    // const { table: oldTable } = old;
    // const { table: newTable, code } = current;
    // const codeInOldTable = oldTable.map(card => card.code).includes(code);
    // const isNewTableEmpty = newTable.length === 0;
    //
    // return isNewTableEmpty && codeInOldTable;
  }

  startAnimateCard = async () => {
    await pause(500);
    this.animateCard();
  }

  rotateCard = () => this.setState({ flip: true })

  animateCard = () => {
    const { center, playerId } = this.props;
    const cardHeight = this.cardRef.current.height;
    const { top, left } = calculateTablePosition({ playerId, cardHeight });
    const direction = cardMoveDirection({ playerId });

    const leftPosition = center.centerX + left;
    const topPosition =  center.centerY + top;

    this.setState({
      centered: true,
      styling: {
        position: 'absolute',
        left: leftPosition,
        top: topPosition,
      },
    });
  }

  playNextCard = async () => {
    await pause(1000);
    this.props.animationFinished();
  }

  // Todo: animate off towards the round winner
  animateCardOff = () => {
    const { winner } = this.props;
    const direction = cardMoveDirection({ playerId: winner });
    console.warn('animating off ', direction);
    this.flush = true;
    this.setState({
      // cardStatus: 'player-card animate',
      // flush: true,
      styling: {
        left: 550,
        top: 50,
      },
    });
  }

  handleClick = () => {
    const {
      playerId, playRounds, addCardToTable, value, code, blockClick,
    } = this.props;

    if ((playerId !== 0) || blockClick) {
      return;
    }

    playRounds();
    addCardToTable({ playerId, value, code });
  }

  isHumanPlayer = () => this.props.playerId === 0;

  renderCardOld = ({ src, alt }) => {
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
      <div className={this.state.cardImageStyle}>
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
    return this.state.flip
      ? (
        <img
          src={src}
          alt={alt}
          className="img"
        />
      )
      : (
        <img
          src={back}
          alt="back of card"
          className="img"
        />
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
      <div className={this.state.animate} style={this.state.styling} onClick={this.handleClick} ref={this.cardRef}>
        {this.renderCard({ src, alt })}
      </div>
    );
  }
}

export default Card;
