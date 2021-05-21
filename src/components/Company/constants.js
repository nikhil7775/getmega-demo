import React from 'react';
import { Link } from 'react-router-dom';
import RoutePaths from '../../utils/RoutePaths';

const COLUMNS = [
  {
    title: 'January',
    dataIndex: 'January',
    key: 'January',
  },
  {
    title: 'February',
    dataIndex: 'February',
    key: 'February',
  },
  {
    title: 'March',
    dataIndex: 'March',
    key: 'March',
  },
  {
    title: 'April',
    dataIndex: 'April',
    key: 'April',
  },
  {
    title: 'May',
    dataIndex: 'May',
    key: 'May',
  },
  {
    title: 'June',
    dataIndex: 'June',
    key: 'June',
  },
  {
    title: 'July',
    dataIndex: 'July',
    key: 'July',
  },
  {
    title: 'August',
    dataIndex: 'August',
    key: 'August',
  },
  {
    title: 'September',
    dataIndex: 'September',
    key: 'September',
  },
  {
    title: 'October',
    dataIndex: 'October',
    key: 'October',
  },
  {
    title: 'November',
    dataIndex: 'November',
    key: 'November',
  },
  {
    title: 'December',
    dataIndex: 'December',
    key: 'December',
  },
];

export default COLUMNS;

export const COUNTRY_COLUMNS = [
  {
    title: 'Company',
    dataIndex: 'Company',
    key: 'Company',
    render: (text) => <Link to={`${RoutePaths.company}/${text}`}>{text}</Link>,
  },
  ...COLUMNS,
];
