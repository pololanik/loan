jest.dontMock('../../constants.js');
jest.dontMock('../LoanStore');
jest.dontMock('object-assign');

describe('TodoStore', function() {

  var Constants = require('../../constants.js').ActionTypes;
  var AppDispatcher;
  var LoanStore;
  var callback;

  // mock actions
  var initSliders = {
    actionType: Constants.RECEIVE_SLIDERS_CONFIG,
    text: {
      amountMin: 5000,
      amountMax: 20000,
      amountStep: 500,
      amountDefaultValue: 5000,
      termMin: 3,
      termMax: 12,
      termStep: 1,
      termDefaultValue: 3
    }
  };
  var actionTodoDestroy = {
    actionType: Constants.TODO_DESTROY,
    id: 'replace me in test'
  };

  beforeEach(function() {
    AppDispatcher = require('../../Dispatcher');
    LoanStore = require('../LoanStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
});
