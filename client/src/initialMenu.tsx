import React from "react";

import Store from "./store";

import product from "./interface/product";
import userData from "./interface/userData";

import "./index.css";

import cookieImage from "../src/img/cookieImg.png";
import storeImage from "../src/img/storeImg.png";
import { json } from "stream/consumers";

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

  Safer() {
    const dataUser = [
      {
        currency: this.state.currency,
        helpers: this.state.helpers,
      },
    ];
    sessionStorage.setItem("UserDataCookieClicker", JSON.stringify(dataUser));
  }
  Getter() {
    const data: string = sessionStorage.getItem("UserDataCookieClicker")!;
    const { currency, helpers } = JSON.parse(data)[0];

    this.setState((state) => ({
      currency: currency,
      helpers: helpers,
    }));
  }

  componentDidMount() {
    if (localStorage.getItem("idUserCookie") !== null) {
      const id: string = localStorage.getItem("idUserCookie")!;
      fetch("/api/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id: id }),
      })
        .then((res) => res.json())
        .then((data: userData) => {
          
          this.setState((state) => ({
            currency: data[0].amountCookies,
            helpers: data[0].amountHelpers,
          }));

          if(data[0].amountHelpers > 0){
            this.timersClick();
          }
        });
    }

    fetch("/api/products")
      .then((res) => res.json())
      .then((product: product) => {
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
    setInterval(() => {
      this.helpClick();
    }, 1000);
  }

  saveClick() {
    this.Safer();
    this.Getter();

    if (localStorage.getItem("idUserCookie") === null) {
      const id: string = crypto.randomUUID();
      const dataUser = {
        id: id,
        currency: this.state.currency,
        helpers: this.state.helpers,
      };
      fetch("/api/writeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser),
      });

      localStorage.setItem("idUserCookie", id);
    } else {
      const id: string = localStorage.getItem("idUserCookie")!;
      const dataUser = {
        id: id,
        currency: this.state.currency,
        helpers: this.state.helpers,
      };
      fetch("/api/writeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataUser),
      });
    }
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
              <li key={product.id + 3}>
                {product.name} {product.cost}
              </li>
            );
          })}
        </section>
        <section>
          <ul>
            {this.state.products.map((product: product) => (
              <li key={product.id + 1}>
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

          <button className="saveBtn" onClick={() => this.saveClick()}>
            Save progress
          </button>
        </section>
        <Store
          currency={this.state.currency}
          storeIsOpen={this.state.storeIsOpen}
          changeCurrency={(priceHelpers: number) =>
            this.changeCurrency(priceHelpers)
          }
          increaseHelpers={(quantityHelpers: number, priceHelpers: number) =>
            this.increaseHelpers(quantityHelpers, priceHelpers)
          }
        />
      </div>
    );
  }
}
