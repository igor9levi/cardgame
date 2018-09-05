import React from 'react';
import './Card.css';

class Card extends React.Component {
  render() {
    const { alt, src } = this.props;

    return (
      <img
        className="player-card"
        alt={alt}
        src={src}
      />
    );
  }
}

export default Card;
