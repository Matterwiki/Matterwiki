import React from 'react';

class Markdown extends React.Component {

  render () {
    return(<div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
          <th>Markdown</th>
          <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>**text**</td><td>Bold</td>
          </tr>
          <tr>
            <td>*text*</td><td>Emphasize</td>
          </tr>
          <tr>
            <td>~~text~~</td><td>Strike-through</td>
          </tr>
          <tr>
            <td>[title](http://)</td><td>Link</td>
          </tr>
          <tr>
            <td>`code`</td><td>Inline Code</td>
          </tr>
          <tr>
            <td>![alt](http://)</td><td>Image</td>
          </tr>
          <tr>
            <td>* item</td><td>List</td>
          </tr>
          <tr>
            <td>> quote</td><td>Blockquote</td>
          </tr>
          <tr>
            <td># Heading</td><td>H1</td>
          </tr>
          <tr>
            <td>## Heading</td><td>H2</td>
          </tr>
          <tr>
            <td>### Heading</td><td>H3</td>
          </tr>
        </tbody>
      </table>
    </div>);
  }
}

export default Markdown;
