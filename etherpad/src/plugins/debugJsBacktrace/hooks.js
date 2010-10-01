import("etherpad.log");
import("faststatic");
import("etherpad.utils.*");
import("etherpad.globals.*");
import("etherpad.helpers");

function handlePath(arg) {
 helpers.includeCss('javascript-stacktrace/qunit.css', ["debugJsBacktrace"]);
  helpers.includeJs('javascript-stacktrace/qunit.js', ["debugJsBacktrace"]);
  helpers.includeJs('javascript-stacktrace/stacktrace.js', ["debugJsBacktrace"]);
  helpers.includeJs('load.js', ["debugJsBacktrace"]);
}
