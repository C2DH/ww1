import React from 'react'
import { Button, Popover, PopoverTitle, PopoverContent, ButtonGroup, ButtonToolbar, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { v4 } from 'uuid'
import './CollectionItemDownload.css'



export default class CollectionItemDownload extends React.PureComponent {

  state = {
    popoverOpen : false
  }

  togglePopover = (e) => {
    this.setState({ popoverOpen: !this.state.popoverOpen })
  }

  handleDownload = (withMeta) => (e) => {

    const { doc } = this.props
    console.log("downloading, meta:", withMeta, doc)
    if(withMeta){

    }
    this.togglePopover()
  }

  render(){
    const { doc, className } = this.props
    const buttonId = `CollectionItemDownload-${v4()}`

    if(!doc){ return null }
    return (

      <button className={className}
        id={buttonId}
        className={className} onClick={this.togglePopover}>
        <i className="icon-file_download" />
        <Popover placement={'top'} isOpen={this.state.popoverOpen} target={buttonId}>
          <PopoverContent>
            <ButtonToolbar>
            <ButtonGroup vertical>
              <Button className="CollectionItemDownload__button" onClick={this.handleDownload(true)} href={`/api/document/${doc.id}/download/`} download target="_blank">Download file and data</Button>
              <Button className="CollectionItemDownload__button" onClick={this.handleDownload(false)} href={`${doc.attachment}`} download target="_blank">Download file only</Button>
            </ButtonGroup>
            </ButtonToolbar>
          </PopoverContent>
        </Popover>
      </button>

    )
  }

}
