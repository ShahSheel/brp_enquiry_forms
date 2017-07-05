'use strict';

module.exports = {
  'incapable-details': {
    validate: ['required'],
    dependent: {
      value: 'incapable',
      field: 'someone-else-reason-radio',
    }
  },
  'someone-else-reason-radio': {
    validate: ['required'],
    legend: {
      className: 'visuallyhidden',
      value: ''
    },
    options: [
      {
        value: 'incapable',
        toggle: 'incapable-details',
      },
      'under-age'
    ]
  }
};
