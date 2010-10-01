import("etherpad.log");
import("faststatic");
import("etherpad.utils.*");
import("etherpad.globals.*");
import("etherpad.helpers");

function handlePath(arg) {
  helpers.addToHead("<script src='/static/plugins/debugFirebugLite/js/firebug-lite.js'></script>");
}
