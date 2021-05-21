import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import RoutePaths from '../../utils/RoutePaths';
import { firestore } from '../../firebase';
import { COUNTRY_COLUMNS } from '../Company/constants';

import '../Company/company.scss';
import RevenueGraph from '../Home/Graph';
import structureData from '../Home/constants';

class Country extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  state = {
    data: [],
    loading: false,
    error: '',
  }

  componentDidMount() {
    const { match: { params: { countryName = '' } } } = this.props;
    this.fetchData(countryName);
  }

  fetchData = async (country) => {
    const response = firestore.collection('revenue1');
    this.setState({ loading: true });
    const resp = await response.get();
    const data = [];
    resp.docs.forEach((a) => {
      data.push(a.data());
    });
    const filteredData = data.filter((a) => a.Country === country);
    if (filteredData.length > 0) {
      this.setState({
        data: filteredData,
        loading: false,
      });
    } else {
      this.setState({
        error: 'No Company Found',
        loading: false,
      });
    }
  }

  goToHome = () => {
    const { history } = this.props;
    history.push(RoutePaths.home);
  }

  render() {
    const { loading, data, error } = this.state;
    const { match: { params: { countryName = '' } } } = this.props;
    return (
      <div className="company-main-div">
        <div className="main-title">
          <span role="presentation" onClick={this.goToHome} className="custom-link">Dashboard</span>
          <span>{` / ${countryName}`}</span>
        </div>
        {error ? (<div>{`${countryName}: ${error}`}</div>) : (
          <div>
            <div className="display-flex titles-div">
              <div>{countryName}</div>
            </div>
            <div className="data-table">
              <div className="all-comp-title">Revenue by month:</div>
              <Table
                dataSource={data}
                columns={COUNTRY_COLUMNS}
                loading={loading}
                pagination={false}
              />
            </div>
            <div>
              {loading ? <div>loading...</div>
                : (data.length > 0 && <RevenueGraph data={structureData(data)} />)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Country;
