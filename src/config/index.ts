import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export const API_DOCUMENT = yaml.load(
  readFileSync(join(__dirname, '../../doc/api.yaml'), 'utf8'),
);
