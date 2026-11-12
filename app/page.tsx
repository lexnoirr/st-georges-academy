
"use client";

import { useEffect, useState } from "react";

const ANNOUNCEMENTS_KEY = "sga_demo_announcements";
const EVENTS_KEY = "sga_demo_events";

type Announcement = {
  id: string;
  title: string;
  message: string;
  date: string;
};

type SchoolEvent = {
  id: string;
  title: string;
  date: string;
  type: string;
};

const facilities = [
  {
    title: "Modern Classrooms",
    description:
      "Comfortable learning spaces designed to encourage concentration and academic growth.",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=85",
    number: "01",
  },
  {
    title: "School Library",
    description:
      "A welcoming environment for reading, research, discovery and independent learning.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=85",
    number: "02",
  },
  {
    title: "Science Laboratory",
    description:
      "Practical learning opportunities that bring scientific ideas to life.",
    image:
      "https://images.unsplash.com/photo-1581093458791-9d42e3c6c7c7?auto=format&fit=crop&w=1000&q=85",
    number: "03",
  },
  {
    title: "Computer Laboratory",
    description:
      "Technology-focused learning that prepares students for a digital world.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85",
    number: "04",
  },
];

const programmes = [
  {
    number: "01",
    title: "Academic Excellence",
    description:
      "Encouraging curiosity, independent thinking and a strong foundation for lifelong learning.",
  },
  {
    number: "02",
    title: "Talent Development",
    description:
      "Helping learners discover their abilities through creative, cultural and extracurricular activities.",
  },
  {
    number: "03",
    title: "Personal Growth",
    description:
      "Building confidence, discipline, leadership and responsibility in every learner.",
  },
];

const mobileLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "#academics" },
  { label: "Facilities", href: "#facilities" },
  { label: "News", href: "#announcements" },
  { label: "Events", href: "#events" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [currentYear, setCurrentYear] = useState<number | null>(null);
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    const loadUpdates = () => {
      try {
        const savedAnnouncements = localStorage.getItem(ANNOUNCEMENTS_KEY);
        const savedEvents = localStorage.getItem(EVENTS_KEY);

        setAnnouncements(
          savedAnnouncements ? JSON.parse(savedAnnouncements) : []
        );

        setEvents(savedEvents ? JSON.parse(savedEvents) : []);
      } catch {
        setAnnouncements([]);
        setEvents([]);
      }
    };

    loadUpdates();

    window.addEventListener("storage", loadUpdates);

    return () => {
      window.removeEventListener("storage", loadUpdates);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#101813] text-white">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#101813]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

          {/* SCHOOL LOGO */}
          <a
            href="#home"
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
            <a href="#home" className="hover:text-[#d4b36e]">Home</a>
            <a href="/about" className="hover:text-[#d4b36e]">About</a>
            <a href="#academics" className="hover:text-[#d4b36e]">Academics</a>
            <a href="#facilities" className="hover:text-[#d4b36e]">Facilities</a>
            <a href="#announcements" className="hover:text-[#d4b36e]">News</a>
            <a href="#events" className="hover:text-[#d4b36e]">Events</a>
            <a href="/admissions" className="hover:text-[#d4b36e]">Admissions</a>
            <a href="#contact" className="hover:text-[#d4b36e]">Contact</a>
          </nav>

          {/* DESKTOP ENQUIRY BUTTON */}
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
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-2xl text-[#d4b36e] transition hover:border-[#c9a45c] lg:hidden"
          >
            {mobileMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* MOBILE NAVIGATION MENU */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="border-t border-white/10 bg-[#101813] px-5 py-5 lg:hidden"
          >
            <div className="flex flex-col gap-1 text-sm text-gray-300">
              {mobileLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-white/10 py-3 transition hover:text-[#d4b36e]"
                >
                  {item.label}
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

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-[600px] items-center overflow-hidden bg-cover bg-center sm:min-h-[650px] lg:min-h-[680px]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(8,20,13,0.94), rgba(8,20,13,0.65), rgba(8,20,13,0.25)), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=85')",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4b36e] sm:mb-7 sm:text-xs sm:tracking-[0.4em]">
              Welcome to St Georges Academy
            </p>

            <h2 className="text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl md:text-7xl">
              Inspiring minds.
              <span className="block text-[#d4b36e]">
                Building futures.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-gray-200 sm:mt-8 sm:text-base sm:leading-8 md:text-lg">
              We believe every learner deserves an environment where
              knowledge, character and creativity come together to shape
              a brighter future.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href="/about"
                className="inline-flex items-center justify-center bg-[#c9a45c] px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#101813] transition hover:bg-white sm:px-8 sm:text-sm"
              >
                Discover Our School
              </a>

              <a
                href="#facilities"
                className="inline-flex items-center justify-center border border-white/60 px-6 py-4 text-center text-xs font-bold uppercase tracking-wider transition hover:border-[#d4b36e] hover:text-[#d4b36e] sm:px-8 sm:text-sm"
              >
                Explore Facilities
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-[#c9a45c]" />
      </section>

      {/* INTRODUCTION */}
      <section
        id="about"
        className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-6 sm:py-28 md:grid-cols-2 md:gap-16"
      >
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
            About Our Academy
          </p>

          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            A foundation for lifelong success.
          </h2>

          <p className="mt-7 leading-8 text-gray-400">
            At St Georges Academy, we recognise that education is about
            more than academic performance. It is about nurturing
            responsible, confident and capable individuals.
          </p>

          <p className="mt-5 leading-8 text-gray-400">
            Through a supportive learning environment, dedicated teaching
            and opportunities for personal development, we aim to help
            every learner discover their potential.
          </p>

          <a
            href="/about"
            className="mt-9 inline-block border-b border-[#c9a45c] pb-2 text-sm font-bold uppercase tracking-widest text-[#d4b36e] hover:text-white"
          >
            Get to Know Us →
          </a>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1100&q=85"
            alt="Modern educational library"
            className="h-[300px] w-full object-cover sm:h-[440px]"
          />
          <div className="absolute -bottom-5 -left-5 hidden h-32 w-32 border-b-4 border-l-4 border-[#c9a45c] md:block" />
        </div>
      </section>

      {/* FACILITIES */}
      <section id="facilities" className="bg-[#18251d] px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl sm:mb-16">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
              Our Learning Environment
            </p>

            <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
              Spaces designed for learning and discovery.
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              An inspiring learning environment gives students the
              opportunity to explore ideas, develop practical skills
              and discover new interests.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((facility) => (
              <article
                key={facility.number}
                className="group overflow-hidden border border-white/10 bg-[#101813] transition duration-300 hover:-translate-y-2 hover:border-[#c9a45c]"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-3xl font-light text-[#d4b36e]">
                    {facility.number}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold">
                    {facility.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-gray-400">
                    {facility.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMICS */}
      <section id="academics" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
            Learning and Development
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Developing the whole learner.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {programmes.map((programme) => (
            <article
              key={programme.number}
              className="border border-white/10 bg-[#18251d] p-7 transition hover:border-[#c9a45c] sm:p-9"
            >
              <span className="text-4xl font-light text-[#c9a45c]">
                {programme.number}
              </span>

              <h3 className="mt-8 text-2xl font-semibold">
                {programme.title}
              </h3>

              <p className="mt-5 leading-8 text-gray-400">
                {programme.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* STUDENT LIFE */}
      <section className="bg-[#18251d] px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <img
              src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1100&q=85"
              alt="Students participating in school activities"
              className="h-[300px] w-full object-cover sm:h-[420px]"
            />
          </div>

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
              Life at St Georges
            </p>

            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Learning continues beyond the classroom.
            </h2>

            <p className="mt-7 leading-8 text-gray-400">
              We value the experiences that help learners develop
              confidence, teamwork, leadership and a sense of belonging.
              School life should inspire students to grow in every aspect
              of their lives.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "Sports and physical activities",
                "Creative and cultural activities",
                "Leadership and teamwork",
                "Character and personal development",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 text-gray-300"
                >
                  <span className="text-[#d4b36e]">✦</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADMISSIONS */}
      <section
        id="admissions"
        className="border-y border-[#c9a45c]/30 bg-[#101813] px-5 py-20 sm:px-6 sm:py-24"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center md:gap-10">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
              Admissions
            </p>

            <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
              Take the next step towards a brighter future.
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              Contact St Georges Academy to learn more about admissions,
              learning programmes and opportunities for your child.
            </p>
          </div>

          <a
            href="/admissions"
            className="inline-flex w-full items-center justify-center bg-[#c9a45c] px-7 py-5 text-center text-xs font-bold uppercase tracking-wider text-[#101813] transition hover:bg-white sm:w-auto sm:px-9 sm:text-sm"
          >
            Apply for Admission
          </a>
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section id="announcements" className="bg-[#18251d] px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
              School Updates
            </p>

            <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
              Latest Announcements
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              Keep up with notices and updates from the school administration.
            </p>
          </div>

          {announcements.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {announcements.map((announcement) => (
                <article
                  key={announcement.id}
                  className="border border-white/10 bg-[#101813] p-6 sm:p-7"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#d4b36e]">
                    {announcement.date}
                  </p>

                  <h3 className="mt-4 text-xl font-semibold">
                    {announcement.title}
                  </h3>

                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-gray-400">
                    {announcement.message}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="border border-white/10 bg-[#101813] p-6 text-gray-400 sm:p-7">
              There are no announcements at the moment. Please check again soon.
            </p>
          )}
        </div>
      </section>

      {/* SCHOOL EVENTS */}
      <section id="events" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
            School Calendar
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Upcoming School Events
          </h2>

          <p className="mt-6 leading-8 text-gray-400">
            Find out about upcoming activities and important dates.
          </p>
        </div>

        {events.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="border border-white/10 bg-[#18251d] p-6 sm:p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[#d4b36e]">
                  {event.date}
                </p>

                <h3 className="mt-4 text-xl font-semibold">
                  {event.title}
                </h3>

                <p className="mt-3 text-sm text-gray-400">
                  {event.type}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="border border-white/10 bg-[#18251d] p-6 text-gray-400 sm:p-7">
            No upcoming events have been announced yet.
          </p>
        )}
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 sm:py-28 md:grid-cols-2 md:gap-14"
      >
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#c9a45c]">
            Contact Us
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            We would be glad to hear from you.
          </h2>

          <p className="mt-7 max-w-lg leading-8 text-gray-400">
            Whether you are a parent, prospective student or visitor,
            our team welcomes your enquiries.
          </p>
        </div>

        <div className="border border-white/10 bg-[#18251d] p-6 sm:p-9">
          <h3 className="text-2xl font-semibold">St Georges Academy</h3>

          <p className="mt-5 leading-7 text-gray-400">
            For admissions and general enquiries, please get in touch
            with the school administration.
          </p>

          <a
            href="mailto:info@stgeorgesacademy.co.ke"
            className="mt-8 inline-block border-b border-[#c9a45c] pb-2 text-[#d4b36e] hover:text-white"
          >
            Email the School →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#090e0b] px-5 py-12 sm:px-6">
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
            <a href="#home" className="hover:text-[#d4b36e]">Home</a>
            <a href="/about" className="hover:text-[#d4b36e]">About</a>
            <a href="#facilities" className="hover:text-[#d4b36e]">Facilities</a>
            <a href="#announcements" className="hover:text-[#d4b36e]">News</a>
            <a href="#events" className="hover:text-[#d4b36e]">Events</a>
            <a href="#contact" className="hover:text-[#d4b36e]">Contact</a>
          </div>

          <p className="text-xs text-gray-500">
           © {currentYear ?? "2026"} St Georges Academy.
            All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
