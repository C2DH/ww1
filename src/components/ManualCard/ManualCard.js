import React from 'react';
import { Card, CardImg, CardText, CardBlock, CardSubtitle } from 'reactstrap';
import './ManualCard.css'

  const ManualCard = (props) => {
    return (
        <Card className="ManualCard__Card">
          <div className="ManualCard__CardImg" style={{backgroundImage: "url(http://178.62.220.183/media/image/snapshots/kK2zbsr.snapshot.png)"}}>

          </div>
          <CardBlock>
            <CardSubtitle>{props.theme}</CardSubtitle>
            <CardText>{props.title}</CardText>
          </CardBlock>
        </Card>
    );
  };

  export default ManualCard;
