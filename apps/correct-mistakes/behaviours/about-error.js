/* eslint-disable consistent-return */
'use strict';

const _ = require('underscore');

const truncateConfigs = [
  {
    id: 'first-name-error',
    max: 30
  },
  {
    id: 'last-name-error',
    max: 30
  },
  {
    id: 'birth-place-error',
    max: 16
  }
];

function isChecked(key, req) {
  if (req.form.values[key + '-checkbox']) {
    return req.form.values[key + '-checkbox'] === 'true';
  }
  return req.form.values[key] === 'true';
}

function isTooLong(key, max, req) {
  return isChecked(key, req) && req.form.values[key].length > max;
}

function getTruncatedItems(req) {
  const items = [];

  truncateConfigs.forEach(config => {
    if (isTooLong.call(this, config.id, config.max, req)) {
      items.unshift({id: config.id, max: config.max});
    }
  });
  return items;
}

function anyChecked(req) {
  const checked = _.filter(_.keys(req.form.values), valueKey => {
    return isChecked(valueKey, req);
  });
  return checked.length > 0;
}

module.exports = superclass => class AboutError extends superclass {
  getNextStep(req, res) {
    let next = super.getNextStep(req, res);
    const truncatedItems = getTruncatedItems(req);
    req.sessionModel.unset('triage');

    if (isChecked.call(this, 'conditions-error-checkbox', req) && req.sessionModel.get('location-applied') === 'yes') {
      req.sessionModel.set('triage', true);
    } else if (truncatedItems.length) {
      next = req.baseUrl + '/truncated';
      req.sessionModel.set('truncated-items', truncatedItems);
    } else if (this.referrer && this.referrer.indexOf('/check-details') !== -1) {
      next = req.baseUrl + '/check-details';
    }
    return next;
  }

  saveValues(req, res, callback) {
    const formData = _.clone(req.form.values);

    req.form.values = _.pick(formData, function (value, key) {
      return isChecked.call(this, key, req);
    }.bind(this));

    const diff = _.filter(_.keys(formData), key => {
      return !_.has(req.form.values, key);
    });

    req.sessionModel.unset(diff);

    super.saveValues(req, res, callback);
  }

  validate(req, res, next) {
    if (!anyChecked(req)) {
      return next({
        'error-selection': new this.ValidationError('error-selection', { type: 'required' })
      });
    }
    super.validate(req, res, next);
  }
};
