const fs = require("fs"),
  vm = require("vm"),
  assert = require("assert/strict");
let code = fs
  .readFileSync("app.js", "utf8")
  .replace(/^import .*;\r?\n/gm, "")
  .replace(
    'createApp(appOptions).mount("#app");',
    "globalThis.options=appOptions;",
  );
const ctx = {
  LocationPicker: {},
  validMapsLink: () => true,
  savedLanguage: () => "en",
  translate: (x) => x,
  locales: { en: "en-US" },
  Date,
  Intl,
};
vm.createContext(ctx);
vm.runInContext(code, ctx);
const o = ctx.options;
function app() {
  let a = o.data();
  for (const [k, v] of Object.entries(o.methods)) a[k] = v.bind(a);
  return a;
}
let a = app();
a.fullName = "Customer Alice";
a.switchRole("Handyman");
assert.notEqual(a.fullName, "Customer Alice");
a.fullName = "Partner Bob";
a.switchRole("Customer");
assert.equal(a.fullName, "Customer Alice");
a.switchRole("Admin");
assert.equal(a.fullName, "Partner Bob");
a.reviewChecks = [true, true, true];
a.reason = "old";
a.editor = {};
a.filter = "missing";
a.reset();
assert.equal(a.reason, "");
assert.equal(a.editor, null);
assert.equal(a.filter, "All services");
assert.ok(a.reviewChecks.every((x) => !x));
a.newGroup = "   ";
a.addGroup();
assert.equal(a.groups.length, 3);
a.newGroup = " plumbing ";
a.addGroup();
assert.equal(a.groups.length, 3);
a.selected = a.services[0];
a.area = "Benoa";
a.openBooking(a.services[0]);
assert.equal(a.bookingAddress.street, a.street);
a.addressMode = "another";
a.chooseAddress();
a.bookingAddress = {
  street: "Other house",
  area: "Benoa",
  instructions: "Side gate",
  location: { x: 20, y: 30 },
};
a.date = "2000-01-01T10:00";
a.issue = "AC issue";
let n = a.jobs.length;
a.book();
assert.equal(a.jobs.length, n);
a.date = "2099-01-01T10:00";
a.book();
assert.equal(a.jobs[0].area, "Benoa");
assert.equal(a.jobs[0].price, 75000);
assert.equal(a.jobs[0].serviceAddress.street, "Other house");
assert.notEqual(a.street, "Other house");
a.bookingAddress.street = "changed";
assert.equal(a.jobs[0].serviceAddress.street, "Other house");
a.role = "Handyman";
a.registrationStep = 3;
a.reason = "old rejection";
a.submitRegistration();
assert.equal(a.reason, "");
assert.equal(a.application, "Pending review");
console.log("Regression checks passed");
