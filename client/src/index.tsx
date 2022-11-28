import React from "react";
import ReactDOM from "react-dom/client";
import product from "./interface/product";

type Props = {};

type State = {
  currency: number;
  storeIsOpen: boolean;
  helpers: number;
  products: Array<product>;
};

class InitialMenu extends React.Component<Props, State> {
  state: State = {
    currency: 0,
    storeIsOpen: false,
    helpers: 0,
    products: [],
  };

  // componentDidMount() {
  //   fetch("/api/products")
  //     .then((res) => res.json())
  //     .then((products: product) => {

  //     });
  // }

  clickOnCookie() {
    this.setState((state) => ({
      currency: state.currency + 1,
    }));
  }

  render(): React.ReactNode {
    return <div></div>;
  }
}
