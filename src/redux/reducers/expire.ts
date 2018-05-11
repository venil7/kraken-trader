import moment from 'moment';

export type Expirable = {
  expires: number;
};

export const EXPIRED = 0;

export const expireInSeconds = (s: number) =>
  moment().add(s, 's').unix();

export const expireInMinutes = (m: number) =>
  expireInSeconds(m * 60);

export const expireInMinute = () =>
  expireInMinutes(1);

export const expireInHours = (h: number) =>
  expireInMinutes(h * 60);

export const expireInHour = () =>
  expireInHours(1)

export const expireInDays = (d: number) =>
  expireInHours(d * 24);

export const expireInDay = () =>
  expireInDays(1)