'use strict';

import React, { PureComponent } from 'react';
import Header from '../views/header';
import Menu from '../views/menu';
import Footer from '../views/footer';
import QuotesBar from '../views/quotesBar';

export default class MainLayout extends PureComponent {

  constructor(props) {
      super(props);
  }

  render() {

    return (
      <div className="app">
        <Header className = 'content__header '/>

        <Menu/>

        <div className = 'content'>
          {this.props.children}
        </div>

        <Footer />
      </div>
    )

    
  }
}
