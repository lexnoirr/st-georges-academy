
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

const APPLICATIONS_KEY = "sga_demo_applications";

const initialForm = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  applyingFor: "",
  previousSchool: "",
  parentName: "",
  relationship: "",
  phone: "",
  email: "",
  address: "",
  message: "",
  terms: false,
};

const admissionSteps = [
  {
    number: "01",
    title: "Complete the form",
    description: "Provide the student's and parent's details.",
  },
  {
    number: "02",
    title: "Submit application",
    description: "Review the information and submit your application.",
  },
  {
    number: "03",
    title: "Application review",
    description: "The school administration reviews the application.",
  },
  {
    number: "04",
    title: "Admission feedback",
    description: "Receive further admission information.",
  },
];

const inputClass =
  "mt-2 w-full rounded-md border border-white/10 bg-[#101813] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]";

const labelClass = "block text-sm font-medium text-gray-300";

export default function AdmissionsPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const updateField = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ref =
      "SGA-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const newApplication = {
      id: ref,
      firstName: form.firstName,
      lastName: form.lastName,
      dob: form.dob,
      gender: form.gender,
      classApplyingFor: form.applyingFor,
      previousSchool: form.previousSchool,
      parentName: form.parentName,
      relationship: form.relationship,
      phone: form.phone,
      email: form.email,
      address: form.address,
      message: form.message,
      submittedAt: new Date().toISOString().slice(0, 10),
      status: "Pending",
    };

    try {
      const saved = localStorage.getItem(APPLICATIONS_KEY);
      const existingApplications = saved ? JSON.parse(saved) : [];

      if (!Array.isArray(existingApplications)) {
        throw new Error("Invalid application records");
      }

      localStorage.setItem(
        APPLICATIONS_KEY,
        JSON.stringify([newApplication, ...existingApplications])
      );

      setReference(ref);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      alert(
        "We could not save your demonstration application. Please try again."
      );
    }
  };

  const resetApplication = () => {
    setForm(initialForm);
    setReference("");
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101813] px-5 py-16 text-white">
        <div className="w-full max-w-2xl rounded-xl border border-[#c9a45c]/30 bg-[#18251d] p-8 text-center shadow-2xl md:p-14">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#c9a45c] text-4xl text-[#d4b36e]">
            ✓
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
            Application Received
          </p>

          <h1 className="mt-5 text-3xl font-bold md:text-4xl">
            Thank you, {form.firstName}!
          </h1>

          <p className="mt-5 leading-8 text-gray-400">
            Your demonstration application has been submitted successfully.
            Thank you for considering St Georges Academy.
          </p>

          <div className="mt-9 rounded-lg border border-white/10 bg-[#101813] p-6">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Demo application reference
            </p>

            <p className="mt-3 text-2xl font-bold tracking-wider text-[#d4b36e]">
              {reference}
            </p>

            <p className="mt-4 text-xs text-gray-500">
              This is a sample reference generated for demonstration.
            </p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={resetApplication}
              className="rounded-md bg-[#c9a45c] px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#101813] transition hover:bg-white"
            >
              New Application
            </button>

            <a
              href="/"
              className="rounded-md border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-wider transition hover:border-[#c9a45c]"
            >
              Back Home
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#101813] text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#101813]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a45c] font-bold text-[#d4b36e]">
              SG
            </div>

            <div>
              <h2 className="font-bold tracking-wide">ST GEORGES</h2>
              <p className="text-[10px] tracking-[3px] text-[#d4b36e]">
                ACADEMY
              </p>
            </div>
          </a>

          <a
            href="/"
            className="text-sm text-gray-300 transition hover:text-[#d4b36e]"
          >
            ← Back to Homepage
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#14231a] px-5 py-20 sm:px-8 sm:py-28">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#c9a45c]/20" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-[#c9a45c]/20" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
            Join Our Learning Community
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Admissions{" "}
            <span className="text-[#d4b36e]">2026</span>
          </h1>

          <div className="my-7 h-1 w-20 bg-[#c9a45c]" />

          <p className="max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
            Take the first step towards an exciting learning journey.
            Complete the application form below to express your interest
            in joining St Georges Academy.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.7fr] lg:gap-14">
        {/* SIDEBAR */}
        <aside className="space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c9a45c]">
              How to Apply
            </p>

            <h2 className="mt-4 text-2xl font-bold">
              Admission Process
            </h2>

            <div className="mt-8 space-y-7">
              {admissionSteps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <span className="text-xl font-bold text-[#c9a45c]">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#c9a45c]/30 bg-[#18251d] p-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a45c] text-xl text-[#d4b36e]">
              ?
            </div>

            <h3 className="text-lg font-bold">Need Assistance?</h3>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Contact the school administration if you need help with
              the application process.
            </p>

            <a
              href="/#contact"
              className="mt-5 inline-block text-sm font-bold text-[#d4b36e] hover:text-white"
            >
              Contact the School →
            </a>
          </div>

          <div className="rounded-lg border border-white/10 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Important
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              Please provide accurate student and parent information
              before submitting the application.
            </p>
          </div>
        </aside>

        {/* APPLICATION FORM */}
        <div className="min-w-0 rounded-xl border border-white/10 bg-[#18251d] p-5 shadow-xl sm:p-8 md:p-10">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c9a45c]">
              Online Application
            </p>

            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Student Application Form
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Fields marked with * are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* STUDENT INFORMATION */}
            <section>
              <h3 className="mb-6 border-b border-white/10 pb-4 text-lg font-bold sm:text-xl">
                <span className="mr-3 text-[#c9a45c]">01.</span>
                Student Information
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  First Name *
                  <input
                    required
                    name="firstName"
                    value={form.firstName}
                    onChange={updateField}
                    className={inputClass}
                    placeholder="Student first name"
                  />
                </label>

                <label className={labelClass}>
                  Last Name *
                  <input
                    required
                    name="lastName"
                    value={form.lastName}
                    onChange={updateField}
                    className={inputClass}
                    placeholder="Student last name"
                  />
                </label>

                <label className={labelClass}>
                  Date of Birth *
                  <input
                    required
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={updateField}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Gender *
                  <select
                    required
                    name="gender"
                    value={form.gender}
                    onChange={updateField}
                    className={inputClass}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Class Applying For *
                  <select
                    required
                    name="applyingFor"
                    value={form.applyingFor}
                    onChange={updateField}
                    className={inputClass}
                  >
                    <option value="">Select class</option>
                    <option>Playgroup</option>
                    <option>PP1</option>
                    <option>PP2</option>
                    <option>Grade 1</option>
                    <option>Grade 2</option>
                    <option>Grade 3</option>
                    <option>Grade 4</option>
                    <option>Grade 5</option>
                    <option>Grade 6</option>
                    <option>Grade 7</option>
                    <option>Grade 8</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option>Form 1</option>
                    <option>Form 2</option>
                    <option>Form 3</option>
                    <option>Form 4</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Previous School
                  <input
                    name="previousSchool"
                    value={form.previousSchool}
                    onChange={updateField}
                    className={inputClass}
                    placeholder="Name of previous school"
                  />
                </label>
              </div>
            </section>

            {/* PARENT INFORMATION */}
            <section>
              <h3 className="mb-6 border-b border-white/10 pb-4 text-lg font-bold sm:text-xl">
                <span className="mr-3 text-[#c9a45c]">02.</span>
                Parent / Guardian Information
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  Parent / Guardian Name *
                  <input
                    required
                    name="parentName"
                    value={form.parentName}
                    onChange={updateField}
                    className={inputClass}
                    placeholder="Full name"
                  />
                </label>

                <label className={labelClass}>
                  Relationship to Student *
                  <select
                    required
                    name="relationship"
                    value={form.relationship}
                    onChange={updateField}
                    className={inputClass}
                  >
                    <option value="">Select relationship</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Guardian</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Phone Number *
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                    className={inputClass}
                    placeholder="+254 7XX XXX XXX"
                  />
                </label>

                <label className={labelClass}>
                  Email Address *
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    className={inputClass}
                    placeholder="example@email.com"
                  />
                </label>

                <label className={`${labelClass} sm:col-span-2`}>
                  Residential Address
                  <input
                    name="address"
                    value={form.address}
                    onChange={updateField}
                    className={inputClass}
                    placeholder="Town, estate or area"
                  />
                </label>
              </div>
            </section>

            {/* ADDITIONAL INFORMATION */}
            <section>
              <h3 className="mb-6 border-b border-white/10 pb-4 text-lg font-bold sm:text-xl">
                <span className="mr-3 text-[#c9a45c]">03.</span>
                Additional Information
              </h3>

              <label className={labelClass}>
                Additional Information or Enquiries
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  rows={5}
                  className={inputClass}
                  placeholder="Tell us anything else the school should know..."
                />
              </label>
            </section>

            {/* TERMS */}
            <label className="flex items-start gap-3 text-sm leading-6 text-gray-400">
              <input
                required
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={updateField}
                className="mt-1 h-4 w-4 accent-[#c9a45c]"
              />

              <span>
                I confirm that the information provided is accurate
                and understand that this is a demonstration application.
              </span>
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full rounded-md bg-[#c9a45c] px-8 py-5 text-sm font-bold uppercase tracking-[0.2em] text-[#101813] transition hover:bg-white"
            >
              Submit Application →
            </button>

            <p className="text-center text-xs leading-6 text-gray-500">
              Demonstration only. Your application is saved in this
              browser and is visible in the demonstration admin dashboard.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#090e0b] px-5 py-10 text-center">
        <h3 className="font-bold tracking-widest">
          ST GEORGES ACADEMY
        </h3>

        <p className="mt-3 text-xs text-gray-500">
          Inspiring minds. Building futures.
        </p>

        <a
          href="/"
          className="mt-5 inline-block text-sm text-[#d4b36e] transition hover:text-white"
        >
          Back to Homepage
        </a>

        <p className="mt-6 text-xs text-gray-600">
          © 2026 St Georges Academy. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
