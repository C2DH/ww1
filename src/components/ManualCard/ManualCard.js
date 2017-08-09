import React from 'react';
import { Card, CardImg, CardText, CardBlock, CardSubtitle } from 'reactstrap';
import './ManualCard.css'

  const ManualCard = (props) => {
    return (
        <Card className="ManualCard__Card">
          <div className="ManualCard__CardImg" style={{backgroundImage: "url(https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180)"}}>

          </div>
          <CardBlock>
            <CardSubtitle>{props.theme}</CardSubtitle>
            <CardText>{props.title}</CardText>
          </CardBlock>
        </Card>
    );
  };

  export default ManualCard;
