import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends React.Component {
  static propTypes = {
    playerId: PropTypes.number.isRequired,
    center: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.cardRef = React.createRef();
  }

  state = {
    cardStatus: 'player-card',
    styling: {},
    height: 50,
  }

  calculateTablePosition = ({ playerId, cardHeight }) => {
    switch (playerId) {
      case 0:
        return {
          left: 0,
          top: cardHeight,
        };
      case 1:
        return {
          left: -cardHeight,
          top: 0,
        };
      case 2:
        return {
          left: 0,
          top: -cardHeight,
        };
      case 3:
        return {
          left: cardHeight,
          top: 0,
        };
      default:
        return {
          left: 0,
          top: 0,
        };
    }
  }

  animateCard = () => {
    const { center, playerId } = this.props;
    const cardHeight = this.cardRef.current.height;
    const { top, left } = this.calculateTablePosition({ playerId, cardHeight });

    this.setState({
      // cardStatus: 'player-card animate',

      styling: {
        position: 'absolute',
        left: center.centerX + left,
        top: center.centerY + top,
        // left: 0,
        // top: 0,
        zIndex: 1000,
      },
    });
    // const { center } = this.props;
    // const styles = {
    //   // top: center.centerX, left: center.centerY
    //   // display: 'none',
    //   // width: '400px',
    //   height: 200,
    // };
    // console.warn(styles)
    // this.setState = ({
    //   styles,
    // });
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
        onClick={this.animateCard}
        style={styles.container}
      />
    );
  }
}

export default Card;
