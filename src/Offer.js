import React, { Component } from 'react';

class Offer extends Component {
  render() {
    return (
      <div className="box">
        <div className="columns">
          <div className="column is-one-quarter">
            <figure className="image">
              <img src={this.props.offer.company.imageUrl} alt="Placeholder" />
            </figure>
            {this.props.offer.company.name}
          </div>
          <div className="column">
            <p>
              <strong>Price:</strong> <small>{this.props.offer.price}</small>
              <br />
              <strong>Deductible:</strong> <small>{this.props.offer.deductible}</small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Offer