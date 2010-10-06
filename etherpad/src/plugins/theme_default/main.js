import("etherpad.log");
import("plugins.theme_default.static.js.main");

function theme_defaultInit() {
 this.hooks = [];
 this.client = new main.theme_defaultInit();
 this.description = 'Default theme';

 this.install = install;
 this.uninstall = uninstall;
}

function install() {
 log.info("Installing default theme");
}

function uninstall() {
 log.info("Uninstalling default theme");
}

