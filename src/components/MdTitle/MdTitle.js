import React, { PureComponent } from 'react'
import Markdown from 'markdown-to-jsx';

class MdTitle extends PureComponent {

  render(){
    const MyTitle = ({children, ...props}) => (<span {...props}>{children}</span>);
    const mdOption = {
              overrides: {
                  p: {
                      component: MyTitle
                  },
              },
          }

    return(
      <Markdown options={mdOption}>{this.props.title || ''}</Markdown>
    )
  }

}

export default MdTitle
