import React, { Component } from "react";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu";
import { Toaster } from 'react-hot-toast';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="max-w-full">
        <Toaster position="top-right" reverseOrder={false} />
        <NavMenu />
        <div className="min-w-full max-w-full">{this.props.children}</div>
      </div>
    );
  }
}
