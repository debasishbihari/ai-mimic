import axios from 'axios';

interface Country {
  name: string;
  code: string | null;
}

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get(
    'https://restcountries.com/v3.1/all?fields=name,idd'
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countries: Country[] = response.data.map((country: any) => {
    const root = country.idd?.root;
    const suffix = country.idd?.suffixes?.[0];
    const code = root && suffix ? root + suffix : null;

    return {
      name: country.name.common,
      code,
    };
  });

  return countries.filter((c: Country) => c.code !== null);
};
