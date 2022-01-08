import { baseConfig } from "./environment.base";
import { merge } from "lodash-es";

export const environment =  merge(baseConfig, {
  production: false,
  title: 'Staging Car app'
});
