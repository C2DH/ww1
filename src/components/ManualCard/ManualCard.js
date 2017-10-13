import React from 'react';
import { Card, CardImg, CardText, CardBlock, CardSubtitle } from 'reactstrap';
import './ManualCard.css'

  const ManualCard = ({ title, image, onClick }) => {
    return (
        <Card className="ManualCard__Card" onClick={onClick}>
          <div className="ManualCard__CardImg" style={{backgroundImage: `url(${image})`}}>

          </div>
          <CardBlock>
            <CardText>{title}</CardText>
          </CardBlock>
        </Card>
    );
  };

  export default ManualCard;
