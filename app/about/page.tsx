
"use client";

import { useState } from "react";

const values = [
  {
    number: "01",
    title: "Excellence",
    description:
      "Encouraging every learner to pursue their best in academics and personal development.",
  },
  {
    number: "02",
    title: "Integrity",
    description:
      "Promoting honesty, respect and responsibility in everything we do.",
  },
  {
    number: "03",
    title: "Discipline",
    description:
      "Building positive habits, commitment and self-discipline among our learners.",
  },
  {
    number: "04",
    title: "Innovation",
    description:
      "Encouraging creativity, curiosity and an open mind towards new ideas.",
  },
];

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/#academics" },
  { label: "Facilities", href: "/#facilities" },
  { label: "News", href: "/#announcements" },
  { label: "Events", href: "/#events" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/#contact" },
];

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#101813] text-white">

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#101813]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

          {/* LOGO */}
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#c9a45c] text-lg font-bold text-[#d4b36e] sm:h-12 sm:w-12 sm:text-xl">
              SG
            </div>

            <div>
              <h1 className="whitespace-nowrap text-sm font-bold tracking-wider sm:text-lg">
                ST GEORGES
              </h1>
              <p className="text-[9px] tracking-[0.3em] text-[#c9a45c] sm:text-[10px] sm:tracking-[0.35em]">
                ACADEMY
              </p>
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-5 text-sm text-gray-300 lg:flex">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`transition hover:text-[#d4b36e] ${
                  link.label === "About" ? "text-[#d4b36e]" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* DESKTOP ENQUIRY */}
          <a
            href="/admissions"
            className="hidden bg-[#c9a45c] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#101813] transition hover:bg-white lg:block"
          >
            Enquire Now
          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="about-mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-2xl text-[#d4b36e] transition hover:border-[#c9a45c] lg:hidden"
          >
            {mobileMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <nav
            id="about-mobile-navigation"
            className="border-t border-white/10 bg-[#101813] px-5 py-5 lg:hidden"
          >
            <div className="flex flex-col gap-1 text-sm text-gray-300">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b border-white/10 py-3 transition hover:text-[#d4b36e] ${
                    link.label === "About" ? "text-[#d4b36e]" : ""
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <a
                href="/admissions"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 bg-[#c9a45c] px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#101813]"
              >
                Enquire Now
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* PAGE HERO */}
      <section
        className="relative flex min-h-[400px] items-center overflow-hidden bg-cover bg-center sm:min-h-[450px]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(8,20,13,0.94), rgba(8,20,13,0.55)), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1800&q=85')",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-24">
          <div className="max-w-3xl">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4b36e] sm:text-xs sm:tracking-[0.35em]">
              Discover St Georges Academy
            </p>

            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-7xl">
              About <span className="text-[#d4b36e]">Our School</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-gray-300 sm:mt-7 sm:text-base sm:leading-8">
              Discover our approach to education, the values that guide us
              and our commitment to developing confident and responsible learners.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-[#c9a45c]" />
      </section>

      {/* SCHOOL INTRODUCTION */}
     
<section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-6 sm:py-28 md:grid-cols-2 md:gap-14">
  <div>
    <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
      Who We Are
    </p>

    <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
      Education built around the potential of every learner.
    </h2>

    <p className="mt-7 leading-8 text-gray-400">
      St Georges Academy is presented as a learning community
      committed to academic development, personal growth and
      responsible citizenship.
    </p>

    <p className="mt-5 leading-8 text-gray-400">
      We believe that every learner deserves an opportunity to
      discover their strengths, develop their abilities and
      prepare for the opportunities and challenges of tomorrow.
    </p>

    <a
      href="/admissions"
      className="mt-8 inline-flex items-center justify-center bg-[#c9a45c] px-7 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#101813] transition hover:bg-white sm:text-sm"
    >
      Explore Admissions
    </a>
  </div>

  {/* Image-free design panel */}
  <div className="relative flex min-h-[300px] items-center justify-center rounded-xl border border-[#c9a45c]/30 bg-[#18251d] p-8 sm:min-h-[430px]">
    <div className="max-w-md text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#c9a45c] text-4xl text-[#d4b36e]">
        ✦
      </div>

      <h3 className="text-2xl font-bold text-white sm:text-3xl">
        Growing Together
      </h3>

      <p className="mt-4 leading-7 text-gray-300">
        Inspiring learners to discover their potential, develop their
        abilities and build a brighter future.
      </p>

      <div className="mx-auto mt-7 h-1 w-16 bg-[#c9a45c]" />
    </div>
  </div>
</section>

      {/* VISION AND MISSION */}
      <section className="bg-[#18251d] px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 md:grid-cols-2">

          {/* VISION */}
          <article className="border border-white/10 p-7 sm:p-10 md:p-14">
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
              Our Vision
            </span>

            <h2 className="mt-7 text-2xl font-semibold leading-snug sm:text-3xl">
              Inspiring a generation of capable and responsible individuals.
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              To be a centre of learning that nurtures excellence,
              character, creativity and lifelong learning.
            </p>
          </article>

          {/* MISSION */}
          <article className="border border-[#c9a45c]/40 bg-[#101813] p-7 sm:p-10 md:p-14">
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
              Our Mission
            </span>

            <h2 className="mt-7 text-2xl font-semibold leading-snug sm:text-3xl">
              Providing an environment where every learner can thrive.
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              To support holistic education through quality teaching,
              positive values, practical learning and opportunities
              for personal development.
            </p>
          </article>

        </div>
      </section>

      {/* CORE VALUES */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
            What Guides Us
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            The values behind everything we do.
          </h2>

          <p className="mt-6 leading-8 text-gray-400">
            Our values provide the foundation for our learning
            environment and guide the way we interact with one another.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <article
              key={value.number}
              className="border border-white/10 bg-[#18251d] p-7 transition duration-300 hover:border-[#c9a45c] sm:p-8"
            >
              <span className="text-4xl font-light text-[#c9a45c]">
                {value.number}
              </span>

              <h3 className="mt-8 text-2xl font-semibold">
                {value.title}
              </h3>

              <p className="mt-5 text-sm leading-7 text-gray-400">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="border-t border-[#c9a45c]/30 bg-[#18251d] px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
            Join Our Learning Community
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl">
            Discover the St Georges Academy experience.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-400">
            Learn more about our educational approach and opportunities
            for prospective learners.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/admissions"
              className="inline-flex items-center justify-center bg-[#c9a45c] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#101813] transition hover:bg-white sm:text-sm"
            >
              Apply for Admission
            </a>

            <a
              href="/"
              className="inline-flex items-center justify-center border border-white/40 px-8 py-4 text-xs font-bold uppercase tracking-wider transition hover:border-[#c9a45c] hover:text-[#d4b36e] sm:text-sm"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#090e0b] px-5 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h3 className="font-bold tracking-widest">
              ST GEORGES ACADEMY
            </h3>

            <p className="mt-3 text-sm text-gray-500">
              Inspiring minds. Building futures.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm text-gray-400">
            <a href="/" className="hover:text-[#d4b36e]">Home</a>
            <a href="/about" className="hover:text-[#d4b36e]">About</a>
            <a href="/admissions" className="hover:text-[#d4b36e]">Admissions</a>
            <a href="/#contact" className="hover:text-[#d4b36e]">Contact</a>
          </div>

          <p className="text-xs text-gray-500">
            © 2026 St Georges Academy. All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  );
}
