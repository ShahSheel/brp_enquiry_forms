'use strict';

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/arrange'
  },
  '/arrange': {
    controller: require('./controllers/arrange'),
    fields: [
      'someone-else-fullname',
      'someone-else-date',
      'someone-else-date-day',
      'someone-else-date-month',
      'someone-else-date-year',
      'someone-else-nationality',
      'someone-else-id-type',
      'someone-else-id-number'
    ],
    next: '/reason'
  },
  '/reason': {
    fields: [
      'someone-else-reason-radio',
      'incapable-details'
    ],
    next: '/personal-details'
  },
  '/exit-not-eligible': {
    clearSession: true,
    prereqs: ['/']
  },
  '/personal-details': {
    controller: require('./controllers/personal-details'),
    fields: [
      'fullname',
      'date-of-birth',
      'date-of-birth-day',
      'date-of-birth-month',
      'date-of-birth-year',
      'nationality',
      'passport'
    ],
    next: '/contact-details'
  },
  '/personal-details-no-reason': {
    controller: require('../common/controllers/personal-details'),
    template: 'personal-details',
    fields: [
      'fullname',
      'date-of-birth',
      'date-of-birth-day',
      'date-of-birth-month',
      'date-of-birth-year',
      'nationality',
      'passport'
    ],
    prereqs: ['/arrange'],
    next: '/contact-details',
    backLink: 'arrange'
  },
  '/contact-details': {
    fields: [
      'email',
      'use-address',
      'contact-address-house-number',
      'contact-address-street',
      'contact-address-town',
      'contact-address-county',
      'contact-address-postcode',
      'phone'
    ],
    next: '/confirm'
  },
  '/confirm': {
    controller: require('./controllers/confirm'),
    fields: [
      'org-help',
      'rep-name',
      'rep-email',
      'org-type'
    ],
    next: '/confirmation'
  },
  '/confirmation': {
    controller: require('../common/controllers/confirmation'),
    backLink: false,
    clearSession: true
  }
};
