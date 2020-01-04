'use strict';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return (
      <button onClick={() => this.setState({ liked: true }) }>
        Calendar
      </button>
    );
  }
}

let domContainer = document.querySelector('#calendar-component');
ReactDOM.render(<Calendar />, domContainer);