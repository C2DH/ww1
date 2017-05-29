import React from 'react'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import './MapSearchInput.css'

const MapSearchInput = () => (
  <div>
    <InputGroup>
      <InputGroupAddon className="MapSearchInput__InputGroupAddon"><i className="icon-search MapSearchInput__icon-search" /></InputGroupAddon>
      <Input className="MapSearchInput__Input" placeholder="Search here (e.g: postcards)" />
    </InputGroup>
  </div>
)

export default MapSearchInput
