import React from 'react';
import './Card.css';

class Card extends React.Component {
  state = {
    cardStatus: 'player-card',
    styling: {},
    height: 50,
  }

  calculateTablePosition = playerId => {
    switch (playerId) {
      case 0:
        return {
          left: 0,
          top: 50,
        };
      case 1:
        return {
          left: -50,
          top: 0,
        };
      case 2:
        return {
          left: 0,
          top: -50,
        };
      case 3:
        return {
          left: 50,
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
    const { top, left } = this.calculateTablePosition(playerId)

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
