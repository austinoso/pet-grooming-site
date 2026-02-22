import React, { useState, useRef } from "react";

/**
 * ContactForm — Accessible contact form with client-side validation.
 * React island. Currently uses mock submission (console log).
 * TODO: INTEGRATION — Replace with real form handler (Netlify Forms, Formspree, etc.)
 */

interface FormData {
  name: string;
  email: string;
  phone: string;
  petName: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    petName: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus the first invalid field
      const firstErrorKey = Object.keys(validationErrors)[0];
      const fieldMap: Record<string, string> = {
        name: "contact-name",
        email: "contact-email",
        message: "contact-message",
      };
      const fieldId = fieldMap[firstErrorKey];
      if (fieldId) {
        const el = document.getElementById(fieldId);
        el?.focus();
      }
      return;
    }

    setSubmitting(true);

    // TODO: INTEGRATION — Replace with real form submission
    // Mock submission: simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("[MOCK FORM SUBMISSION]", formData);

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="mt-6 rounded-2xl bg-primary-50 p-8 text-center"
        role="status"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
          <svg
            className="h-6 w-6 text-primary-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-dark">Message Sent!</h3>
        <p className="mt-2 text-sm text-neutral-600">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <button
          type="button"
          className="mt-4 text-sm font-medium text-primary-600 hover:underline"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              petName: "",
              message: "",
            });
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="mt-6 space-y-5"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-dark"
        >
          Your Name{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "error-name" : undefined}
          className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm text-dark shadow-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 ${
            errors.name
              ? "border-red-400 bg-red-50"
              : "border-neutral-300 bg-white"
          }`}
          placeholder="Jane Doe"
        />
        {errors.name && (
          <p id="error-name" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-dark"
        >
          Email Address{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "error-email" : undefined}
          className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm text-dark shadow-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 ${
            errors.email
              ? "border-red-400 bg-red-50"
              : "border-neutral-300 bg-white"
          }`}
          placeholder="jane@example.com"
        />
        {errors.email && (
          <p
            id="error-email"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone (optional) */}
      <div>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-medium text-dark"
        >
          Phone Number{" "}
          <span className="text-xs text-neutral-400">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-dark shadow-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Pet Name (optional) */}
      <div>
        <label
          htmlFor="contact-pet"
          className="block text-sm font-medium text-dark"
        >
          Pet's Name{" "}
          <span className="text-xs text-neutral-400">(optional)</span>
        </label>
        <input
          id="contact-pet"
          name="petName"
          type="text"
          value={formData.petName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-dark shadow-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          placeholder="Buddy"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-dark"
        >
          Message{" "}
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "error-message" : undefined}
          className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm text-dark shadow-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200 ${
            errors.message
              ? "border-red-400 bg-red-50"
              : "border-neutral-300 bg-white"
          }`}
          placeholder="Tell us about your pet and what services you're interested in..."
        />
        {errors.message && (
          <p
            id="error-message"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-500 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
