import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import cookieImage from "../src/img/cookieImg.png";
// import store from "./store";

//class Store improt on different js file

class InitialMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 0,
      storeIsOpen: false,
      helpers: 0,
    };

    this.clicksOnCookie = this.clicksOnCookie.bind(this);
    this.clicksStore = this.clicksStore.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.helpClick = this.helpClick.bind(this);
    this.increaseHelpers = this.increaseHelpers.bind(this);
    this.timersClick = this.timersClick.bind(this);
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

  changeCurrency(e) {
    if (this.state.currency > 0 && this.state.currency - e >= 0) {
      this.setState((state) => ({
        currency: state.currency - e,
      }));
    }
  }

  increaseHelpers(e) {
    if (this.state.currency > 0 && this.state.currency - e >= 0) {
      if (this.state.helpers < 1) {
        this.timersClick();
      }
      return this.setState((state) => ({
        helpers: (state.helpers += e),
      }));
    }
  }

  helpClick() {
    if (this.state.helpers > 0) {
      this.setState((state) => ({
        currency: (state.currency += this.state.helpers),
      }));
    }
  }

  timersClick() {
    this.timerID = setInterval(() => this.helpClick(), 1000);
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
            increaseHelpers={this.increaseHelpers}
          />
        </section>
      </div>
    );
  }
}

const prices = {
  oneHelper: 1,
  twoHelpers: 2,
  threeHelpers: 3,
};
const numberOfAssistants = {
  oneHelper: 1,
  twoHelpers: 2,
  threeHelpers: 3,
};

class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };

    this.buyHelper = this.buyHelper.bind(this);
  }

  buyHelper(e) {
    if (this.props.currency > 0 && this.props.currency - e >= 0) {
      this.setState((state) => ({
        value: (state.value = this.props.currency) - e,
      }));

      let objectKeyPrice = Object.keys(prices).find((key) => prices[key] === e);
      prices[objectKeyPrice] *= e + 1;
    } else {
      //change on popup window !
      alert("you dont have cookies");
    }
  }

  render() {
    return (
      <div className={this.props.storeIsOpen ? "storeActive" : "store"}>
        <p>{this.props.value}</p>
        <h2>Store</h2>
        <section>
          <p>Products</p>
          <li>
            <ul>
              Cost: {prices.oneHelper} cookies
              <br />
              <button
                onClick={() => {
                  this.props.changeCurrency(prices.oneHelper);
                  this.buyHelper(prices.oneHelper);
                  this.props.increaseHelpers(numberOfAssistants.oneHelper);
                }}
              >
                Buy helper +1 click one seconds
              </button>
            </ul>
            <ul>
              Cost: {prices.twoHelpers} cookies
              <br />
              <button
                onClick={() => {
                  this.props.changeCurrency(prices.twoHelpers);
                  this.buyHelper(prices.twoHelpers);
                  this.props.increaseHelpers(numberOfAssistants.twoHelpers);
                }}
              >
                Buy helper +2 click one seconds
              </button>
            </ul>
            <ul>
              Cost: {prices.threeHelpers} cookies
              <br />
              <button
                onClick={() => {
                  this.props.changeCurrency(prices.threeHelpers);
                  this.buyHelper(prices.threeHelpers);
                  this.props.increaseHelpers(numberOfAssistants.threeHelpers);
                }}
              >
                Buy helper +3 click one seconds
              </button>
            </ul>
          </li>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<InitialMenu />, document.getElementById("root"));
