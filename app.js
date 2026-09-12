import { createApp } from "./vue.js";
import { translate, savedLanguage, locales } from "./i18n.js";

import { LocationPicker, validMapsLink } from "./location-picker.js";

const initial = () => ({
  groups: ["AC & cooling", "Plumbing", "Electrical"],
  services: [
    {
      id: 1,
      name: "AC deep cleaning",
      group: "AC & cooling",
      icon: "❄",
      description:
        "Fresh filters, a clean evaporator and a cooling check. Give your AC a fresh start.",
      price: 75000,
      unit: "AC unit",
      published: true,
      areas: ["Jimbaran", "Benoa"],
    },
    {
      id: 2,
      name: "Leaking tap repair",
      group: "Plumbing",
      icon: "◉",
      description:
        "Find the leak and repair your tap. Replacement fixtures are quoted separately.",
      price: 60000,
      unit: "tap",
      published: true,
      areas: ["Jimbaran"],
    },
    {
      id: 3,
      name: "Light installation",
      group: "Electrical",
      icon: "☀",
      description:
        "Install your new light on an existing connection. A brighter room, without the hassle.",
      price: 50000,
      unit: "fitting",
      published: true,
      areas: ["Jimbaran", "Kutuh"],
    },
  ],
  jobs: [
    {
      id: "FX-2408",
      name: "AC deep cleaning",
      price: 75000,
      quantity: 2,
      status: "Requested",
      date: "Tomorrow, 09:00",
      issue: "The living room AC is not cooling well.",
      quote: 0,
      area: "Jimbaran",
    },
  ],
  application: "Pending review",
});

