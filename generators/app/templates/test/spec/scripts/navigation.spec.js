define(['squire', 'jsmock', 'jshamcrest', 'moment'], function (Squire, JsMock, JsHamcrest, moment) {
  describe('navigation', function(){

    var _templateContent = "<nav>content</nav>";

    var _underTest, _momentApi, _momentObj, _templates;

    JsMock.watch(function () {
      _templates = JsMock.mock("Templates", {
        navigation: function () {}
      });
    });

    beforeEach(function (done) {
      var injector = new Squire();
      injector.
        mock('moment', _momentApi).
        mock('templates', _templates).
        require(['scripts/navigation'], function(nav) {
          _underTest = nav;
          done();
        });
    });

    afterEach(JsMock.assertWatched);

    describe("init", function(){
      it("loads default navigation template", function(){
        _templates.navigation.
          once().
          with().
          returns(_templateContent);

        _underTest.init();
      });
    });
  });
});
