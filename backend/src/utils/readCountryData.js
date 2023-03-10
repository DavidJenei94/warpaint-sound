import fs from 'fs';
import config from '../configs/general.config.js';

const readCountryData = () => {
  const countriesJSON = fs.readFileSync(
    config.mainPath + '/src/data/countries.json'
  );
  const countriesObject = JSON.parse(countriesJSON);

  return { countries: countriesObject };
};

export default readCountryData;
