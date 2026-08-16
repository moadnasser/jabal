import { useCallback, useRef, useState } from "react";
import {
  CONTACT_FIELDS,
  EMPTY_CONTACT_MESSAGE,
  sendContactMessage,
  toPayload,
  validateContactMessage,
  validateField,
} from "../models/contactMessage.js";

/** @typedef {"idle" | "submitting" | "success" | "error"} SubmitStatus */

/**
 * Drives the contact form: values, per-field errors, submission state and the
 * focus moves that keep a keyboard or screen-reader user oriented.
 *
 * Validation runs on blur rather than on every keystroke, so a visitor is
 * never told their half-typed email is wrong; after a failed submit the field
 * switches to live re-validation, which is where instant feedback helps.
 */
export function useContactForm() {
  const [values, setValues] = useState(EMPTY_CONTACT_MESSAGE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(/** @type {SubmitStatus} */ ("idle"));

  // Set once the visitor has attempted to send; enables live re-validation.
  const hasSubmitted = useRef(false);
  const fieldRefs = useRef({});

  /** Register an input so we can move focus to it on error. */
  const registerField = useCallback(
    (field) => (element) => {
      fieldRefs.current[field] = element;
    },
    [],
  );

  const setFieldValue = useCallback((field, value) => {
    setValues((current) => ({ ...current, [field]: value }));

    if (!hasSubmitted.current) return;

    // Post-submit: clear the error the moment the field becomes valid.
    setErrors((current) => {
      const next = { ...current };
      const error = validateField(field, value);
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  }, []);

  const handleBlur = useCallback(
    (field) => {
      setTouched((current) => ({ ...current, [field]: true }));
      setErrors((current) => {
        const next = { ...current };
        const error = validateField(field, values[field]);
        if (error) next[field] = error;
        else delete next[field];
        return next;
      });
    },
    [values],
  );

  const reset = useCallback(() => {
    setValues(EMPTY_CONTACT_MESSAGE);
    setErrors({});
    setTouched({});
    hasSubmitted.current = false;
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      // Enter inside a text input submits the form directly, bypassing the
      // button's own guard — so the in-flight check belongs here too.
      if (status === "submitting") return;

      hasSubmitted.current = true;

      const nextErrors = validateContactMessage(values);
      setErrors(nextErrors);
      setTouched(Object.fromEntries(CONTACT_FIELDS.map((f) => [f, true])));

      const firstInvalid = CONTACT_FIELDS.find((field) => nextErrors[field]);
      if (firstInvalid) {
        setStatus("idle");
        fieldRefs.current[firstInvalid]?.focus();
        return;
      }

      setStatus("submitting");
      try {
        await sendContactMessage(toPayload(values));
        setStatus("success");
        reset();
      } catch {
        setStatus("error");
      }
    },
    [values, reset, status],
  );

  /**
   * An error is only worth showing once the visitor has left the field (or
   * tried to send). This keeps the form quiet while it is being filled in.
   */
  const visibleErrors = Object.fromEntries(
    CONTACT_FIELDS.filter((field) => errors[field] && touched[field]).map(
      (field) => [field, errors[field]],
    ),
  );

  return {
    values,
    errors: visibleErrors,
    status,
    isSubmitting: status === "submitting",
    fields: CONTACT_FIELDS,
    setFieldValue,
    handleBlur,
    handleSubmit,
    registerField,
    reset,
  };
}
