import { baseConfig } from "./environment.base";
import { merge } from "lodash-es";

export const environment =  merge(baseConfig(), {
  production: false,
  title: 'Staging Car app',
  apiUri: 'https://glacial-dawn-18469.herokuapp.com'
});
