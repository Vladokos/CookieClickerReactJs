import React from "react";
import product from "./interface/product";

import "./index.css";

import cookieImage from "../src/img/cookieImg.png";
import storeImage from "../src/img/storeImg.png";

type Props = {};

type State = {
  currency: number;
  storeIsOpen: boolean;
  helpers: number;
  products: Array<product>;
};

export default class InitialMenu extends React.Component<Props, State> {
  state: State = {
    currency: 0,
    storeIsOpen: false,
    helpers: 0,
    products: [],
  };

  componentDidMount() {
    fetch("/api/products")
      .then((res) => res.json())
      .then((product: product) => {
        console.log(product);
        this.setState((state) => ({
          products: [product],
        }));
      });
  }

  clickOnCookie() {
    this.setState((state) => ({
      currency: state.currency + 1,
    }));
  }

  clicksStore() {
    this.setState((state) => ({
      storeIsOpen: !state.storeIsOpen,
    }));
  }

  changeCurrency(priceHelpers: number) {
    if (this.state.currency > 0 && this.state.currency - priceHelpers >= 0) {
      this.setState((state) => ({
        currency: state.currency - priceHelpers,
      }));
    }
  }

  increaseHelpers(quantityHelpers: number, priceHelpers: number) {
    if (this.state.currency > 0 && this.state.currency - priceHelpers >= 0) {
      if (this.state.helpers < 1) {
        this.timersClick();
      }
      this.setState((state) => ({
        helpers: (this.state.helpers += quantityHelpers),
      }));
    }
  }

  helpClick() {
    if (this.state.helpers > 0) {
      this.setState((state) => ({
        currency: (this.state.currency += this.state.helpers),
      }));
    }
  }

  timersClick() {
    setInterval(() => this.helpClick(), 1000);
  }
  render(): React.ReactNode {
    return (
      <div className="initialMenu">
        <div className="titleMenu">
          <h1>Cookie clicker</h1>
          <p>You have {this.state.currency} cookies</p>
        </div>
        <section>
          {this.state.products.map((product: product) => {
            return (
              <li key={product.id}>
                {product.name} {product.cost}
              </li>
            );
          })}
        </section>
        <section>
          <ul>
            {this.state.products.map((product:product) => (
              <li key={product.id}>
                {product.name} {product.cost}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <button onClick={() => this.clickOnCookie()} className="cookieBtn">
            <img
              src={cookieImage}
              alt={"cookie"}
              className="cookieBtnImg"
            ></img>
          </button>

          <button className="storeBtn" onClick={() => this.clicksStore()}>
            <img src={storeImage} alt={"store"}></img>
          </button>
        </section>
        {/* <Store
          currency={this.state.currency}
          storeIsOpen={this.state.storeIsOpen}
          changeCurrency={this.changeCurrency}
          increaseHelpers={this.increaseHelpers}
        /> */}
      </div>
    );
  }
}
