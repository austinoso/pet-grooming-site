import { useState, useRef } from "react";

/**
 * BookingFlow — Multi-step booking shell.
 * React island. All steps are front-end only (mock).
 * TODO: INTEGRATION — Wire to MoeGo / Square / custom booking API via adapter.
 */

const PET_TYPES = ["Dog", "Cat"] as const;

const DogIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-4 shrink-0"
    aria-hidden="true"
  >
    {/* Floppy ears */}
    <ellipse cx="6.5" cy="9.5" rx="2.5" ry="3.5" />
    <ellipse cx="17.5" cy="9.5" rx="2.5" ry="3.5" />
    {/* Face */}
    <circle cx="12" cy="13.5" r="6" />
  </svg>
);

const CatIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-4 shrink-0"
    aria-hidden="true"
  >
    {/* Face */}
    <circle cx="12" cy="14" r="6" />
    {/* Pointed ears */}
    <polygon points="6,13 8,5 11,10" />
    <polygon points="18,13 16,5 13,10" />
  </svg>
);
const PET_SIZES = [
  "Small (under 25 lbs)",
  "Medium (25–50 lbs)",
  "Large (50–100 lbs)",
  "Extra Large (100+ lbs)",
] as const;
const SERVICES = [
  { id: "full-groom", name: "Full Grooming Package", price: 65 },
  { id: "bath-brush", name: "Bath & Brush", price: 40 },
  { id: "puppy-first", name: "Puppy's First Groom", price: 35 },
  { id: "cat-groom", name: "Cat Grooming", price: 75 },
  { id: "deshed", name: "De-shedding Treatment", price: 30 },
  { id: "teeth", name: "Teeth Brushing", price: 15 },
  { id: "nails", name: "Nail Trim & Grind", price: 15 },
] as const;

type Step = 1 | 2 | 3 | 4 | 5;

interface BookingData {
  petType: string;
  petSize: string;
  petName: string;
  services: string[];
  date: string;
  time: string;
  ownerName: string;
  email: string;
  phone: string;
  notes: string;
}

const STEPS = [
  "Pet Info",
  "Services",
  "Date & Time",
  "Your Info",
  "Confirm",
] as const;

