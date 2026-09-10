import { createApp } from "./vue.js";

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
      areas: ["Makassar", "Gowa"],
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
      areas: ["Makassar"],
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
      areas: ["Makassar", "Maros"],
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
    },
  ],
  application: "Pending review",
});

createApp({
  data() {
    return {
      ...initial(),
      role: "Customer",
      page: "Overview",
      area: "Makassar",
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
      bank: "BCA",
      bankNumber: "000123456789",
      fullName: "Andi — demo partner",
      phone: "0812 0000 0000",
      email: "partner@example.com",
      street: "Sample home, Makassar",
      pin: { x: 57, y: 48 },
      quoteInput: 150000,
      reason: "",
      reviewChecks: [false, false, false],
      reviewError: "",
      serviceAreas: ["Makassar", "Gowa", "Maros"],
    };
  },
  computed: {
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
    money(n) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(n);
    },
    notify(message) {
      this.toast = message;
    },
    switchRole(role) {
      this.role = role;
      this.page = "Overview";
      this.selected = null;
      this.editor = null;
      this.toast = "";
    },
    reset() {
      Object.assign(this, initial());
      this.registrationStep = 1;
      this.sampleId = false;
      this.notify("Demo reset. All changes stay in this browser session.");
    },
    book() {
      this.jobs.unshift({
        id: "FX-" + String(Date.now()).slice(-6),
        name: this.selected.name,
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
    editService(service) {
      this.editor = service
        ? { ...service, areas: [...service.areas] }
        : {
            id: Date.now(),
            name: "",
            group: this.groups[0],
            icon: "⌂",
            description: "",
            price: 75000,
            unit: "visit",
            published: false,
            areas: ["Makassar"],
          };
    },
    saveService() {
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
      job.status = status;
      if (status === "Quote ready") job.quote = this.quoteInput;
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
      if (this.registrationStep < 3) {
        this.registrationStep++;
        return;
      }
      if (this.role === "Handyman") {
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
  <div class="demo-bar"><span><b>FIXLY DESIGN PREVIEW</b> · Sample data only. No real bookings, uploads or payments.</span><button @click="reset">Reset demo ↻</button></div>
  <header><a class="logo" href="#" @click.prevent="page='Overview'">fixly<span>.</span></a><div class="role-switch" aria-label="Choose app view"><button v-for="view in ['Customer','Admin','Handyman']" :key="view" :class="{active:role===view}" @click="switchRole(view)">{{view}}</button></div><div class="avatar">{{role[0]}}</div></header>
  <div class="shell"><aside><div class="workspace-label">{{role==='Handyman'?'PARTNER WORKSPACE':role.toUpperCase()+' WORKSPACE'}}</div><nav><button v-for="(item,i) in navigation" :key="item" :class="{active:page===item}" @click="page=item;toast='' "><span>{{['◫','▤','◎','↗'][i]}}</span>{{item}}<b v-if="item==='Partner approvals'&&application==='Pending review'">1</b></button></nav><div class="sidebar-note"><span class="small-icon">✦</span><h3>Good help.<br>Close to home.</h3><p>{{role==='Customer'?'A comfortable home starts with a little care.':'Better service starts with people who care.'}}</p></div><small>Makassar, Indonesia<br>Interactive prototype · v1</small></aside>
  <main><div class="page-top"><div><p class="eyebrow">{{role==='Customer'?'YOUR HOME, IN GOOD HANDS':role==='Admin'?'KEEP EVERYTHING RUNNING':'INDEPENDENT SERVICE PARTNERS'}}</p><h1>{{page==='Overview'?(role==='Customer'?'A little help. A better home.':role==='Admin'?'Your service desk.':'Make today a good workday.'):page}}</h1></div><label v-if="role==='Customer'" class="area">⌖ Service area<select v-model="area"><option v-for="a in serviceAreas">{{a}}</option></select></label><span v-else class="pill">{{role==='Admin'?'Admin demo':application}}</span></div>
  <div v-if="toast" class="notice" role="status">{{toast}}<button aria-label="Dismiss message" @click="toast=''">×</button></div>

  <template v-if="role==='Customer'&&page==='Overview'">
    <section class="hero"><div><span class="tag">LESS TO WORRY ABOUT</span><h2>That little repair?<br>Let’s take care of it.</h2><p>Book skilled help for your home, with clear prices and a time that works for you.</p><button class="primary" @click="$refs.services.scrollIntoView({behavior:'smooth'})">Find a service <span>↗</span></button></div><div class="house" aria-hidden="true"><div class="sun"></div><div class="roof"></div><div class="house-body"><i class="window"></i><i class="door"></i></div><div class="plant">✦</div><span class="house-label">⌂ &nbsp; A happy home</span></div></section>
    <div class="section-title" ref="services"><h2>What can we help with?</h2><span>{{visibleServices.length}} services near you</span></div><div class="filters"><button v-for="g in ['All services',...groups]" :class="{active:filter===g}" @click="filter=g">{{g}}</button></div>
    <div class="service-grid"><article class="service card" v-for="s in visibleServices" :key="s.id"><div class="service-icon">{{s.icon}}</div><small>{{s.group}}</small><h3>{{s.name}}</h3><p>{{s.description}}</p><div class="service-bottom"><div><b>{{money(s.price)}}</b><small>per {{s.unit}}</small></div><button class="round" :aria-label="'Book '+s.name" @click="selected=s;quantity=1;issue='';date=''">↗</button></div></article><p v-if="!visibleServices.length" class="card">No published services here yet. Try another area.</p></div>
    <div class="trust-strip"><span>✓ Clear unit pricing</span><span>✓ Manually verified partners</span><span>✓ Approve the quote before work</span></div>
  </template>

  <template v-if="role==='Admin'&&page==='Overview'"><div class="stats"><div class="card"><small>Active jobs</small><strong>{{activeJobs.length}}</strong><span>Across all service areas</span></div><div class="card"><small>Published services</small><strong>{{services.filter(s=>s.published).length}}</strong><span>{{serviceAreas.length}} service areas</span></div><div class="card"><small>Waiting for verification</small><strong>{{application==='Pending review'?1:0}}</strong><span>Independent partner applications</span></div></div><section class="card action-card"><div><span class="eyebrow">PEOPLE FIRST</span><h2>A new partner is ready for review.</h2><p>Review identity, contact and bank details before opening job access.</p></div><button class="primary" @click="page='Partner approvals'">Review application ↗</button></section><div class="section-title"><h2>Recent requests</h2><button class="text-button" @click="page='Jobs'">Manage jobs →</button></div></template>

  <template v-if="role==='Handyman'&&page==='Overview'"><section class="hero partner-hero"><div><span class="tag">YOUR SKILLS. YOUR NEXT OPPORTUNITY.</span><h2>{{approved?'Ready to make someone’s day?':'A quick review, then you’re ready.'}}</h2><p>{{approved?'Your assigned jobs and next steps are all here.':'Your application needs manual approval before you can receive household service jobs.'}}</p><button class="primary" @click="page=approved?'My jobs':'Registration'">{{approved?'View my jobs ↗':'Preview registration ↗'}}</button></div><div class="partner-mark" aria-hidden="true">✦</div></section><div class="stats"><div class="card"><small>Application</small><strong class="status-text">{{application}}</strong><span>Independent partner</span></div><div class="card"><small>Assigned jobs</small><strong>{{approved?jobs.filter(j=>!['Requested','Cancelled','Completed'].includes(j.status)).length:0}}</strong><span>Verified access required</span></div><div class="card"><small>Completed</small><strong>{{jobs.filter(j=>j.status==='Completed').length}}</strong><span>In this demo session</span></div></div></template>

  <template v-if="page==='My bookings'||page==='Jobs'||page==='My jobs'||(role==='Admin'&&page==='Overview')"><div v-if="role==='Handyman'&&!approved" class="card empty"><span class="service-icon">◎</span><h2>Your application is {{application.toLowerCase()}}.</h2><p>{{reason||'An administrator must approve your details before you can receive jobs.'}}</p><p class="hint">For this walkthrough, switch to Admin → Partner approvals.</p></div><template v-else><article class="card job" v-for="j in jobs.filter(j=>role!=='Handyman'||j.status!=='Requested')" :key="j.id"><div class="job-header"><span class="job-id">{{j.id}}</span><span class="pill">{{j.status}}</span></div><h3>{{j.name}}</h3><p>{{j.issue}}</p><div class="job-details"><span>◷ {{j.date}}</span><span>⌖ Sample home · Makassar</span><span>{{money(j.price)}} × {{j.quantity}}</span></div><p v-if="j.quote"><b>Total work quote: {{money(j.quote)}}</b></p><div class="job-actions"><button v-if="role==='Admin'&&j.status==='Requested'" class="primary" :disabled="!approved" @click="move(j,'Assigned')">Assign to Andi</button><small v-if="role==='Admin'&&!approved">Approve the sample partner first.</small><template v-if="role==='Handyman'"><button v-if="j.status==='Assigned'" class="primary" @click="move(j,'On the way')">Start travelling</button><button v-if="j.status==='On the way'" class="primary" @click="move(j,'Diagnosing')">I’ve arrived</button><form v-if="j.status==='Diagnosing'" @submit.prevent="move(j,'Quote ready')"><label>Total quote (IDR)<input type="number" min="1" max="1000000000" v-model.number="quoteInput" required></label><button class="primary">Send quote</button></form><button v-if="j.status==='In progress'" class="primary" @click="move(j,'Completed')">Complete work</button></template><template v-if="role==='Customer'"><button v-if="j.status==='Quote ready'" class="primary" @click="move(j,'In progress')">Approve quote</button><button v-if="['Requested','Assigned'].includes(j.status)" class="secondary" @click="move(j,'Cancelled')">Cancel request</button></template><small v-if="j.status==='Completed'">Payment integration is planned; no payment is collected.</small></div></article><p v-if="!jobs.length" class="card empty">No bookings yet. Explore the services to create a sample request.</p></template></template>

  <template v-if="role==='Admin'&&page==='Service catalog'"><div class="catalog-toolbar"><form @submit.prevent="groups.push(newGroup.trim());newGroup=''" class="inline"><input v-model="newGroup" placeholder="New job group" aria-label="New job group" required maxlength="60"><button class="secondary">Add group</button></form><button class="primary" @click="editService(null)">+ Create job item</button></div><div class="card table-wrap"><table><thead><tr><th>Service / job group</th><th>Unit price</th><th>Availability by area</th><th>Status</th><th>Actions</th></tr></thead><tbody><tr v-for="s in services"><td><b>{{s.name}}</b><small>{{s.group}}</small></td><td>{{money(s.price)}}<small>/ {{s.unit}}</small></td><td><label v-for="a in serviceAreas" class="check"><input type="checkbox" :value="a" v-model="s.areas">{{a}}</label></td><td><span class="pill">{{s.published?'Published':'Draft'}}</span></td><td><button class="text-button" @click="editService(s)">Edit</button><button class="text-button" :disabled="!s.areas.length" @click="s.published=!s.published">{{s.published?'Unpublish':'Publish'}}</button></td></tr></tbody></table></div><p class="hint">Area switches immediately change the customer demo. Editing a demo item saves it as a draft until you publish it again. Existing bookings keep their original unit price.</p></template>

  <template v-if="role==='Admin'&&page==='Partner approvals'"><div class="review-grid"><section class="card"><div class="job-header"><span class="eyebrow">PARTNER APPLICATION</span><span class="pill">{{application}}</span></div><h2>{{fullName}}</h2><p>Independent handyman · Makassar</p><dl><dt>Email</dt><dd>{{email}}</dd><dt>Phone</dt><dd>{{phone}}</dd><dt>Home base</dt><dd>{{street}}</dd><dt>Bank</dt><dd>{{bank}} · {{bankNumber}}</dd></dl><div class="sample-id"><b>SAMPLE ID — NOT VALID</b><div class="id-content"><span>◎</span><div>DEMO PARTNER<br><small>Illustration for design review only<br>No actual identity document</small></div></div></div></section><section class="card"><h2>Manual verification</h2><p>Confirm the required details before approving a partner.</p><label class="check review-check" v-for="(label,i) in ['ID image is readable and matches the applicant','Email and phone details have been checked','Bank details have been checked']"><input type="checkbox" v-model="reviewChecks[i]">{{label}}</label><label>Review notes<textarea v-model="reason" placeholder="Explain any changes needed" maxlength="500"></textarea></label><p v-if="reviewError" class="error" role="alert">{{reviewError}}</p><div class="stack" v-if="application==='Pending review'"><button class="primary" @click="review('Approved')">Approve partner</button><button class="secondary" @click="review('Changes requested')">Request changes</button><button class="text-button" @click="review('Rejected')">Reject application</button></div><p v-else class="notice">Review saved: {{application}}.</p></section></div></template>

  <template v-if="page==='Registration'"><div class="registration-layout"><section><span class="eyebrow">{{role==='Handyman'?'BECOME AN INDEPENDENT PARTNER':'WELCOME HOME'}}</span><h2>{{role==='Handyman'?'Good work starts here.':'Let’s get your home ready.'}}</h2><p>Try the registration flow using the sample details provided.</p><ol class="steps"><li :class="{active:registrationStep===1}">Contact details</li><li :class="{active:registrationStep===2}">{{role==='Handyman'?'Identity & bank account':'Home location'}}</li><li :class="{active:registrationStep===3}">Review & submit</li></ol></section><form class="card" @submit.prevent="submitRegistration"><h2>{{['Your details',role==='Handyman'?'Identity & bank account':'Pinpoint your entrance','Looks good?'][registrationStep-1]}}</h2><template v-if="registrationStep===1"><button type="button" class="secondary full" @click="notify('Google sign-in preview only. No Google account is connected.')">G &nbsp; Continue with Google</button><label>Full name<input v-model="fullName" required maxlength="100"></label><label>Email<input v-model="email" type="email" required></label><label>Phone number<input v-model="phone" type="tel" required></label><label>Home address<input v-model="street" required></label></template><template v-if="registrationStep===2&&role==='Handyman'"><div class="upload-placeholder"><span>▧</span><h3>ID card photo</h3><p>Use a synthetic sample for this walkthrough.</p><button type="button" class="secondary" @click="sampleId=true">{{sampleId?'✓ Sample ID attached':'Attach sample ID'}}</button></div><label>Bank name<select v-model="bank"><option>BCA</option><option>Mandiri</option><option>BRI</option><option>BNI</option></select></label><label>Bank account number<input v-model="bankNumber" inputmode="numeric" pattern="[0-9]+" required></label><label class="check"><input type="checkbox" required>I am an independent partner, not an employee.</label></template><template v-if="registrationStep===2&&role!=='Handyman'"><label>Address<input v-model="street" required></label><div class="mock-map" role="button" tabindex="0" aria-label="Illustrative location picker. Click to place pin or press Enter for center." @click="pickPin" @keydown.enter.prevent="pin={x:50,y:50}"><span class="map-street one"></span><span class="map-street two"></span><span class="map-street three"></span><b :style="{left:pin.x+'%',top:pin.y+'%'}">⌖</b><small>ILLUSTRATIVE MAP · NOT GOOGLE MAPS</small></div><p class="hint">Click to move the sample pin. Live Google Maps will be connected in the full app.</p><label>Landmark / access instructions<textarea placeholder="Near the corner, blue gate…"></textarea></label></template><template v-if="registrationStep===3"><p><b>{{fullName}}</b><br>{{email}}<br>{{phone}}<br>{{street}}</p><p v-if="role==='Handyman'">{{bank}} · {{bankNumber}}<br>{{sampleId?'Sample ID attached':'No sample ID attached'}}</p><p class="hint">{{role==='Handyman'?'An administrator must manually approve the application before you can receive jobs.':'Payment setup is deferred. No card details are collected.'}}</p></template><div class="actions"><button type="button" v-if="registrationStep>1" class="secondary" @click="registrationStep--">Back</button><button class="primary" :disabled="role==='Handyman'&&registrationStep===2&&!sampleId">{{registrationStep===3?'Submit demo':'Continue →'}}</button></div></form></div></template>
  <footer>Designed for better days at home. <span>Fixly · Indonesia</span></footer></main></div>

  <div v-if="selected" class="modal-backdrop" @click.self="selected=null"><section class="modal card" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button class="close" aria-label="Close booking" @click="selected=null">×</button><span class="eyebrow">A LITTLE HELP IS ON THE WAY</span><h2 id="booking-title">{{selected.name}}</h2><p>{{selected.description}}</p><form @submit.prevent="book"><label>Quantity<input v-model.number="quantity" type="number" min="1" max="20" required></label><label>Preferred visit<input v-model="date" type="datetime-local" required></label><label>Tell us what’s happening<textarea v-model="issue" required maxlength="500"></textarea></label><div class="estimate"><span>Service estimate</span><b>{{money(selected.price*quantity)}}</b></div><p class="hint">Additional work is quoted separately and needs your approval.</p><button class="primary full">Create demo booking</button></form></section></div>
  <div v-if="editor" class="modal-backdrop" @click.self="editor=null"><section class="modal card" role="dialog" aria-modal="true" aria-labelledby="editor-title"><button class="close" aria-label="Close editor" @click="editor=null">×</button><h2 id="editor-title">Job item</h2><form @submit.prevent="saveService"><label>Job name<input v-model="editor.name" required maxlength="100"></label><label>Job group<select v-model="editor.group"><option v-for="g in groups">{{g}}</option></select></label><label>Description<textarea v-model="editor.description" required maxlength="500"></textarea></label><div class="two-columns"><label>Unit price (IDR)<input type="number" min="1" max="1000000000" required v-model.number="editor.price"></label><label>Billing unit<input v-model="editor.unit" required maxlength="40"></label></div><label v-for="a in serviceAreas" class="check"><input type="checkbox" v-model="editor.areas" :value="a">{{a}}</label><button class="primary full" :disabled="!editor.areas.length">Save draft</button></form></section></div>
  `,
}).mount("#app");
