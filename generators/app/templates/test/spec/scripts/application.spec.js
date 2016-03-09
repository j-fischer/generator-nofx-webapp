define(['squire', 'jsmock', 'jshamcrest', 'moment'], function (Squire, JsMock, JsHamcrest, moment) {
  describe('application', function(){

    var _templateContent = "<div>content</div>";
    var _dateString = "Sep 25, 2016";

    var _underTest, _momentApi, _momentObj, _templates;

    JsMock.watch(function () {
      _templates = JsMock.mock("Templates", {
        application: function () {}
      });

      _momentApi = JsMock.mock("momentApi", moment);

      _momentObj = JsMock.mock("momentObj", {
        format: function(){}
      });
    });

    beforeEach(function (done) {
      var injector = new Squire();
      injector.
        mock('moment', _momentApi).
        mock('templates', _templates).
        require(['scripts/application'], function(theApp) {
          _underTest = theApp;
          done();
        });
    });

    afterEach(JsMock.assertWatched);

    describe("run", function(){
      it("loads default application layout", function(){
        _momentApi.once().with().returns(_momentObj);
        _momentObj.format.once().with("LLL").returns(_dateString);

        _templates.application.
          once().
          with(JsHamcrest.Matchers.equivalentMap({today: _dateString})).
          returns(_templateContent);

        _underTest.run();
      });
    });
  });
});
