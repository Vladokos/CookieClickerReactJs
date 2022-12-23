import React from "react";

import store from "./interface/store";

type Props = {
  currency: number;
  storeIsOpen: boolean;
  changeCurrency: (priceHelpers: number) => void;
  increaseHelpers: (quantityHelpers: number, priceHelpers: number) => void;
};

type State = {
  value: number;
  haveCookies: boolean | null;
  isClicked: boolean;
};

const prices:store = {
  oneHelper: 2,
  twoHelpers: 3,
  threeHelpers: 5,
};

const numberOfAssistants:store = {
  oneHelper: 1,
  twoHelpers: 2,
  threeHelpers: 3,
};

export default class Store extends React.Component<Props, State> {
  state: State = {
    value: 0,
    haveCookies: null,
    isClicked: false,
  };

  buyHelper(priceHelpers: number, nameHelpers: string) {
    if (this.props.currency > 0 && this.props.currency - priceHelpers >= 0) {
      this.setState((state) => ({
        value: (this.state.value = this.props.currency) - priceHelpers,
        haveCookies: (this.state.haveCookies = true),
      }));



      let objectKeyPrice:string = Object.keys(numberOfAssistants).find(
        (key:string) => key === nameHelpers
      )!;
      prices[objectKeyPrice] *= priceHelpers;
    } else {
      this.setState((state) => ({
        haveCookies: (this.state.haveCookies = false),
      }));
    }
  }

  timerChangeName() {
    if (!this.state.isClicked && this.props.currency === 0) {
      setTimeout(
        () =>
          this.setState((state) => ({
            haveCookies: (this.state.haveCookies = true),
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
    setTimeout(
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
            <ul>
              <li>
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
                      numberOfAssistants.oneHelper.toString()
                    );
                    this.timerChangeName();
                  }}
                  className="btnStore"
                >
                  Buy helper +1 click one seconds
                </button>
              </li>
              <li>
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
                      numberOfAssistants.twoHelpers.toString()
                    );
                    this.timerChangeName();
                  }}
                  className="btnStore"
                >
                  Buy helper +2 click one seconds
                </button>
              </li>
              <li>
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
                      numberOfAssistants.threeHelpers.toString()
                    );
                    this.timerChangeName();
                  }}
                  className="btnStore"
                >
                  Buy helper +3 click one seconds
                </button>
              </li>
            </ul>
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
          you don't have cookies
        </section>
      </div>
    );
  }
}
