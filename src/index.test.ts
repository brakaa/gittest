import { describe, it } from 'mocha';
import * as chai from 'chai';
import { parseError, ErrorMessage } from './index';

const { expect } = chai;
describe('My function', () => {
  it('should be able to parse errors correctly in Chrome', () => {
    const errChrome: Error = {
      name: '',
      message: '',
      stack: `TypeError: Error raised
            at bar http://192.168.31.8:8000/c.js:2:9
            at foo http://192.168.31.8:8000/b.js:4:15
            at calc http://192.168.31.8:8000/a.js:4:3
            at <anonymous>:1:11
            at http://192.168.31.8:8000/a.js:22:3
            `,
    };
    const msgChrome: ErrorMessage = {
      message: 'Error raised',
      stack: [
        {
          line: 2,
          column: 9,
          filename: 'http://192.168.31.8:8000/c.js',
        },
        {
          line: 4,
          column: 15,
          filename: 'http://192.168.31.8:8000/b.js',
        },
        {
          line: 4,
          column: 3,
          filename: 'http://192.168.31.8:8000/a.js',
        },
        {
          line: 22,
          column: 3,
          filename: 'http://192.168.31.8:8000/a.js',
        },
      ],
    };
    expect(parseError(errChrome)).to.eql(msgChrome);
  });
  it('can also work in Firefox', () => {
    const errFirefox: Error = {
      name: '',
      message: '',
      stack: `
          bar@http://192.168.31.8:8000/c.js:2:9
          foo@http://192.168.31.8:8000/b.js:4:15
          calc@http://192.168.31.8:8000/a.js:4:3
          <anonymous>:1:11
          http://192.168.31.8:8000/a.js:22:3
        `,
    };
    const msgFirefox: ErrorMessage = {
      message: '',
      stack: [
        {
          line: 2,
          column: 9,
          filename: 'http://192.168.31.8:8000/c.js',
        },
        {
          line: 4,
          column: 15,
          filename: 'http://192.168.31.8:8000/b.js',
        },
        {
          line: 4,
          column: 3,
          filename: 'http://192.168.31.8:8000/a.js',
        },
        {
          line: 22,
          column: 3,
          filename: 'http://192.168.31.8:8000/a.js',
        },
      ],
    };
    expect(parseError(errFirefox)).to.eql(msgFirefox);
  });
});
