import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

dotenv.config();

export const PORT = process.env.PORT || 4000;

export const API_DOCUMENT = yaml.load(readFileSync('./doc/api.yaml', 'utf8'));
