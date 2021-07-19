import React from "react";

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
      haveCookies: null,
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
                <p className="priceOneHelper">
                  Cost: {prices.oneHelper} cookies
                </p>
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
                  className="btnStore"
                >
                  Buy helper +1 click one seconds
                </button>
              </ul>
              <ul>
                <p className="priceTwoHelper">
                  Cost: {prices.twoHelpers} cookies
                </p>
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
                  className="btnStore"
                >
                  Buy helper +2 click one seconds
                </button>
              </ul>
              <ul>
                <p className="priceThreeHelper">
                  Cost: {prices.threeHelpers} cookies
                </p>
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
                  className="btnStore"
                >
                  Buy helper +3 click one seconds
                </button>
              </ul>
            </li>
          </div>
        </section>
        <section
          className={
            this.state.haveCookies === true
              ? "hide"
              : this.state.haveCookies === null
              ? "hide"
              : "popupBalance"
          }
        >
          you dont have cookies
        </section>
      </div>
    );
  }
}
export default Store;