import React from 'react';

class Markdown extends React.Component {

  render () {
    return(<div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
          <th>Markdown</th>
          <th>Result</th>
          <th>Shortcut</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>**text**</td><td>Bold</td><td>Ctrl/⌘ + B</td>
          </tr>
          <tr>
            <td>*text*</td><td>Emphasize</td><td>Ctrl/⌘ + I</td>
          </tr>
          <tr>
            <td>~~text~~</td><td>Strike-through</td><td>Ctrl + Alt + U</td>
          </tr>
          <tr>
            <td>[title](http://)</td><td>Link</td><td>Ctrl/⌘ + K</td>
          </tr>
          <tr>
            <td>`code`</td><td>Inline Code</td><td>Ctrl/⌘ + Shift + K</td>
          </tr>
          <tr>
            <td>![alt](http://)</td><td>Image</td><td>Ctrl/⌘ + Shift + I</td>
          </tr>
          <tr>
            <td>* item</td><td>List</td><td>Ctrl + L</td>
          </tr>
          <tr>
            <td>> quote</td><td>Blockquote</td><td>Ctrl + Q</td>
          </tr>
          <tr>
            <td>==Highlight==</td><td>Highlight</td>
          </tr>
          <tr>
            <td># Heading</td><td>H1</td>
          </tr>
          <tr>
            <td>## Heading</td><td>H2</td><td>Ctrl/⌘ + H</td>
          </tr>
          <tr>
            <td>### Heading</td><td>H3</td><td>Ctrl/⌘ + H (x2)</td>
          </tr>
        </tbody>
      </table>
    </div>);
  }
}

export default Markdown;
