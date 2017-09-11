import React, { Component } from 'react';
import Offer from './Offer';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.selectedCompanies = [];
    this.state = {offers: []};
    this.filter = false;
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    let selected = this.selectedCompanies;
    let index = selected.indexOf(event.target.value);
    if(index === -1) {
      selected.push(event.target.value);
    }else{
      selected.splice(index, 1);
    }
  
    const filterOffers = [].concat(this.props.data.allOffers)
      .filter((offer) => selected.indexOf(offer.company.id) !== -1);
    
    this.setState({offers: filterOffers});
    this.filter = selected.length > 0;
  }
  
  handleDeductibleChange(event) {
    //TODO
  }
  
  render() {
    return (
      <div className="container is-fluid">
        <div className="columns">
          <div className="column is-3">
            <nav className="card">
              <div className="card-content">
                <p className="title is-5">Companies</p>
  
                {this.props.data.allCompanies && this.props.data.allCompanies.map((company, i) => (
                  <div className="field" key={company.id}>
                    <div className="control">
                      <label className="checkbox">
                        <input type="checkbox"
                               value={company.id}
                               checked={company.isChecked}
                               onChange={this.handleChange}/> {company.name}
                      </label>
                    </div>
                  </div>
                ))}
                
                <br />
                <p className="title is-5">Deductible</p>
                <div className="field">
                  <div className="control">
                    <label className="checkbox">
                      <input type="checkbox"
                             value="0"
                             onChange={this.handleDeductibleChange} /> 0
                    </label>
                  </div>
                  <div className="control">
                    <label className="checkbox">
                      <input type="checkbox"
                             value="3"
                             onChange={this.handleDeductibleChange} /> 3
                    </label>
                  </div>
                  <div className="control">
                    <label className="checkbox">
                      <input type="checkbox"
                             value="5"
                             onChange={this.handleDeductibleChange} /> 5
                    </label>
                  </div>
                  <div className="control">
                    <label className="checkbox">
                      <input type="checkbox"
                             value="7"
                             onChange={this.handleDeductibleChange} /> 7
                    </label>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="column is-9">
            <div className="columns">
              <div className="column is-one-quarter">
                {this.props.data.allOffers && this.filter === false && this.props.data.allOffers.length + ' results'}
                {this.state.offers && this.filter === true && this.state.offers.length + ' results'}
              </div>
              <div className="column">
                <div className="select">
                  <select>
                    <option>Sort by</option>
                    <option>-</option>
                  </select>
                </div>
              </div>
            </div>
            {this.props.data.allOffers && this.filter === false && this.props.data.allOffers.map(offer => (
              <Offer
                key={offer.id}
                offer={offer}
                refresh={() => this.props.data.refetch()}
              />
            ))}
            
            {this.filter === true && this.state.offers.map(offer => (
              <Offer
                key={offer.id}
                offer={offer}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const FeedQuery = gql`query data {
  allCompanies(orderBy: name_DESC) {
    id
    name
    imageUrl
    offers {
      id
      price
      deductible
    }
  }
  allOffers {
    id
    price
    deductible
    company {
      id
      name
      imageUrl
    }
  }
}`;

const AppWithData = graphql(FeedQuery, {
  options: {
    fetchPolicy: 'network-only'
  },
})(App);

export default AppWithData;
