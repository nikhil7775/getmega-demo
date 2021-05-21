/* eslint-disable no-restricted-globals */
const SORT_ORDER = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const structureData = (data = []) => data.map((each) => ({
  company: each.Company,
  country: each.Country,
  revenue: Object.keys(each).map((month) => month !== 'Company' && month !== 'Country' && ({
    month,
    value: each[month],
    date: new Date().setMonth(SORT_ORDER.indexOf(month)),
  })).filter((a) => a) // filter out false/empty entries
    .sort((d1, d2) => {
      if (SORT_ORDER.indexOf(d1.month) < SORT_ORDER.indexOf(d2.month)) {
        return -1;
      }
      if (SORT_ORDER.indexOf(d1.month) > SORT_ORDER.indexOf(d2.month)) {
        return 1;
      }
      return 0;
    }), // sort in order of months
}));

export default structureData;

export const getCountryData = (data, country) => data
  .filter((a) => a.country === country)
  .map((comp) => ({
    company: comp.company,
    revenue: comp.revenue
    // eslint-disable-next-line no-restricted-globals
      .map((month) => (isNaN(month.value) ? Number(month.value.replace(/,/g, '')) : month.value))
      .reduce((a, b) => a + b, 0),
  }));
