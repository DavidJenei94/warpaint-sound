import fs from 'fs';

const readCountryData = (directory) => {
  const countriesJSON = fs.readFileSync(
    directory + '/src/data/countries.json'
  );
  const countriesObject = JSON.parse(countriesJSON);

  return { countries: countriesObject };
};

export default readCountryData;
