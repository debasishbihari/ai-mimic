import axios from 'axios';

export const fetchCountries = async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.data.map((country: any) => ({
    name: country.name.common,
    code: country.idd?.root + (country.idd?.suffixes?.[0] || ''),
  })).filter(c => c.code);
};
