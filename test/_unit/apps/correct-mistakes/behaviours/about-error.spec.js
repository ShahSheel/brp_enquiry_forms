'use strict';

const Behaviour = require('../../../../../apps/correct-mistakes/behaviours/about-error');
const Controller = require('hof').controller;

describe('apps/correct-mistakes/behaviours/about-error', () => {
  let controller;
  let req;
  let res;

  beforeEach(done => {
    req = reqres.req();
    res = reqres.res();

    const AboutErrorController = Behaviour(Controller);
    controller = new AboutErrorController({ template: 'index', route: '/index' });
    controller._configure(req, res, done);
  });

  describe('.saveValues()', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.stub(Controller.prototype, 'saveValues').yieldsAsync();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('removes values that are not checked and have unchecked counterparts', () => {
      sandbox.stub(req.sessionModel, 'unset');

      req.form.values = {
        'foo-checkbox': '',
        foo: 'bar',
        'baz-checkbox': 'true',
        baz: 'foo'
      };

      controller.saveValues(req, res, () => {
        req.sessionModel.unset.should.have.been.calledWithExactly(['foo-checkbox', 'foo']);
      });
    });

    it('always calls the parent controller saveValues with the arguments', () => {
      controller.saveValues(req, res, () => {
        Controller.prototype.saveValues.should.have.been.calledOnce
          .and.have.been.calledWith(req, res);
      });
    });
  });

  describe('.getNextStep()', () => {
    beforeEach(() => {
      req.baseUrl = '/foo';
      sinon.stub(req.sessionModel, 'unset');
    });
    afterEach(() => {
      req.sessionModel.unset.restore();
    });

    it('unsets the triage flag', () => {
      controller.getNextStep(req, res, () => {});
      req.sessionModel.unset.should.have.been.calledWith('triage');
    });

    describe('when collection location is UK and conditions and length was checked', () => {
      beforeEach(() => {
        req.form.values['conditions-error-checkbox'] = 'true';
        req.sessionModel.set('location-applied', 'yes');
      });

      it('sets a triage flag "/conditions-and-length"', () => {
        controller.getNextStep(req, res, () => {});
        req.sessionModel.get('triage').should.equal(true);
      });
    });

    describe('when entered first name is more than 30 characters', () => {
      beforeEach(() => {
        req.form.values['first-name-error-checkbox'] = 'true';
        req.form.values['first-name-error'] = 'foobarbazfoobarbazfoobarbazfoobarbaz';
      });
      it('returns baseUrl and "/truncated"', () => {
        controller.getNextStep(req, res, () => {}).should.equal('/foo/truncated');
        req.sessionModel.get('truncated-items').should.eql([{id: 'first-name-error', max: 30}]);
      });
    });

    describe('when last name is more than 30 characters', function () {
      beforeEach(function () {
        req.form.values['last-name-error-checkbox'] = 'true';
        req.form.values['last-name-error'] = 'foobarbazfoobarbazfoobarbazfoobarbaz';
      });
      it('returns baseUrl and "/truncated"', () => {
        controller.getNextStep(req, res, () => {}).should.equal('/foo/truncated');
        req.sessionModel.get('truncated-items').should.eql([{id: 'last-name-error', max: 30}]);
      });
    });

    describe('when birth place is more than 16 characters', () => {
      beforeEach(() => {
        req.form.values['birth-place-error-checkbox'] = 'true';
        req.form.values['birth-place-error'] = 'foobarbazfoobarba';
      });
      it('returns baseUrl and "/truncated"', () => {
        controller.getNextStep(req, res, () => {}).should.equal('/foo/truncated');
        req.sessionModel.get('truncated-items').should.eql([{id: 'birth-place-error', max: 16}]);
      });
    });
  });

  describe('.validate', () => {
    it('returns an error-selection required error if none are checked', () => {
      req.form.values['first-name-error-checkbox'] = '';
      req.form.values['last-name-error-checkbox'] = '';
      req.form.values['birth-place-error-checkbox'] = '';
      req.form.values['date-of-birth-error-checkbox'] = '';

      controller.validate(req, res, err => {
        err['error-selection'].should.be.an.instanceof(controller.ValidationError);
        err['error-selection'].should.have.property('type').and.equal('required');
      });
    });
  });
});
