import React from "react";

class Store extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         currency: this.props.currency,
//     }
//   }

  render() {
    return (
      <div>
        <p>{this.state.currency}</p>
        <h2>Store</h2>
        <section>
            <p>Products</p>
            <li>
                <ul><button>Buy helper +1 click one seconds</button></ul>
                <ul>-</ul>
                <ul>-</ul>
            </li>
        </section>
      </div>
    );
  }
}