export default function BookingFlow() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<BookingData>({
    petType: "",
    petSize: "",
    petName: "",
    services: [],
    date: "",
    time: "",
    ownerName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [stepErrors, setStepErrors] = useState<string[]>([]);
  const announcerRef = useRef<HTMLDivElement>(null);

  function update(fields: Partial<BookingData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  function toggleService(id: string) {
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  }

  function validateStep(s: Step): string[] {
    const errs: string[] = [];
    switch (s) {
      case 1:
        if (!data.petType) errs.push("Please select a pet type.");
        if (!data.petSize) errs.push("Please select a pet size.");
        break;
      case 2:
        if (data.services.length === 0)
          errs.push("Please select at least one service.");
        break;
      case 3:
        if (!data.date) errs.push("Please select a date.");
        if (!data.time) errs.push("Please select a time.");
        break;
      case 4:
        if (!data.ownerName.trim()) errs.push("Full name is required.");
        if (!data.email.trim()) {
          errs.push("Email address is required.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          errs.push("Please enter a valid email address.");
        }
        if (!data.phone.trim()) errs.push("Phone number is required.");
        break;
    }
    return errs;
  }

  function announceStep(s: Step) {
    if (announcerRef.current) {
      announcerRef.current.textContent = `Step ${s} of ${STEPS.length}: ${STEPS[s - 1]}`;
    }
  }

  function next() {
    const errs = validateStep(step);
    if (errs.length > 0) {
      setStepErrors(errs);
      return;
    }
    setStepErrors([]);
    if (step < 5) {
      const nextStep = (step + 1) as Step;
      setStep(nextStep);
      announceStep(nextStep);
    }
  }
  function back() {
    setStepErrors([]);
    if (step > 1) {
      const prevStep = (step - 1) as Step;
      setStep(prevStep);
      announceStep(prevStep);
    }
  }

  function handleConfirm() {
    // Validate step 4 data before confirming
    const errs = validateStep(4);
    if (errs.length > 0) {
      setStepErrors(errs);
      return;
    }
    setStepErrors([]);
    // TODO: INTEGRATION — Submit to booking provider
    console.log("[MOCK BOOKING SUBMISSION]", data);
    setConfirmed(true);
  }

  const selectedServices = SERVICES.filter((s) => data.services.includes(s.id));
  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

  if (confirmed) {
    return (
      <div className="rounded-xl bg-primary-50 p-8 text-center" role="status">
        <span className="text-5xl" aria-hidden="true">
          🎉
        </span>
        <h3 className="mt-4 text-xl font-bold text-dark">Booking Confirmed!</h3>
        <p className="mt-2 text-neutral-600">
          Thank you, {data.ownerName}! We've received your booking request for{" "}
          {data.petName || "your pet"}.
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          We'll send a confirmation to {data.email} shortly.
        </p>
        <p className="mt-4 text-xs text-neutral-400 italic">
          (This is a demo — no real booking was created)
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Live region for step announcements */}
      <div
        ref={announcerRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Step Indicator */}
      <nav aria-label="Booking progress" className="mb-8">
        <ol className="flex items-center justify-between" role="list">
          {STEPS.map((label, i) => {
            const stepNum = (i + 1) as Step;
            const isActive = stepNum === step;
            const isCompleted = stepNum < step;
            return (
              <li
                key={label}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-primary-500 text-white shadow-md"
                      : isCompleted
                        ? "bg-primary-200 text-primary-700"
                        : "bg-neutral-200 text-neutral-400"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={`text-xs ${isActive ? "font-semibold text-primary-600" : "text-neutral-400"}`}
                >
                  {label}
                </span>
                <span className="sr-only">
                  {isCompleted
                    ? "(completed)"
                    : isActive
                      ? "(current step)"
                      : "(upcoming)"}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Validation errors */}
      {stepErrors.length > 0 && (
        <div
          className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4"
          role="alert"
        >
          <p className="text-sm font-medium text-red-800">
            Please fix the following:
          </p>
          <ul className="mt-1 list-disc pl-5 text-sm text-red-700">
            {stepErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Step Content */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Step 1: Pet Info */}
        {step === 1 && (
          <fieldset>
            <legend className="text-lg font-bold text-dark">
              Tell Us About Your Pet
            </legend>
            <div className="mt-6 space-y-5">
              <div>
                <label
                  className="block text-sm font-medium text-dark"
                  id="pet-type-label"
                >
                  Pet Type *
                </label>
                <div
                  className="mt-2 flex gap-3"
                  role="radiogroup"
                  aria-labelledby="pet-type-label"
                >
                  {PET_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      role="radio"
                      aria-checked={data.petType === type}
                      onClick={() => update({ petType: type })}
                      className={`inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-all ${
                        data.petType === type
                          ? "border-primary-500 bg-primary-50 text-primary-600 ring-2 ring-primary-200"
                          : "border-neutral-300 text-neutral-600 hover:border-neutral-400"
                      }`}
                    >
                      {type === "Dog" ? <DogIcon /> : <CatIcon />} {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="pet-size"
                  className="block text-sm font-medium text-dark"
                >
                  Pet Size *
                </label>
                <select
                  id="pet-size"
                  value={data.petSize}
                  onChange={(e) => update({ petSize: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-dark shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                >
                  <option value="">Select size…</option>
                  {PET_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="pet-name"
                  className="block text-sm font-medium text-dark"
                >
                  Pet's Name{" "}
                  <span className="text-xs text-neutral-400">(optional)</span>
                </label>
                <input
                  id="pet-name"
                  type="text"
                  value={data.petName}
                  onChange={(e) => update({ petName: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-dark shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Buddy"
                />
              </div>
            </div>
          </fieldset>
        )}

        {/* Step 2: Services */}
        {step === 2 && (
          <fieldset>
            <legend className="text-lg font-bold text-dark">
              Choose Your Services
            </legend>
            <p className="mt-1 text-sm text-neutral-500">
              Select one or more services.
            </p>
            <div className="mt-6 space-y-3">
              {SERVICES.map((service) => {
                const selected = data.services.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`flex w-full items-center justify-between rounded-lg border px-5 py-4 text-left transition-all ${
                      selected
                        ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                        : "border-neutral-300 hover:border-neutral-400"
                    }`}
                    aria-pressed={selected}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                          selected
                            ? "border-primary-500 bg-primary-500"
                            : "border-neutral-300"
                        }`}
                      >
                        {selected && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="text-sm font-medium text-dark">
                        {service.name}
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-primary-600">
                      From ${service.price}
                    </span>
                  </button>
                );
              })}
            </div>
            {selectedServices.length > 0 && (
              <div className="mt-4 rounded-lg bg-neutral-50 px-5 py-3 text-sm">
                <span className="text-neutral-500">Estimated total: </span>
                <span className="font-semibold text-dark">From ${total}</span>
              </div>
            )}
          </fieldset>
        )}

        {/* Step 3: Date & Time */}
        {step === 3 && (
          <fieldset>
            <legend className="text-lg font-bold text-dark">
              Pick a Date & Time
            </legend>
            <p className="mt-1 text-sm text-neutral-500">
              Choose your preferred appointment time.
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="booking-date"
                  className="block text-sm font-medium text-dark"
                >
                  Date *
                </label>
                <input
                  id="booking-date"
                  type="date"
                  value={data.date}
                  onChange={(e) => update({ date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-dark shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div>
                <label
                  htmlFor="booking-time"
                  className="block text-sm font-medium text-dark"
                >
                  Preferred Time *
                </label>
                <select
                  id="booking-time"
                  value={data.time}
                  onChange={(e) => update({ time: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-dark shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                >
                  <option value="">Select a time…</option>
                  {[
                    "8:00 AM",
                    "9:00 AM",
                    "10:00 AM",
                    "11:00 AM",
                    "12:00 PM",
                    "1:00 PM",
                    "2:00 PM",
                    "3:00 PM",
                    "4:00 PM",
                    "5:00 PM",
                  ].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-sm font-medium text-dark"
                >
                  Special Notes{" "}
                  <span className="text-xs text-neutral-400">(optional)</span>
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={data.notes}
                  onChange={(e) => update({ notes: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-dark shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Any allergies, behavioral notes, or preferences..."
                />
              </div>
            </div>
          </fieldset>
        )}

        {/* Step 4: Contact Info */}
        {step === 4 && (
          <fieldset>
            <legend className="text-lg font-bold text-dark">
              Your Contact Information
            </legend>
            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="owner-name"
                  className="block text-sm font-medium text-dark"
                >
                  Full Name *
                </label>
                <input
                  id="owner-name"
                  type="text"
                  autoComplete="name"
                  value={data.ownerName}
                  onChange={(e) => update({ ownerName: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-dark shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="owner-email"
                  className="block text-sm font-medium text-dark"
                >
                  Email Address *
                </label>
                <input
                  id="owner-email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-dark shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="owner-phone"
                  className="block text-sm font-medium text-dark"
                >
                  Phone Number *
                </label>
                <input
                  id="owner-phone"
                  type="tel"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-dark shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </fieldset>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <div>
            <h3 className="text-lg font-bold text-dark">Review Your Booking</h3>
            <p className="mt-1 text-sm text-neutral-500">
              Please confirm the details below.
            </p>

            <div className="mt-6 space-y-4 divide-y divide-neutral-100">
              <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-neutral-400">Pet</span>
                  <p className="font-medium text-dark">
                    {data.petName || "N/A"} ({data.petType}, {data.petSize})
                  </p>
                </div>
                <div>
                  <span className="text-xs text-neutral-400">Date & Time</span>
                  <p className="font-medium text-dark">
                    {data.date} at {data.time}
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <span className="text-xs text-neutral-400">Services</span>
                <ul className="mt-1 space-y-1">
                  {selectedServices.map((s) => (
                    <li key={s.id} className="flex justify-between text-sm">
                      <span className="text-dark">{s.name}</span>
                      <span className="font-medium text-dark">
                        From ${s.price}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-between border-t border-neutral-200 pt-2 text-sm font-semibold">
                  <span>Estimated Total</span>
                  <span>From ${total}</span>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-2 pt-4 sm:grid-cols-3">
                <div>
                  <span className="text-xs text-neutral-400">Name</span>
                  <p className="text-sm text-dark">{data.ownerName}</p>
                </div>
                <div>
                  <span className="text-xs text-neutral-400">Email</span>
                  <p className="text-sm text-dark">{data.email}</p>
                </div>
                <div>
                  <span className="text-xs text-neutral-400">Phone</span>
                  <p className="text-sm text-dark">{data.phone}</p>
                </div>
              </div>
              {data.notes && (
                <div className="pt-4">
                  <span className="text-xs text-neutral-400">Notes</span>
                  <p className="text-sm text-neutral-600">{data.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </button>
          ) : (
            <span />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-1 rounded-full bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 active:scale-[0.97]"
            >
              Next
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex items-center justify-center rounded-full bg-accent-400 px-8 py-3 text-sm font-semibold text-dark shadow-sm transition-all hover:bg-accent-500 active:scale-[0.97]"
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
