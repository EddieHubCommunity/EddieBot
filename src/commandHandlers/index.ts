import * as bio from './bio';
import * as codeOfConduct from './codeOfConduct';
import * as help from './help';
import * as roles from './roles';
import * as iam from './iam';
import * as standup from './standup';
import * as stats from './stats';
import * as tips from './tips/tips';

export default [bio, codeOfConduct, help, iam, roles, standup, stats, tips];

export { fallback } from './fallback';
