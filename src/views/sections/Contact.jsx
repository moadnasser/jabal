import { useEffect, useRef } from "react";
import { useContent } from "../../controllers/languageContext.js";
import { useContactForm } from "../../controllers/useContactForm.js";
import { CONTACT, SECTIONS, mailHref, telHref } from "../../models/site.js";
import { Button } from "../components/Button.jsx";
import { Field } from "../components/Field.jsx";
import { Icon } from "../components/Icon.jsx";
import styles from "./Contact.module.css";

/** Field order and per-field input semantics, kept out of the JSX below. */
const FIELD_CONFIG = {
  name: { autoComplete: "name", inputMode: "text" },
  reach: { autoComplete: "email", inputMode: "text" },
  message: { multiline: true },
};

export function Contact() {
  const { contact, brand } = useContent();
  const form = contact.form;

  const { values, errors, status, isSubmitting, setFieldValue, handleBlur, handleSubmit, registerField } =
    useContactForm();

  // Once the submission resolves, put focus on the outcome. Otherwise the
  // reader is left on a button whose label just changed back, with the result
  // of their action somewhere below them.
  const statusRef = useRef(null);
  useEffect(() => {
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  return (
    <section
      className={styles.section}
      id={SECTIONS.contact}
      aria-labelledby="contact-title"
      data-surface="dark"
      data-reveal
    >
      <div>
        <span className={styles.kicker}>{contact.kicker}</span>
        <h2 className={styles.title} id="contact-title">
          {contact.title}
        </h2>
        <p className={styles.lead}>{contact.lead}</p>

        <address className={styles.details}>
          <a className={styles.detail} href={telHref()} dir="ltr">
            <span className={styles.detailIcon}>
              <Icon name="phone" size={17} strokeWidth={2.2} />
            </span>
            <span data-numeric>{CONTACT.phone}</span>
          </a>

          <a className={styles.detail} href={mailHref()} dir="ltr">
            <span className={styles.detailIcon}>
              <Icon name="mail" size={17} strokeWidth={2.2} />
            </span>
            {CONTACT.email}
          </a>

          <a
            className={`${styles.detail} ${styles.detailStatic}`}
            href={CONTACT.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.detailIcon}>
              <Icon name="pin" size={17} strokeWidth={2.2} />
            </span>
            {brand.address}
          </a>
        </address>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>{form.legend}</legend>

          {Object.entries(FIELD_CONFIG).map(([name, config]) => {
            const errorKey = errors[name];
            return (
              <Field
                key={name}
                id={`contact-${name}`}
                name={name}
                label={form[name].label}
                placeholder={form[name].placeholder}
                hint={form[name].hint}
                requiredLabel={form.required}
                error={errorKey ? form.errors[errorKey] : undefined}
                inputRef={registerField(name)}
                value={values[name]}
                onChange={(event) => setFieldValue(name, event.target.value)}
                onBlur={() => handleBlur(name)}
                {...config}
              />
            );
          })}

          <Button
            className={styles.submit}
            type="submit"
            variant="ink"
            withArrow
            loading={isSubmitting}
          >
            {isSubmitting ? form.submitting : form.submit}
          </Button>
        </fieldset>

        {/*
          The live region is always mounted, not conditionally rendered — a
          region inserted at the same moment its text appears is frequently
          missed by screen readers.
        */}
        <div aria-live="polite" aria-atomic="true">
          {status === "success" ? (
            <p
              className={`${styles.status} ${styles.statusSuccess}`}
              ref={statusRef}
              tabIndex={-1}
            >
              <Icon className={styles.statusIcon} name="check" size={17} strokeWidth={2.6} />
              {form.success}
            </p>
          ) : null}

          {status === "error" ? (
            <p
              className={`${styles.status} ${styles.statusError}`}
              ref={statusRef}
              tabIndex={-1}
            >
              <Icon className={styles.statusIcon} name="alert" size={17} strokeWidth={2.2} />
              {form.failure}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
