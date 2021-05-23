import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firestore } from '../../firebase';
import RoutePaths from '../../utils/RoutePaths';
import structureData, { getCountryData } from './constants';
import RevenueGraph from './Graph';
import PieChart from './PieChart';

import './home.scss';

class Home extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

   state = {
     data: [],
     loading: false,
     allCountries: [],
     allCompanies: [],
   }

   componentDidMount() {
     this.fetchData();
   }

    fetchData = async () => {
      const response = firestore.collection('revenue');
      this.setState({ loading: true });
      const resp = await response.get();
      const data = [];
      resp.docs.forEach((a) => {
        data.push(a.data());
      });
      this.setState({
        data: structureData(data),
        allCountries: [...new Set(data.map((a) => a.Country))],
        allCompanies: data.map((a) => a.Company),
        loading: false,
      });
    }

  goToCompany = (comp) => {
    const { history } = this.props;
    history.push(`${RoutePaths.company}/${comp}`);
  }

  goToCountry = (comp) => {
    const { history } = this.props;
    history.push(`${RoutePaths.country}/${comp}`);
  }

  render() {
    const {
      loading, data, allCompanies, allCountries,
    } = this.state;
    return (
      <div className="home-main-div">
        <div className="main-title">Revenue Dashboard</div>
        <div className="share-div">
          <div className="all-comp-title">Market Share in Top Countries:</div>
          <div className="cards-div">
            <div>
              <div className="country-title">
                <span className="custom-link" role="presentation" onClick={() => this.goToCountry('India')}>India</span>
              </div>
              {loading ? <div>loading...</div>
                : (data.length > 0 && <PieChart country="India" data={getCountryData(data, 'India')} />)}
            </div>
            <div>
              <div className="country-title">
                <span className="custom-link" role="presentation" onClick={() => this.goToCountry('USA')}>USA</span>
              </div>
              {loading ? <div>loading...</div>
                : (data.length > 0 && <PieChart country="USA" data={getCountryData(data, 'USA')} />)}
            </div>
            <div>
              <div className="country-title">
                <span className="custom-link" role="presentation" onClick={() => this.goToCountry('UK')}>UK</span>
              </div>
              {loading ? <div>loading...</div>
                : (data.length > 0 && <PieChart country="UK" data={getCountryData(data, 'UK')} />)}
            </div>
          </div>
        </div>
        <div>
          <div className="all-comp-title">Revenue of all companies:</div>
          {loading ? <div>loading...</div>
            : (data.length > 0 && <RevenueGraph data={data} />)}
        </div>
        <div className="details-div">
          <div className="all-comp-title">View Details:</div>
          <div>
            <div>
              <div className="details-sub-title">By Company</div>
              <div className="display-flex links-div">
                {loading ? <div>loading...</div>
                  : (allCompanies.map((a) => <div className="custom-link link-item" role="presentation" onClick={() => this.goToCompany(a)}>{a}</div>))}
              </div>
            </div>
            <div>
              <div className="details-sub-title">By Country</div>
              <div className="display-flex links-div">
                {loading ? <div>loading...</div>
                  : (allCountries.map((a) => <div className="custom-link link-item" role="presentation" onClick={() => this.goToCountry(a)}>{a}</div>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
