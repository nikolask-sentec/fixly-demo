export function validMapsLink(value) {
  if (!value) return true;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password || url.port)
      return false;
    return (
      (url.hostname === "maps.app.goo.gl" && url.pathname.length > 1) ||
      (url.hostname === "goo.gl" && url.pathname.startsWith("/maps/")) ||
      ([
        "google.com",
        "www.google.com",
        "google.co.id",
        "www.google.co.id",
        "google.ru",
        "www.google.ru",
      ].includes(url.hostname) &&
        /^\/maps(?:\/|$)/.test(url.pathname)) ||
      url.hostname === "maps.google.com"
    );
  } catch {
    return false;
  }
}
export const LocationPicker = {
  props: ["modelValue", "t"],
  emits: ["update:modelValue"],
  mounted() {
    this.validate();
  },
  watch: {
    modelValue() {
      this.validate();
    },
    t() {
      this.validate();
    },
  },
  methods: {
    validate() {
      this.$refs.input?.setCustomValidity(
        validMapsLink(this.modelValue)
          ? ""
          : this.t("Paste a valid Google Maps sharing link."),
      );
    },
    validMapsLink,
    update(event) {
      const value = event.target.value.trim();
      event.target.setCustomValidity(
        validMapsLink(value)
          ? ""
          : this.t("Paste a valid Google Maps sharing link."),
      );
      event.target.value = value;
      this.$emit("update:modelValue", value);
    },
  },
  template: `<div><label>{{t('Google Maps location link (optional)')}}<input ref="input" type="url" :value="modelValue || ''" @input="update" placeholder="https://maps.app.goo.gl/…" maxlength="2048"></label><p class="hint">{{t('In Google Maps, select your location, tap Share, then Copy link and paste it here.')}}</p><a v-if="modelValue && validMapsLink(modelValue)" :href="modelValue" target="_blank" rel="noopener noreferrer">{{t('Open in Google Maps')}}</a></div>`,
};
