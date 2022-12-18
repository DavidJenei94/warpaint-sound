import { MapQueryParams } from '../models/map.model';

export const getQueryParams = (
  searchParams: URLSearchParams
): MapQueryParams => {
  let params: MapQueryParams = { lat: '0', lng: '0', z: '9' };
  for (const [key, value] of searchParams) {
    if (value === '') {
      delete params[key as keyof MapQueryParams];
    } else {
      params[key as keyof MapQueryParams] = value;
    }
  }

  return params;
};

export const round = (value: number, precision: number): number => {
  const multiplier: number = Math.pow(10, precision || 0);

  return Math.round(value * multiplier) / multiplier;
};
