import React, { PureComponent } from 'react'
import { Tooltip } from 'reactstrap'
import './WhiteTooltip.css'


 class WhiteTooltip extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const {target="", tooltipText } = this.props
    return (
      <div>
        <Tooltip placement="top right" isOpen={this.state.tooltipOpen} target={target} toggle={this.toggle} className="WhiteTooltip__tooltip">
          {tooltipText}
        </Tooltip>
      </div>
    );
  }
}

export default WhiteTooltip
