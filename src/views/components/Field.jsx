import { Icon } from "./Icon.jsx";
import styles from "./Field.module.css";

/**
 * A labelled form control.
 *
 * The label is always visible — a placeholder disappears the moment someone
 * types, taking the question with it. Errors render directly beneath the input
 * they belong to and are wired to it through `aria-describedby`, so a screen
 * reader announces the problem with the field rather than in isolation.
 *
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.label
 * @param {string} [props.error]     already-localised message; omit when valid
 * @param {string} [props.hint]      persistent helper text
 * @param {string} [props.requiredLabel]  localised word for "required"
 * @param {boolean} [props.multiline]
 * @param {React.Ref} [props.inputRef]
 */
export function Field({
  id,
  label,
  error,
  hint,
  requiredLabel,
  multiline = false,
  inputRef,
  ...controlProps
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ");

  const shared = {
    id,
    ref: inputRef,
    className: styles.control,
    required: true,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": describedBy || undefined,
    ...controlProps,
  };

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {requiredLabel ? (
          <span className={styles.required} aria-hidden="true">
            ({requiredLabel})
          </span>
        ) : null}
      </label>

      {multiline ? <textarea rows={4} {...shared} /> : <input {...shared} />}

      {hint ? (
        <p className={styles.hint} id={hintId}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p className={styles.error} id={errorId}>
          <Icon className={styles.errorIcon} name="alert" size={15} strokeWidth={2.2} />
          {error}
        </p>
      ) : null}
    </div>
  );
}
