import React from 'react';
import './Card.css';

class Card extends React.Component {
  state = {
    cardStatus: 'player-card',
  }

  animateCard = () => {
    this.setState({
      cardStatus: 'player-card animate',
    });
  }

  render() {
    const { alt, src } = this.props;
    const { cardStatus } = this.state;

    return (
      <img
        className={cardStatus}
        alt={alt}
        src={src}
        onClick={this.animateCard}
      />
    );
  }
}

export default Card;
