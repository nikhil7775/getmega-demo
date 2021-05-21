import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import RoutePaths from '../../utils/RoutePaths';
import { firestore } from '../../firebase';
import COLUMNS from './constants';

import './company.scss';
import RevenueGraph from '../Home/Graph';
import structureData from '../Home/constants';

class Company extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  state = {
    data: {},
    loading: false,
    error: '',
  }

  componentDidMount() {
    const { match: { params: { companyName = '' } } } = this.props;
    this.fetchData(companyName);
  }

  fetchData = async (company) => {
    const response = firestore.collection('revenue1').doc(company);
    this.setState({ loading: true });
    const resp = await response.get();
    if (resp.exists) {
      this.setState({
        data: resp.data(),
        loading: false,
      });
    } else {
      this.setState({
        error: 'Company Not Found',
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
    const { match: { params: { companyName = '' } } } = this.props;
    return (
      <div className="company-main-div">
        <div className="main-title">
          <span role="presentation" onClick={this.goToHome} className="custom-link">Dashboard</span>
          <span>{` / ${companyName}`}</span>
        </div>
        {error ? (<div>{`${companyName}: ${error}`}</div>) : (
          <div>
            <div className="display-flex titles-div">
              <div>{companyName}</div>
              <div>
                Country:&nbsp;
                {loading ? 'loading...' : <Link to={`${RoutePaths.country}/${data.Country}`}>{data.Country}</Link>}
              </div>
            </div>
            <div className="data-table">
              <div className="all-comp-title">Revenue by month:</div>
              {data && (
              <Table
                dataSource={[data]}
                columns={COLUMNS}
                loading={loading}
                pagination={false}
              />
              )}
            </div>
            <div>
              {loading ? <div>loading...</div>
                : (data && <RevenueGraph data={structureData([data])} />)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Company;
