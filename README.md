# Fixly demo

Interactive customer, administrator and independent handyman mockups. This repository contains only a static, sample-data prototype. The real Nuxt/PostgreSQL app is maintained separately in the private Fixly repository.

Open the GitHub Pages site and use the role switcher at the top. Suggested walkthrough:

1. Customer: explore services and create a sample booking.
2. Admin: approve the sample partner under Partner approvals (check all three items), then assign the booking under Jobs.
3. Handyman: start travelling, arrive and send a quote.
4. Customer: approve the quote under My bookings.
5. Handyman: complete the work.

Also explore registration, the illustrative location picker, ID/bank setup, and the admin catalog with drafts, publication and per-area switches. All state is kept in memory. Refreshing or Reset demo restores the samples. Do not enter real personal, identity or bank information. No files are uploaded, accounts created, messages sent or payments collected.

## Hosting

In Settings → Pages, select Deploy from a branch, branch main, folder / (root), then Save. No build or server is required. Paths are relative, so the site works under /fixly-demo/.

To preview locally, serve this directory with any static HTTP server; JavaScript modules require HTTP rather than opening index.html as a file.

Vue 3 is bundled locally in vue.js; its MIT license is in VUE-LICENSE. No CDN, database or external service credentials are used. app.js and style.css contain the editable mockup code.

## Languages

The header offers English, Bahasa Indonesia, Simplified Chinese and Russian. The selected language is saved in localStorage when available. Changing it preserves the current role, form and booking state. Interface text, sample service descriptions, statuses, alerts and currency formatting follow the selection; custom names, addresses and user-written content remain unchanged. All prices remain in IDR. Edit the English-keyed translations in i18n.js to update wording. This language support applies to this static demo; the private Nuxt application is separate.

## Regression checks

Run `node regression.cjs` from this directory. Checks cover Google Maps URL validation, submitted partner details, role isolation, address defaults and drafts, booking validation, assignment and quote transitions, service availability, and reset. These checks exercise the static demo; they do not verify the separate Nuxt backend.
