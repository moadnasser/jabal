/**
 * Contact message model — the shape of an enquiry and the rules that decide
 * whether it is fit to send. Deliberately free of React and of copy: the
 * validator returns *error keys*, and the controller looks the wording up in
 * whichever language is active.
 */

export const CONTACT_FIELDS = ["name", "reach", "message"];

export const EMPTY_CONTACT_MESSAGE = Object.freeze({
  name: "",
  reach: "",
  message: "",
});

const MIN_MESSAGE_LENGTH = 10;

/** Deliberately loose: `a@b.c` is enough to be worth a reply. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Seven or more digits, allowing +, spaces, dashes and parentheses. */
const PHONE_PATTERN = /^\+?[\d\s().-]{7,}$/;

/**
 * Validate one field in isolation, so the controller can re-check a single
 * input on blur without re-reporting errors the visitor hasn't reached yet.
 *
 * @param {string} field
 * @param {string} rawValue
 * @returns {string | null} an error key from `content.contact.form.errors`,
 *   or `null` when the field is acceptable.
 */
export function validateField(field, rawValue) {
  const value = String(rawValue ?? "").trim();

  switch (field) {
    case "name":
      return value ? null : "nameRequired";

    case "reach":
      if (!value) return "reachRequired";
      return EMAIL_PATTERN.test(value) || PHONE_PATTERN.test(value)
        ? null
        : "reachInvalid";

    case "message":
      if (!value) return "messageRequired";
      return value.length < MIN_MESSAGE_LENGTH ? "messageTooShort" : null;

    default:
      return null;
  }
}

/**
 * Validate the whole form.
 * @returns {Record<string, string>} field → error key, empty when valid.
 */
export function validateContactMessage(values) {
  const errors = {};
  for (const field of CONTACT_FIELDS) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

/** Normalise a validated form into the payload we'd put on the wire. */
export function toPayload(values) {
  return {
    name: values.name.trim(),
    reach: values.reach.trim(),
    message: values.message.trim(),
    submittedAt: new Date().toISOString(),
  };
}

/**
 * Deliver an enquiry.
 *
 * There is no backend on this project yet, so this resolves after a short
 * delay and logs the payload. Swapping in a real endpoint is a change to this
 * one function — the controller and the view are already written against the
 * promise it returns.
 *
 * @param {ReturnType<typeof toPayload>} payload
 * @returns {Promise<{ ok: true }>}
 */
export async function sendContactMessage(payload) {
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (import.meta.env?.DEV) {
    console.info("[contact] message ready to send", payload);
  }

  return { ok: true };
}
