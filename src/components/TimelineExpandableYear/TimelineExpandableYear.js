import React, { PureComponent } from 'react'
import './TimelineExpandableYear.css'

class TimelineExpandableYear extends PureComponent {

   state = {
     open:false
   }

   toggleExpand = () => {
     this.setState({
       open: !this.state.open
     })
   }
   render() {
    return (
      <div className="TimelineExpandableYear__container">
        1914
      </div>
    )
   }
}



export default TimelineExpandableYear
