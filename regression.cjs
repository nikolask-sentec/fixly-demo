const fs = require("node:fs"),
  vm = require("node:vm"),
  assert = require("node:assert/strict");
let checks = 0;
const eq = (a, b) => {
  assert.equal(a, b);
  checks++;
};
const ok = (x) => {
  assert.ok(x);
  checks++;
};
const ctx = {
  URL,
  Date,
  Intl,
  savedLanguage: () => "en",
  translate: (x) => x,
  locales: { en: "en-US" },
};
vm.createContext(ctx);
vm.runInContext(
  fs.readFileSync("location-picker.js", "utf8").replaceAll("export ", ""),
  ctx,
);
vm.runInContext(
  fs
    .readFileSync("app.js", "utf8")
    .replace(/^import .*;\r?\n/gm, "")
    .replace(
      'createApp(appOptions).mount("#app");',
      "globalThis.options=appOptions;",
    ),
  ctx,
);
const o = ctx.options;
function app() {
  const a = o.data();
  for (const [k, v] of Object.entries(o.methods)) a[k] = v.bind(a);
  for (const [k, v] of Object.entries(o.computed))
    Object.defineProperty(a, k, { get: () => v.call(a) });
  return a;
}
function partner(a) {
  a.switchRole("Handyman");
  a.fullName = "Partner Bob";
  a.sampleId = true;
  a.partnerConsent = true;
  a.registrationStep = 3;
  a.submitRegistration();
  a.switchRole("Admin");
  a.reviewChecks = [true, true, true];
  a.review("Approved");
  eq(a.application, "Approved");
}
function booking(a) {
  a.switchRole("Customer");
  a.openBooking(a.services[0]);
  a.issue = "AC issue";
  a.date = "2099-01-01T10:00";
}
for (const url of [
  "",
  "https://maps.app.goo.gl/abc",
  "https://goo.gl/maps/abc",
  "https://www.google.com/maps/place/Bali",
  "https://www.google.co.id/maps/place/Bali",
])
  ok(ctx.validMapsLink(url));
for (const url of [
  "javascript:alert(1)",
  "https://google.com.evil.test/maps",
  "https://google.com/search",
  "https://user:pass@google.com/maps",
  "http://google.com/maps",
  "https://google.com:8443/maps",
  "bad",
])
  ok(!ctx.validMapsLink(url));
