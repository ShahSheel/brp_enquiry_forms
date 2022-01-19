'use strict';

const date = require('hof').components.date;

module.exports = {
  fullname: {
    validate: ['required', 'notUrl']
  },
  'date-of-birth': date('date-of-birth', {
    validate: ['required', 'before'],
    legend: 'fields.date-of-birth.legend',
    hint: 'fields.date-of-birth.hint'
  }),
  nationality: {
    validate: ['required'],
    className: ['typeahead', 'js-hidden'],
    options: [''].concat(require('../../../assets/countries').allCountries),
    hint: 'fields.nationality.hint'
  },
  passport: {
    validate: ['required', 'notUrl']
  },
  'brp-card': {
    hint: 'fields.brp-card.hint'
  }
};
