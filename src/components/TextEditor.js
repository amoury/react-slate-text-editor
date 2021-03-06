import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { BoldMark, ItalicMark } from './index';


const initialValue = Value.fromJSON({
  document: { 
    nodes: [
      { 
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'My First Paragraph',
              }
            ]
          }
        ]
      }
    ]
  }
})

class TextEditor extends Component {

  state = {
    value: initialValue
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (e, change) => {
    if(!e.ctrlKey) return;
    e.preventDefault();

    switch (e.key) {
      case 'b': 
        change.toggleMark('bold')
        return true
      case 'i':
        change.toggleMark('italic')
        return true
      default:
        return;
    }
  }

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold': 
        return <BoldMark {...props} />
      case 'italic':
        return <ItalicMark {...props} />
      default:
        return
    }
  }

  render () {
    return (
      <Editor value={this.state.value} onChange={this.onChange} onKeyDown={this.onKeyDown} renderMark={this.renderMark} />      
    );
  }
}

export default TextEditor;