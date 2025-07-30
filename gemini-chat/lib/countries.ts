import axios from 'axios';

export const fetchCountries = async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all');

  return response.data
    .map((country: any) => {
      const root = country.idd?.root;
      const suffix = country.idd?.suffixes?.[0];
      const code = root && suffix ? root + suffix : null;

      return {
        name: country.name.common,
        code,
      };
    })
    .filter(c => c.code); // only keep countries with valid codes
};
