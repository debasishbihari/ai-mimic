import axios from 'axios';

export const fetchCountries = async () => {
  const response = await axios.get(
    'https://restcountries.com/v3.1/all?fields=name,idd'
  );

  return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((country: any) => {
      const root = country.idd?.root;
      const suffix = country.idd?.suffixes?.[0];
      const code = root && suffix ? root + suffix : null;

      return {
        name: country.name.common,
        code,
      };
    })
    .filter((c) => c.code);
};
