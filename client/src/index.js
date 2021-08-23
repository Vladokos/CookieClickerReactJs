import React from "react";
import ReactDOM from "react-dom";
import Store from "./store";
import "./index.css";
import cookieImage from "../src/img/cookieImg.png";
import storeImage from "../src/img/storeImg.png";

class InitialMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 0,
      storeIsOpen: false,
      helpers: 0,
      products: [],
    };

    this.clicksOnCookie = this.clicksOnCookie.bind(this);
    this.clicksStore = this.clicksStore.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.helpClick = this.helpClick.bind(this);
    this.increaseHelpers = this.increaseHelpers.bind(this);
    this.timersClick = this.timersClick.bind(this);
  }

  componentDidMount() {
    fetch("/api/products")
      .then((res) => res.json())
      .then((products) => {
        this.setState({ products: products }, () =>
          console.log("Products fethc...", this.state.products)
        );
      });
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
          {this.state.products.map(product =>{
            <li key={product.id}>{product.name} {product.cost}</li>
          })}
        </section>
        <section>
          <ul>
            {this.state.products.map((product) => (
              <li key={product.id}>
                {product.name} {product.cost}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <button onClick={this.clicksOnCookie} className="cookieBtn">
            <img
              src={cookieImage}
              alt={"cookie"}
              className="cookieBtnImg"
            ></img>
          </button>

          <button className="storeBtn" onClick={this.clicksStore}>
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

ReactDOM.render(<InitialMenu />, document.getElementById("root"));