const appOptions = {
  components: { LocationPicker },
  data() {
    return {
      ...initial(),
      language: savedLanguage(),
      role: "Customer",
      page: "Overview",
      area: "Jimbaran",
      filter: "All services",
      toast: "",
      selected: null,
      quantity: 1,
      issue: "",
      date: "",
      editor: null,
      newGroup: "",
      registrationStep: 1,
      sampleId: false,
      profiles: {},
      submittedPartner: null,
      partnerConsent: false,
      addressDrafts: {},
      nextJobId: 2409,
      nextServiceId: 4,
      accessInstructions: "",
      mapsLink: "",
      registeredArea: "Jimbaran",
      addressMode: "registered",
      bookingAddress: null,
      bank: "BCA",
      bankNumber: "000123456789",
      fullName: "Andi — demo partner",
      phone: "0812 0000 0000",
      email: "partner@example.com",
      street: "Sample home, Jimbaran",
      pin: { x: 57, y: 48 },
      quoteInput: 150000,
      reason: "",
      reviewChecks: [false, false, false],
      reviewError: "",
      serviceAreas: [
        "Jimbaran",
        "Benoa",
        "Kutuh",
        "Pecatu",
        "Ungasan",
        "Tanjung Benoa",
      ],
    };
  },
  mounted() {
    this.applyLanguage();
  },
  watch: {
    language() {
      this.applyLanguage();
    },
  },
  computed: {
    displayedJobs() {
      return this.role === "Handyman"
        ? this.jobs.filter((job) => job.assigned)
        : this.jobs;
    },
    visibleServices() {
      return this.services.filter(
        (s) =>
          s.published &&
          s.areas.includes(this.area) &&
          (this.filter === "All services" || s.group === this.filter),
      );
    },
    navigation() {
      return this.role === "Customer"
        ? ["Overview", "My bookings", "Registration"]
        : this.role === "Admin"
          ? ["Overview", "Service catalog", "Partner approvals", "Jobs"]
          : ["Overview", "My jobs", "Registration"];
    },
    activeJobs() {
      return this.jobs.filter(
        (j) => !["Completed", "Cancelled"].includes(j.status),
      );
    },
    approved() {
      return this.application === "Approved";
    },
  },
  methods: {
    validMapsLink,
    t(value) {
      return translate(value, this.language);
    },
    applyLanguage() {
      document.documentElement.lang =
        this.language === "zh" ? "zh-Hans" : this.language;
      document.title = "Fixly • " + this.t("A little help. A better home.");
      try {
        localStorage.setItem("fixly-language", this.language);
      } catch {}
    },
    money(n) {
      return new Intl.NumberFormat(locales[this.language], {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(n);
    },
    notify(message) {
      this.toast = message;
    },
    switchRole(role) {
      const fields = [
        "fullName",
        "email",
        "phone",
        "street",
        "pin",
        "accessInstructions",
        "mapsLink",
        "registeredArea",
        "bank",
        "bankNumber",
        "sampleId",
        "partnerConsent",
      ];
      if (this.role !== "Admin")
        this.profiles[this.role] = Object.fromEntries(
          fields.map((key) => [key, JSON.parse(JSON.stringify(this[key]))]),
        );
      const defaults = appOptions.data();
      Object.assign(
        this,
        (role === "Admin" ? this.submittedPartner : this.profiles[role]) ||
          Object.fromEntries(fields.map((key) => [key, defaults[key]])),
      );
      this.registrationStep = 1;
      this.role = role;
      this.page = "Overview";
      this.selected = null;
      this.editor = null;
      this.toast = "";
    },
    reset() {
      const language = this.language;
      Object.assign(this, appOptions.data(), { language });
      this.registrationStep = 1;
      this.sampleId = false;
      this.notify("Demo reset. All changes stay in this browser session.");
    },
    openBooking(service) {
      this.selected = service;
      this.quantity = 1;
      this.issue = "";
      this.date = "";
      this.addressMode = "registered";
      this.addressDrafts = {};
      this.bookingAddress = null;
      this.previousAddressMode = null;
      this.chooseAddress();
    },
    chooseAddress() {
      if (this.bookingAddress && this.previousAddressMode)
        this.addressDrafts[this.previousAddressMode] = JSON.parse(
          JSON.stringify(this.bookingAddress),
        );
      this.previousAddressMode = this.addressMode;
      this.bookingAddress =
        this.addressDrafts[this.addressMode] ||
        (this.addressMode === "registered"
          ? {
              street: this.street,
              area: this.registeredArea,
              instructions: this.accessInstructions,
              mapsLink: this.mapsLink,
            }
          : { street: "", area: this.area, instructions: "", mapsLink: "" });
    },
    book() {
      if (
        !this.selected ||
        !this.selected.published ||
        !this.bookingAddress ||
        !this.bookingAddress.street.trim() ||
        !validMapsLink(this.bookingAddress.mapsLink) ||
        !this.selected.areas.includes(this.bookingAddress.area) ||
        !Number.isInteger(this.quantity) ||
        this.quantity < 1 ||
        this.quantity > 20 ||
        !this.issue.trim() ||
        !this.date ||
        !Number.isFinite(new Date(this.date).getTime()) ||
        new Date(this.date).getTime() <= Date.now()
      ) {
        this.notify("Check the address, visit time and booking details.");
        return;
      }
      this.jobs.unshift({
        id: "FX-" + this.nextJobId++,
        name: this.selected.name,
        area: this.bookingAddress.area,
        serviceAddress: JSON.parse(JSON.stringify(this.bookingAddress)),
        price: this.selected.price,
        quantity: this.quantity,
        date: this.date.replace("T", ", "),
        issue: this.issue,
        status: "Requested",
        quote: 0,
      });
      this.selected = null;
      this.page = "My bookings";
      this.notify("Demo booking created. Switch to Admin to assign it.");
    },
    addGroup() {
      const name = this.newGroup.trim();
      if (
        name &&
        !this.groups.some((group) => group.toLowerCase() === name.toLowerCase())
      )
        this.groups.push(name);
      this.newGroup = "";
    },
    validateVisit(event) {
      const input = event.target;
      input.setCustomValidity(
        new Date(input.value).getTime() <= Date.now()
          ? this.t("Choose a future visit time.")
          : "",
      );
    },
    editService(service) {
      this.editor = service
        ? { ...service, areas: [...service.areas] }
        : {
            id: this.nextServiceId++,
            name: "",
            group: this.groups[0],
            icon: "⌂",
            description: "",
            price: 75000,
            unit: "visit",
            published: false,
            areas: ["Jimbaran"],
          };
    },
    saveService() {
      if (
        !this.editor ||
        !this.editor.name.trim() ||
        !this.editor.description.trim() ||
        !this.editor.unit.trim() ||
        !this.groups.includes(this.editor.group) ||
        !Number.isInteger(this.editor.price) ||
        this.editor.price < 1 ||
        this.editor.price > 1000000000 ||
        !this.editor.areas.length ||
        this.editor.areas.some((area) => !this.serviceAreas.includes(area))
      ) {
        this.notify(
          "Complete all service details with a valid price and area.",
        );
        return;
      }
      for (const key of ["name", "description", "unit"])
        this.editor[key] = this.editor[key].trim();
      const index = this.services.findIndex((s) => s.id === this.editor.id);
      const saved = {
        ...this.editor,
        published: false,
        areas: [...this.editor.areas],
      };
      if (index < 0) this.services.push(saved);
      else this.services[index] = saved;
      this.editor = null;
      this.notify("Saved as a demo draft. Publish it to show it to customers.");
    },
    review(decision) {
      if (this.role !== "Admin" || this.application !== "Pending review")
        return;
      if (decision === "Approved" && !this.sampleId) {
        this.reviewError =
          "Attach a sample ID and submit the partner application first.";
        return;
      }
      if (decision === "Approved" && !this.reviewChecks.every(Boolean)) {
        this.reviewError =
          "Check all three verification items before approval.";
        return;
      }
      if (decision !== "Approved" && !this.reason.trim()) {
        this.reviewError = "Add a reason for the applicant.";
        return;
      }
      this.application = decision;
      this.reviewError = "";
      this.notify("Application updated. See the Handyman view for the result.");
    },
    move(job, status) {
      const allowed = {
        Admin: { Requested: ["Assigned"] },
        Customer: {
          Requested: ["Cancelled"],
          Assigned: ["Cancelled"],
          "Quote ready": ["In progress"],
        },
        Handyman: {
          Assigned: ["On the way"],
          "On the way": ["Diagnosing"],
          Diagnosing: ["Quote ready"],
          "In progress": ["Completed"],
        },
      };
      if (
        !this.jobs.includes(job) ||
        !allowed[this.role]?.[job.status]?.includes(status)
      )
        return;
      if ((this.role === "Handyman" || status === "Assigned") && !this.approved)
        return;
      if (this.role === "Handyman" && !job.assigned) return;
      if (status === "Quote ready") {
        if (
          !Number.isInteger(job.quoteInput) ||
          job.quoteInput < 1 ||
          job.quoteInput > 1000000000
        )
          return;
        job.quote = job.quoteInput;
      }
      if (status === "Assigned") job.assigned = true;
      if (status === "Diagnosing") job.quoteInput = job.price * job.quantity;
      job.status = status;
      this.notify("Demo job updated: " + status);
    },
    pickPin(event) {
      const box = event.currentTarget.getBoundingClientRect();
      this.pin = {
        x: Math.round(((event.clientX - box.left) / box.width) * 100),
        y: Math.round(((event.clientY - box.top) / box.height) * 100),
      };
    },
    submitRegistration() {
      if (
        !this.fullName.trim() ||
        !this.street.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) ||
        !/^\+?[0-9 ()-]{8,22}$/.test(this.phone) ||
        !validMapsLink(this.mapsLink)
      ) {
        this.notify("Enter a name, valid email, phone number and address.");
        return;
      }
      if (
        this.role === "Handyman" &&
        this.registrationStep >= 2 &&
        (!this.sampleId ||
          !this.partnerConsent ||
          !/^[0-9]+$/.test(this.bankNumber))
      ) {
        this.notify(
          "Attach a sample ID, enter bank details and confirm partner status.",
        );
        return;
      }
      if (this.registrationStep < 3) {
        this.registrationStep++;
        return;
      }
      if (this.role === "Handyman") {
        this.submittedPartner = Object.fromEntries(
          [
            "fullName",
            "email",
            "phone",
            "street",
            "accessInstructions",
            "mapsLink",
            "registeredArea",
            "bank",
            "bankNumber",
            "sampleId",
            "partnerConsent",
          ].map((key) => [key, this[key]]),
        );
        this.reason = "";
        this.reviewError = "";
        this.application = "Pending review";
        this.reviewChecks = [false, false, false];
        this.notify(
          "Demo application sent for manual review. Switch to Admin → Partner approvals.",
        );
      } else this.notify("Demo profile ready. You can now explore services.");
      this.page = "Overview";
      this.registrationStep = 1;
    },
  },
  template: `
  <div class="demo-bar"><span><b>{{ t("FIXLY DESIGN PREVIEW") }}</b>{{ t("· Sample data only. No real bookings, uploads or payments.") }}</span><button @click="reset">{{ t("Reset demo ↻") }}</button></div>
  <header><a class="logo" href="#" @click.prevent="page='Overview'">fixly<span>.</span></a><div class="role-switch" :aria-label="t(&quot;Choose app view&quot;)"><button v-for="view in ['Customer','Admin','Handyman']" :key="view" :class="{active:role===view}" @click="switchRole(view)">{{ t(view) }}</button></div><label class="language-picker">{{ t('Language') }}<select v-model="language" aria-label="Language / Bahasa / 语言 / Язык"><option value="en">English</option><option value="id">Bahasa Indonesia</option><option value="zh">简体中文</option><option value="ru">Русский</option></select></label></header>
  <div class="shell"><aside><div class="workspace-label">{{ t(role==='Handyman'?'PARTNER WORKSPACE':role.toUpperCase()+' WORKSPACE') }}</div><nav><button v-for="(item,i) in navigation" :key="item" :class="{active:page===item}" @click="page=item;toast='' "><span>{{ t(['◫','▤','◎','↗'][i]) }}</span>{{ t(item) }}<b v-if="item==='Partner approvals'&&application==='Pending review'">1</b></button></nav><div class="sidebar-note"><span class="small-icon">✦</span><h3>{{ t("Good help.") }}<br>{{ t("Close to home.") }}</h3><p>{{ t(role==='Customer'?'A comfortable home starts with a little care.':'Better service starts with people who care.') }}</p></div><small>Jimbaran, Indonesia<br>{{ t("Interactive prototype · v1") }}</small></aside>
  <main><div class="page-top"><div><p class="eyebrow">{{ t(role==='Customer'?'YOUR HOME, IN GOOD HANDS':role==='Admin'?'KEEP EVERYTHING RUNNING':'INDEPENDENT SERVICE PARTNERS') }}</p><h1>{{ t(page==='Overview'?(role==='Customer'?'A little help. A better home.':role==='Admin'?'Your service desk.':'Make today a good workday.'):page) }}</h1></div><label v-if="role==='Customer'" class="area">{{ t("⌖ Service area") }}<select v-model="area"><option v-for="a in serviceAreas" :value="a">{{ t(a) }}</option></select></label><span v-else class="pill">{{ t(role==='Admin'?'Admin demo':application) }}</span></div>
  <div v-if="toast" class="notice" role="status">{{ t(toast) }}<button :aria-label="t(&quot;Dismiss message&quot;)" @click="toast=''">×</button></div>

  <template v-if="role==='Customer'&&page==='Overview'">
    <section class="hero"><div><span class="tag">{{ t("LESS TO WORRY ABOUT") }}</span><h2>{{ t("That little repair?") }}<br>{{ t("Let’s take care of it.") }}</h2><p>{{ t("Book skilled help for your home, with clear prices and a time that works for you.") }}</p><button class="primary" @click="$refs.services.scrollIntoView({behavior:'smooth'})">{{ t("Find a service") }}<span>↗</span></button></div><div class="house" aria-hidden="true"><div class="sun"></div><div class="roof"></div><div class="house-body"><i class="window"></i><i class="door"></i></div><div class="plant">✦</div><span class="house-label">{{ t("⌂   A happy home") }}</span></div></section>
    <div class="section-title" ref="services"><h2>{{ t("What can we help with?") }}</h2><span>{{ t(visibleServices.length) }} {{ t("services near you") }}</span></div><div class="filters"><button v-for="g in ['All services',...groups]" :class="{active:filter===g}" @click="filter=g">{{ t(g) }}</button></div>
    <div class="service-grid"><article class="service card" v-for="s in visibleServices" :key="s.id"><div class="service-icon">{{ t(s.icon) }}</div><small>{{ t(s.group) }}</small><h3>{{ t(s.name) }}</h3><p>{{ t(s.description) }}</p><div class="service-bottom"><div><b>{{ t(money(s.price)) }}</b><small>{{ t("per") }} {{ t(s.unit) }}</small></div><button class="round" :aria-label="t('Book '+s.name)" @click="openBooking(s)">↗</button></div></article><p v-if="!visibleServices.length" class="card">{{ t("No published services here yet. Try another area.") }}</p></div>
    <div class="trust-strip"><span>{{ t("✓ Clear unit pricing") }}</span><span>{{ t("✓ Manually verified partners") }}</span><span>{{ t("✓ Approve the quote before work") }}</span></div>
  </template>

  <template v-if="role==='Admin'&&page==='Overview'"><div class="stats"><div class="card"><small>{{ t("Active jobs") }}</small><strong>{{ t(activeJobs.length) }}</strong><span>{{ t("Across all service areas") }}</span></div><div class="card"><small>{{ t("Published services") }}</small><strong>{{ t(services.filter(s=>s.published).length) }}</strong><span>{{ t(serviceAreas.length) }} {{ t("service areas") }}</span></div><div class="card"><small>{{ t("Waiting for verification") }}</small><strong>{{ t(application==='Pending review'?1:0) }}</strong><span>{{ t("Independent partner applications") }}</span></div></div><section class="card action-card"><div><span class="eyebrow">{{ t("PEOPLE FIRST") }}</span><h2>{{ t("A new partner is ready for review.") }}</h2><p>{{ t("Review identity, contact and bank details before opening job access.") }}</p></div><button class="primary" @click="page='Partner approvals'">{{ t("Review application ↗") }}</button></section><div class="section-title"><h2>{{ t("Recent requests") }}</h2><button class="text-button" @click="page='Jobs'">{{ t("Manage jobs →") }}</button></div></template>

  <template v-if="role==='Handyman'&&page==='Overview'"><section class="hero partner-hero"><div><span class="tag">{{ t("YOUR SKILLS. YOUR NEXT OPPORTUNITY.") }}</span><h2>{{ t(approved?'Ready to make someone’s day?':'A quick review, then you’re ready.') }}</h2><p>{{ t(approved?'Your assigned jobs and next steps are all here.':'Your application needs manual approval before you can receive household service jobs.') }}</p><button class="primary" @click="page=approved?'My jobs':'Registration'">{{ t(approved?'View my jobs ↗':'Preview registration ↗') }}</button></div><div class="partner-mark" aria-hidden="true">✦</div></section><div class="stats"><div class="card"><small>{{ t("Application") }}</small><strong class="status-text">{{ t(application) }}</strong><span>{{ t("Independent partner") }}</span></div><div class="card"><small>{{ t("Assigned jobs") }}</small><strong>{{ t(approved?jobs.filter(j=>!['Requested','Cancelled','Completed'].includes(j.status)).length:0) }}</strong><span>{{ t("Verified access required") }}</span></div><div class="card"><small>{{ t("Completed") }}</small><strong>{{ t(jobs.filter(j=>j.status==='Completed').length) }}</strong><span>{{ t("In this demo session") }}</span></div></div></template>

  <template v-if="page==='My bookings'||page==='Jobs'||page==='My jobs'||(role==='Admin'&&page==='Overview')"><div v-if="role==='Handyman'&&!approved" class="card empty"><span class="service-icon">◎</span><h2>{{ t("Your application is") }} {{ t(application.toLowerCase()) }}.</h2><p>{{ t(reason||'An administrator must approve your details before you can receive jobs.') }}</p><p class="hint">{{ t("For this walkthrough, switch to Admin → Partner approvals.") }}</p></div><template v-else><article class="card job" v-for="j in displayedJobs" :key="j.id"><div class="job-header"><span class="job-id">{{ t(j.id) }}</span><span class="pill">{{ t(j.status) }}</span></div><h3>{{ t(j.name) }}</h3><p>{{ t(j.issue) }}</p><div class="job-details"><span>◷ {{ t(j.date) }}</span><span>⌖ {{ t(j.area) }}<span v-if="j.serviceAddress"><br>{{ j.serviceAddress.street }}<br>{{ j.serviceAddress.instructions }}<br><a v-if="j.serviceAddress.mapsLink && validMapsLink(j.serviceAddress.mapsLink)" :href="j.serviceAddress.mapsLink" target="_blank" rel="noopener noreferrer">{{ t("Open in Google Maps") }}</a></span></span><span>{{ t(money(j.price)) }} × {{ t(j.quantity) }}</span></div><p v-if="j.quote"><b>{{ t("Total work quote:") }} {{ t(money(j.quote)) }}</b></p><div class="job-actions"><button v-if="role==='Admin'&&j.status==='Requested'" class="primary" :disabled="!approved" @click="move(j,'Assigned')">{{ t("Assign partner") }}</button><small v-if="role==='Admin'&&!approved">{{ t("Approve the sample partner first.") }}</small><template v-if="role==='Handyman'"><button v-if="j.status==='Assigned'" class="primary" @click="move(j,'On the way')">{{ t("Start travelling") }}</button><button v-if="j.status==='On the way'" class="primary" @click="move(j,'Diagnosing')">{{ t("I’ve arrived") }}</button><form v-if="j.status==='Diagnosing'" @submit.prevent="move(j,'Quote ready')"><label>{{ t("Total quote (IDR)") }}<input type="number" min="1" max="1000000000" v-model.number="j.quoteInput" required></label><button class="primary">{{ t("Send quote") }}</button></form><button v-if="j.status==='In progress'" class="primary" @click="move(j,'Completed')">{{ t("Complete work") }}</button></template><template v-if="role==='Customer'"><button v-if="j.status==='Quote ready'" class="primary" @click="move(j,'In progress')">{{ t("Approve quote") }}</button><button v-if="['Requested','Assigned'].includes(j.status)" class="secondary" @click="move(j,'Cancelled')">{{ t("Cancel request") }}</button></template><small v-if="j.status==='Completed'">{{ t("Payment integration is planned; no payment is collected.") }}</small></div></article><p v-if="!displayedJobs.length" class="card empty">{{ t("No bookings yet. Explore the services to create a sample request.") }}</p></template></template>

  <template v-if="role==='Admin'&&page==='Service catalog'"><div class="catalog-toolbar"><form @submit.prevent="addGroup" class="inline"><input v-model="newGroup" :placeholder="t(&quot;New job group&quot;)" :aria-label="t(&quot;New job group&quot;)" required maxlength="60"><button class="secondary">{{ t("Add group") }}</button></form><button class="primary" @click="editService(null)">{{ t("+ Create job item") }}</button></div><div class="card table-wrap"><table><thead><tr><th>{{ t("Service / job group") }}</th><th>{{ t("Unit price") }}</th><th>{{ t("Availability by area") }}</th><th>{{ t("Status") }}</th><th>{{ t("Actions") }}</th></tr></thead><tbody><tr v-for="s in services"><td><b>{{ t(s.name) }}</b><small>{{ t(s.group) }}</small></td><td>{{ t(money(s.price)) }}<small>/ {{ t(s.unit) }}</small></td><td><label v-for="a in serviceAreas" class="check"><input type="checkbox" :value="a" v-model="s.areas">{{ t(a) }}</label></td><td><span class="pill">{{ t(s.published?'Published':'Draft') }}</span></td><td><button class="text-button" @click="editService(s)">{{ t("Edit") }}</button><button class="text-button" :disabled="!s.published&&!s.areas.length" @click="s.published=!s.published">{{ t(s.published?'Unpublish':'Publish') }}</button></td></tr></tbody></table></div><p class="hint">{{ t("Area switches immediately change the customer demo. Editing a demo item saves it as a draft until you publish it again. Existing bookings keep their original unit price.") }}</p></template>

  <template v-if="role==='Admin'&&page==='Partner approvals'"><div class="review-grid"><section class="card"><div class="job-header"><span class="eyebrow">{{ t("PARTNER APPLICATION") }}</span><span class="pill">{{ t(application) }}</span></div><h2>{{ t(fullName) }}</h2><p>{{ t("Independent partner") }} · {{ registeredArea }}</p><dl><dt>{{ t("Email") }}</dt><dd>{{ t(email) }}</dd><dt>{{ t("Phone") }}</dt><dd>{{ t(phone) }}</dd><dt>{{ t("Home base") }}</dt><dd>{{ t(street) }}<br><a v-if="mapsLink && validMapsLink(mapsLink)" :href="mapsLink" target="_blank" rel="noopener noreferrer">{{t("Open in Google Maps")}}</a></dd><dt>{{ t("Bank") }}</dt><dd>{{ t(bank) }} · {{ t(bankNumber) }}</dd></dl><p v-if="!sampleId" class="notice">{{t("No sample ID attached")}}</p><div v-else class="sample-id"><b>{{ t("SAMPLE ID — NOT VALID") }}</b><div class="id-content"><span>◎</span><div>{{ t("DEMO PARTNER") }}<br><small>{{ t("Illustration for design review only") }}<br>{{ t("No actual identity document") }}</small></div></div></div></section><section class="card"><h2>{{ t("Manual verification") }}</h2><p>{{ t("Confirm the required details before approving a partner.") }}</p><label class="check review-check" v-for="(label,i) in ['ID image is readable and matches the applicant','Email and phone details have been checked','Bank details have been checked']"><input type="checkbox" v-model="reviewChecks[i]">{{ t(label) }}</label><label>{{ t("Review notes") }}<textarea v-model="reason" :placeholder="t(&quot;Explain any changes needed&quot;)" maxlength="500"></textarea></label><p v-if="reviewError" class="error" role="alert">{{ t(reviewError) }}</p><div class="stack" v-if="application==='Pending review'"><button class="primary" @click="review('Approved')">{{ t("Approve partner") }}</button><button class="secondary" @click="review('Changes requested')">{{ t("Request changes") }}</button><button class="text-button" @click="review('Rejected')">{{ t("Reject application") }}</button></div><p v-else class="notice">{{ t("Review saved:") }} {{ t(application) }}.</p></section></div></template>

  <template v-if="page==='Registration'"><div class="registration-layout"><section><span class="eyebrow">{{ t(role==='Handyman'?'BECOME AN INDEPENDENT PARTNER':'WELCOME HOME') }}</span><h2>{{ t(role==='Handyman'?'Good work starts here.':'Let’s get your home ready.') }}</h2><p>{{ t("Try the registration flow using the sample details provided.") }}</p><ol class="steps"><li :class="{active:registrationStep===1}">{{ t("Contact details") }}</li><li :class="{active:registrationStep===2}">{{ t(role==='Handyman'?'Identity & bank account':'Home location') }}</li><li :class="{active:registrationStep===3}">{{ t("Review & submit") }}</li></ol></section><form class="card" @submit.prevent="submitRegistration"><h2>{{ t(['Your details',role==='Handyman'?'Identity & bank account':'Pinpoint your entrance','Looks good?'][registrationStep-1]) }}</h2><template v-if="registrationStep===1"><button type="button" class="secondary full" @click="notify('Google sign-in preview only. No Google account is connected.')">{{ t("G   Continue with Google") }}</button><label>{{ t("Full name") }}<input v-model="fullName" required maxlength="100"></label><label>{{ t("Email") }}<input v-model="email" type="email" required></label><label>{{ t("Phone number") }}<input v-model="phone" type="tel" required></label><label>{{ t("Home address") }}<input v-model="street" required></label><template v-if="role==='Handyman'"><label>{{t("⌖ Service area")}}<select v-model="registeredArea"><option v-for="a in serviceAreas" :value="a">{{a}}</option></select></label><location-picker v-model="mapsLink" :t="t"></location-picker></template></template><template v-if="registrationStep===2&&role==='Handyman'"><div class="upload-placeholder"><span>▧</span><h3>{{ t("ID card photo") }}</h3><p>{{ t("Use a synthetic sample for this walkthrough.") }}</p><button type="button" class="secondary" @click="sampleId=true">{{ t(sampleId?'✓ Sample ID attached':'Attach sample ID') }}</button></div><label>{{ t("Bank name") }}<select v-model="bank"><option>BCA</option><option>Mandiri</option><option>BRI</option><option>BNI</option></select></label><label>{{ t("Bank account number") }}<input v-model="bankNumber" inputmode="numeric" pattern="[0-9]+" required></label><label class="check"><input type="checkbox" v-model="partnerConsent" required>{{ t("I am an independent partner, not an employee.") }}</label></template><template v-if="registrationStep===2&&role!=='Handyman'"><label>{{ t("Address") }}<input v-model="street" required></label><label>{{ t('⌖ Service area') }}<select v-model="registeredArea"><option v-for="a in serviceAreas" :value="a">{{a}}</option></select></label><location-picker v-model="mapsLink" :t="t"></location-picker><label>{{ t("Landmark / access instructions") }}<textarea v-model="accessInstructions" :placeholder="t(&quot;Near the corner, blue gate…&quot;)"></textarea></label></template><template v-if="registrationStep===3"><p><b>{{ t(fullName) }}</b><br>{{ t(email) }}<br>{{ t(phone) }}<br>{{ t(street) }}<br><a v-if="mapsLink && validMapsLink(mapsLink)" :href="mapsLink" target="_blank" rel="noopener noreferrer">{{t("Open in Google Maps")}}</a></p><p v-if="role==='Handyman'">{{ t(bank) }} · {{ t(bankNumber) }}<br>{{ t(sampleId?'Sample ID attached':'No sample ID attached') }}</p><p class="hint">{{ t(role==='Handyman'?'An administrator must manually approve the application before you can receive jobs.':'Payment setup is deferred. No card details are collected.') }}</p></template><div class="actions"><button type="button" v-if="registrationStep>1" class="secondary" @click="registrationStep--">{{ t("Back") }}</button><button class="primary" :disabled="role==='Handyman'&&registrationStep===2&&!sampleId">{{ t(registrationStep===3?'Submit demo':'Continue →') }}</button></div></form></div></template>
  <footer>{{ t("Designed for better days at home.") }}<span>Fixly · Indonesia</span></footer></main></div>

  <div v-if="selected" class="modal-backdrop" @click.self="selected=null"><section class="modal card" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button class="close" :aria-label="t(&quot;Close booking&quot;)" @click="selected=null">×</button><span class="eyebrow">{{ t("A LITTLE HELP IS ON THE WAY") }}</span><h2 id="booking-title">{{ t(selected.name) }}</h2><p>{{ t(selected.description) }}</p><form @submit.prevent="book"><fieldset><legend>{{ t('Service address') }}</legend><label class="check"><input type="radio" value="registered" v-model="addressMode" @change="chooseAddress">{{ t('Use my registered address') }}</label><label class="check"><input type="radio" value="another" v-model="addressMode" @change="chooseAddress">{{ t('Use another address') }}</label><label>{{ t('Address') }}<input v-model="bookingAddress.street" required :readonly="addressMode==='registered'"></label><label>{{ t('⌖ Service area') }}<select v-model="bookingAddress.area" :disabled="addressMode==='registered'"><option v-for="a in serviceAreas" :value="a">{{a}}</option></select></label><p v-if="!selected.areas.includes(bookingAddress.area)" class="error">{{t('This service is unavailable at this address.')}}</p><label>{{t('Landmark / access instructions')}}<textarea v-model="bookingAddress.instructions"></textarea></label><location-picker :key="addressMode" v-model="bookingAddress.mapsLink" :t="t"></location-picker></fieldset><label>{{ t("Quantity") }}<input v-model.number="quantity" type="number" min="1" max="20" required></label><label>{{ t("Preferred visit") }}<input v-model="date" @input="validateVisit" type="datetime-local" required></label><label>{{ t("Tell us what’s happening") }}<textarea v-model="issue" required maxlength="500"></textarea></label><div class="estimate"><span>{{ t("Service estimate") }}</span><b>{{ t(money(selected.price*quantity)) }}</b></div><p class="hint">{{ t("Additional work is quoted separately and needs your approval.") }}</p><button class="primary full" :disabled="!selected.areas.includes(bookingAddress.area)">{{ t("Create demo booking") }}</button></form></section></div>
  <div v-if="editor" class="modal-backdrop" @click.self="editor=null"><section class="modal card" role="dialog" aria-modal="true" aria-labelledby="editor-title"><button class="close" :aria-label="t(&quot;Close editor&quot;)" @click="editor=null">×</button><h2 id="editor-title">{{ t("Job item") }}</h2><form @submit.prevent="saveService"><label>{{ t("Job name") }}<input v-model="editor.name" required maxlength="100"></label><label>{{ t("Job group") }}<select v-model="editor.group"><option v-for="g in groups" :value="g">{{ t(g) }}</option></select></label><label>{{ t("Description") }}<textarea v-model="editor.description" required maxlength="500"></textarea></label><div class="two-columns"><label>{{ t("Unit price (IDR)") }}<input type="number" min="1" max="1000000000" required v-model.number="editor.price"></label><label>{{ t("Billing unit") }}<input v-model="editor.unit" required maxlength="40"></label></div><label v-for="a in serviceAreas" class="check"><input type="checkbox" v-model="editor.areas" :value="a">{{ t(a) }}</label><button class="primary full" :disabled="!editor.areas.length">{{ t("Save draft") }}</button></form></section></div>
  `,
};
createApp(appOptions).mount("#app");
