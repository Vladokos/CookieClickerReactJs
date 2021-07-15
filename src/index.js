import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import cookieImage from "../src/img/cookieImg.png";
// import store from "./store";

class InitialMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 0,
      storeIsOpen: false,
    };

    this.clicksOnCookie = this.clicksOnCookie.bind(this);
    this.clicksStore = this.clicksStore.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
  }

  clicksOnCookie() {
    this.setState((state) => ({
      currency: state.currency + 1,
    }));
  }

  clicksStore() {
    this.setState({
      storeIsOpen: !this.state.storeIsOpen,
    });
  }

  changeCurrency() {
    console.log("Asdfdg");
    this.setState((state) => ({
      currency: state.currency - 1,
    }));
  }

  render() {
    return (
      <div>
        <h1>Cookie clicker</h1>
        <p>You have {this.state.currency} cookies</p>
        <section>
          <button onClick={this.clicksOnCookie}>
            <img src={cookieImage} alt={"logo"}></img>
          </button>
        </section>
        <section>
          <button
            className={this.state.storeIsOpen ? "btnG" : "btnD"}
            onClick={this.clicksStore}
          >
            store
          </button>
          <Store
            currency={this.state.currency}
            storeIsOpen={this.state.storeIsOpen}
            changeCurrency={this.changeCurrency}
          />
        </section>
      </div>
    );
  }
}
class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };

    this.buyHelperOne = this.buyHelperOne.bind(this);
    this.buyHelperTwo = this.buyHelperTwo.bind(this);
  }

  buyHelperOne() {
    this.setState((state) => ({
      value: (state.value = this.props.currency),
    }));
  }
  buyHelperTwo() {
    this.setState((state) => ({
      value: state.value - 1,
    }));
  }

  render() {
    return (
      <div className={this.props.storeIsOpen ? "storeActive" : "store"}>
        <p>{this.props.currency}</p>
        <h2>Store</h2>
        <section>
          <p>Products</p>
          <li>
            <ul>
              <button onClick={this.buyHelperOne}>
                Buy helper +1 click one seconds
              </button>
              {this.state.value}
            </ul>
            <ul>
              <button
                onClick={() => {
                  this.buyHelperTwo();
                  this.props.changeCurrency();
                }}
              >
                Buy helper +1 click one seconds
              </button>
            </ul>
            <ul>-</ul>
          </li>
        </section>
      </div>
    );
  }
}
// function Store(props) {
//   function buyHelperOne() {
//     props.storeIsOpen = false;
//   }

//   return (
//     <div className={props.storeIsOpen ? "storeActive" : "store"}>
//       <p>{props.currency}</p>
//       <h2>Store</h2>
//       <section>
//         <p>Products</p>
//         <li>
//           <ul>
//             <button onClick={buyHelperOne}>
//               Buy helper +1 click one seconds
//             </button>
//           </ul>
//           <ul>-</ul>
//           <ul>-</ul>
//         </li>
//       </section>
//     </div>
//   );
// }

ReactDOM.render(<InitialMenu />, document.getElementById("root"));
