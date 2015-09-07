'use strict';

var proxyquire = require('proxyquire');
var DateController = sinon.stub();
var CollectionFromController = proxyquire('../../../controllers/collection-from', {
  '../lib/date-controller': DateController
});

describe('controllers/collection-from', function () {

  describe('instantiated', function () {

    var controller;
    var args = {template: 'index'};

    beforeEach(function () {
      controller = new CollectionFromController(args);
    });

    it('has a dateKey equal to date-of-birth', function () {
      controller.dateKey.should.equal('collection-date');
    });

    it('calls DateController with the arguments', function () {
      DateController.should.have.been.calledWith(args);
    });
  });


  describe('validateField', function () {

    var controller;
    var args = {template: 'index'};

    var key = 'key';
    var req = {};

    beforeEach(function () {
      DateController.prototype.validateField = sinon.stub();
      controller = new CollectionFromController(args);
    });

    it('calls validateField on the DateController with key, request and false', function () {
      controller.validateField(key, req);

      DateController.prototype.validateField.should.have.been.calledWith(key, req, false);
    });
  });

});
