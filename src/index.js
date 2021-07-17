import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import cookieImage from "../src/img/cookieImg.png";
import storeImage from "../src/img/storeImg.png";
// import store from "./store";

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
    this.setState((state) => ({
      storeIsOpen: !state.storeIsOpen,
    }));
  }

  changeCurrency(priceHelpers) {
    if (this.state.currency > 0 && this.state.currency - priceHelpers >= 0) {
      this.setState((state) => ({
        currency: state.currency - priceHelpers,
      }));
    }
  }

  increaseHelpers(quantityHelpers, priceHelpers) {
    if (this.state.currency > 0 && this.state.currency - priceHelpers >= 0) {
      if (this.state.helpers < 1) {
        this.timersClick();
      }
      this.setState((state) => ({
        helpers: (state.helpers += quantityHelpers),
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
    this.timerClickID = setInterval(() => this.helpClick(), 1000);
  }

  render() {
    return (
      <div className="initinalMenu">
        <div className="titleMenu">
          <h1>Cookie clicker</h1>
          <p>You have {this.state.currency} cookies</p>
        </div>
        <section>
          <button onClick={this.clicksOnCookie} className="cookieBtn" >
            <img src={cookieImage} alt={"cookie"}></img>
          </button>

          <button
            className="storeBtn"
            onClick={this.clicksStore}
          >
            <img src={storeImage} alt={"store"}></img>
          </button>
        </section>
        <Store
          currency={this.state.currency}
          storeIsOpen={this.state.storeIsOpen}
          changeCurrency={this.changeCurrency}
          increaseHelpers={this.increaseHelpers}
        />
      </div>
    );
  }
}

const prices = {
  oneHelper: 2,
  twoHelpers: 3,
  threeHelpers: 5,
};
const numberOfAssistants = {
  oneHelper: 1,
  twoHelpers: 2,
  threeHelpers: 3,
};

//class Store improt on different js file
class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      haveCookies: true,
      isClicked: false,
    };

    this.buyHelper = this.buyHelper.bind(this);
    this.timerChangeName = this.timerChangeName.bind(this);
    this.timerReload = this.timerReload.bind(this);
  }

  buyHelper(priceHelpers, nameHelpres) {
    if (this.props.currency > 0 && this.props.currency - priceHelpers >= 0) {
      this.setState((state) => ({
        value: (state.value = this.props.currency) - priceHelpers,
        haveCookies: (state.haveCookies = true),
      }));

      let objectKeyPrice = Object.keys(numberOfAssistants).find(
        (key) => numberOfAssistants[key] === nameHelpres
      );
      prices[objectKeyPrice] *= priceHelpers;
    } else {
      this.setState((state) => ({
        haveCookies: (state.haveCookies = false),
      }));
    }
  }

  timerChangeName() {
    if (!this.state.isClicked && this.props.currency === 0) {
      this.timerChangeNameID = setTimeout(
        () =>
          this.setState((state) => ({
            haveCookies: (state.haveCookies = true),
          })),
        2000
      );
      this.setState((state) => ({
        isClicked: !state.isClicked,
      }));
      this.timerReload();
    }
  }

  timerReload() {
    this.timerReloadID = setTimeout(
      () =>
        this.setState((state) => ({
          isClicked: !state.isClicked,
        })),
      2000
    );
  }

  render() {
    return (
      <div className={this.props.storeIsOpen ? "storeActive" : "store"}>
        <div className="titleStore">
          <h2>Store</h2>
          <p>Your cookies: {this.props.currency}</p>
        </div>
        <section>
          <p>Products:</p>
          <div className="products">
            <li>
              <ul>
                Cost: {prices.oneHelper} cookies
                <br />
                <button
                  onClick={() => {
                    this.props.increaseHelpers(
                      numberOfAssistants.oneHelper,
                      prices.oneHelper
                    );
                    this.props.changeCurrency(prices.oneHelper);
                    this.buyHelper(
                      prices.oneHelper,
                      numberOfAssistants.oneHelper
                    );
                    this.timerChangeName();
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
                    this.props.increaseHelpers(
                      numberOfAssistants.twoHelpers,
                      prices.twoHelpers
                    );
                    this.props.changeCurrency(prices.twoHelpers);
                    this.buyHelper(
                      prices.twoHelpers,
                      numberOfAssistants.twoHelpers
                    );
                    this.timerChangeName();
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
                    this.props.increaseHelpers(
                      numberOfAssistants.threeHelpers,
                      prices.threeHelpers
                    );
                    this.props.changeCurrency(prices.threeHelpers);
                    this.buyHelper(
                      prices.threeHelpers,
                      numberOfAssistants.threeHelpers
                    );
                    this.timerChangeName();
                  }}
                >
                  Buy helper +3 click one seconds
                </button>
              </ul>
            </li>
          </div>
        </section>
        <div
          className={this.state.haveCookies === true ? "hide" : "popupBalance"}
        >
          you dont have cookies
        </div>
      </div>
    );
  }
}

ReactDOM.render(<InitialMenu />, document.getElementById("root"));