let a = app();
a.fullName = "Customer Alice";
a.switchRole("Handyman");
eq(a.fullName, "Andi — demo partner");
a.fullName = "Draft partner";
a.switchRole("Admin");
eq(a.fullName, "Andi — demo partner");
a.reviewChecks = [true, true, true];
a.review("Approved");
eq(a.application, "Pending review");
partner(a);
eq(a.fullName, "Partner Bob");
a.switchRole("Handyman");
a.fullName = "Unsubmitted edit";
a.switchRole("Admin");
eq(a.fullName, "Partner Bob");
a.switchRole("Customer");
eq(a.fullName, "Customer Alice");
a = app();
booking(a);
eq(a.bookingAddress.street, a.street);
a.addressMode = "another";
a.chooseAddress();
a.bookingAddress = {
  street: "Other house",
  area: "Benoa",
  instructions: "Blue gate",
  mapsLink: "https://maps.app.goo.gl/abc",
};
a.addressMode = "registered";
a.chooseAddress();
a.addressMode = "another";
a.chooseAddress();
eq(a.bookingAddress.street, "Other house");
a.book();
eq(a.jobs[0].area, "Benoa");
eq(a.jobs[0].serviceAddress.mapsLink, "https://maps.app.goo.gl/abc");
ok(a.street !== "Other house");
a.bookingAddress.street = "changed";
eq(a.jobs[0].serviceAddress.street, "Other house");
for (const date of ["2000-01-01T10:00", "bad", ""]) {
  booking(a);
  a.date = date;
  const n = a.jobs.length;
  a.book();
  eq(a.jobs.length, n);
}
for (const qty of [0, -1, 21, 1.5, NaN]) {
  booking(a);
  a.quantity = qty;
  const n = a.jobs.length;
  a.book();
  eq(a.jobs.length, n);
}
booking(a);
a.bookingAddress.mapsLink = "https://evil.test/";
let n = a.jobs.length;
a.book();
eq(a.jobs.length, n);
booking(a);
a.bookingAddress.area = "Ungasan";
a.book();
eq(a.jobs.length, n);
booking(a);
a.book();
booking(a);
a.book();
eq(new Set(a.jobs.map((j) => j.id)).size, a.jobs.length);
a = app();
partner(a);
a.move(a.jobs[0], "Assigned");
eq(a.jobs[0].status, "Assigned");
a.switchRole("Handyman");
a.move(a.jobs[0], "On the way");
a.move(a.jobs[0], "Diagnosing");
eq(a.jobs[0].quoteInput, 150000);
a.jobs[0].quoteInput = -1;
a.move(a.jobs[0], "Quote ready");
eq(a.jobs[0].status, "Diagnosing");
a.jobs[0].quoteInput = 180000;
a.move(a.jobs[0], "Quote ready");
eq(a.jobs[0].quote, 180000);
a.move(a.jobs[0], "Completed");
eq(a.jobs[0].status, "Quote ready");
a.switchRole("Customer");
a.move(a.jobs[0], "In progress");
eq(a.jobs[0].status, "In progress");
a.switchRole("Handyman");
a.move(a.jobs[0], "Completed");
eq(a.jobs[0].status, "Completed");
a = app();
a.move(a.jobs[0], "Cancelled");
a.switchRole("Handyman");
eq(a.displayedJobs.length, 0);
a.switchRole("Customer");
booking(a);
a.book();
partner(a);
a.move(a.jobs[0], "Assigned");
a.switchRole("Customer");
a.move(a.jobs[0], "Cancelled");
a.switchRole("Handyman");
eq(a.displayedJobs.length, 1);
eq(a.displayedJobs[0].status, "Cancelled");
a = app();
a.switchRole("Admin");
a.editService(a.services[0]);
a.editor.name = " ";
a.saveService();
ok(a.editor);
a.editor.name = "Updated";
a.editor.price = -1;
a.saveService();
ok(a.editor);
a.editor.price = 99000;
a.saveService();
eq(a.editor, null);
eq(a.services[0].published, false);
eq(a.jobs[0].price, 75000);
a.newGroup = " plumbing ";
a.addGroup();
eq(a.groups.length, 3);
a.newGroup = " ";
a.addGroup();
eq(a.groups.length, 3);
a.newGroup = "Painting";
a.addGroup();
eq(a.groups.length, 4);
a = app();
a.fullName = " ";
a.submitRegistration();
eq(a.registrationStep, 1);
a.fullName = "Valid";
a.phone = "abc";
a.submitRegistration();
eq(a.registrationStep, 1);
a.phone = "08123456789";
a.submitRegistration();
eq(a.registrationStep, 2);
a.mapsLink = "https://evil.test";
a.submitRegistration();
eq(a.registrationStep, 2);
a = app();
a.switchRole("Handyman");
a.registrationStep = 2;
a.submitRegistration();
eq(a.registrationStep, 2);
a.sampleId = true;
a.partnerConsent = true;
a.submitRegistration();
eq(a.registrationStep, 3);
a.reason = "Old rejection";
a.submitRegistration();
eq(a.reason, "");
eq(a.application, "Pending review");
a.language = "ru";
a.reset();
eq(a.language, "ru");
eq(a.role, "Customer");
eq(a.editor, null);
eq(a.submittedPartner, null);
eq(a.displayedJobs.length, 1);
eq(Object.keys(a.profiles).length, 0);
a=app(); booking(a);a.book();partner(a);for(const job of a.jobs)a.move(job,'Assigned');a.switchRole('Handyman');for(const job of a.jobs){a.move(job,'On the way');a.move(job,'Diagnosing');}a.jobs[0].quoteInput=210000;a.jobs[1].quoteInput=120000;a.move(a.jobs[0],'Quote ready');a.move(a.jobs[1],'Quote ready');eq(a.jobs[0].quote,210000);eq(a.jobs[1].quote,120000);
a=app();a.area='Benoa';eq(a.visibleServices.length,1);a.services[0].areas=[];eq(a.visibleServices.length,0);a.services[0].areas=['Benoa'];a.services[0].published=false;eq(a.visibleServices.length,0);a.services[0].published=true;eq(a.visibleServices.length,1);
console.log(
  `${checks} regression checks passed across links, profiles, booking, assignment, quotes, catalog and reset.`,
);
