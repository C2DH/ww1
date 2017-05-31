import React from 'react';
import { Card, CardImg, CardText, CardBlock,
  CardSubtitle } from 'reactstrap';
import './ManualCard.css'

  const ManualCard = (props) => {
    return (
      <div>
        <Card className="ManualCard__Card">
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" className="ManualCard__CardImg" />
          <CardBlock>
            <CardSubtitle>Card title</CardSubtitle>
            <CardText>Some quick example text to build on the card title.</CardText>
          </CardBlock>
        </Card>
      </div>
    );
  };

  export default ManualCard;
