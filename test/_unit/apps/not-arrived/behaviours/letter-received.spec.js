'use strict';

const moment = require('moment');

const Behaviour = require('../../../../../apps/not-arrived/behaviours/letter-received');
const Controller = require('hof').controller;

describe('apps/not-arrived/behaviours/letter-received', () => {
  let controller;
  let req;
  let res;

  beforeEach(done => {
    req = reqres.req();
    res = reqres.res();

    const LetterReceivedController = Behaviour(Controller);
    controller = new LetterReceivedController({ template: 'index', route: '/index' });
    controller._configure(req, res, done);
  });

  describe('saveValues', () => {
    let clock;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      // set up a fake "now" for tests which test dates
      const now = moment('2017-07-05T12:00:00Z').valueOf();
      clock = sinon.useFakeTimers(now);

      sandbox.stub(Controller.prototype, 'saveValues').yieldsAsync();
    });

    afterEach(() => {
      clock.restore();
      sandbox.restore();
    });

    it('calls super saveValues', () => {
      controller.saveValues(req, res, () => {
        Controller.prototype.saveValues.should.have.been.calledOnce;
        Controller.prototype.saveValues.should.have.been.calledWith(req, res);
      });
    });

    it('sets range to session if delivery date is within 10 working days of current date', () => {
      req.form.values['delivery-date'] = '2017-06-22';

      controller.saveValues(req, res, () => {
        req.sessionModel.get('week-day-range').should.eql({
          weekDaysSince: 9,
          weekDaysUntil: 1
        });
      });
    });

    it('sets next step if delivery date is not within 10 working days of current date', () => {
      req.form.values['delivery-date'] = '2017-06-20';

      controller.saveValues(req, res, () => {
        req.form.options.next.should.equal('/same-address');
      });
    });

    it('sets next step if no-delivery date is provided', () => {
      req.form.values['delivery-date'] = '';
      req.form.values['no-letter'] = 'true';

      controller.saveValues(req, res, () => {
        req.form.options.next.should.equal('/same-address');
      });
    });
  });
});
