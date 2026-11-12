
"use client";

import { useEffect, useMemo, useState } from "react";

type Application = {
  id: string;
  firstName: string;
  lastName: string;
  dob?: string;
  gender?: string;
  classApplyingFor: string;
  previousSchool?: string;
  parentName: string;
  relationship?: string;
  phone: string;
  email: string;
  address?: string;
  message?: string;
  submittedAt: string;
  status: "Pending" | "Approved" | "Rejected";
};

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

const APPLICATIONS_KEY = "sga_demo_applications";
const ANNOUNCEMENTS_KEY = "sga_demo_announcements";
const EVENTS_KEY = "sga_demo_events";

const sampleApplications: Application[] = [
  {
    id: "SGA-2026-001",
    firstName: "Brian",
    lastName: "Kamau",
    dob: "",
    gender: "",
    classApplyingFor: "Grade 7",
    previousSchool: "Green Valley School",
    parentName: "James Kamau",
    relationship: "Father",
    phone: "0712345678",
    email: "parent@example.com",
    address: "",
    message: "",
    submittedAt: "2026-11-10",
    status: "Pending",
  },
  {
    id: "SGA-2026-002",
    firstName: "Faith",
    lastName: "Wanjiku",
    classApplyingFor: "Grade 5",
    previousSchool: "Sunrise Academy",
    parentName: "Mary Wanjiku",
    phone: "0723456789",
    email: "guardian@example.com",
    submittedAt: "2026-11-09",
    status: "Approved",
  },
  {
    id: "SGA-2026-003",
    firstName: "Kevin",
    lastName: "Otieno",
    classApplyingFor: "Grade 8",
    previousSchool: "Bright Future School",
    parentName: "Peter Otieno",
    phone: "0734567890",
    email: "parent2@example.com",
    submittedAt: "2026-11-08",
    status: "Rejected",
  },
];

const initialAnnouncements: Announcement[] = [
  {
    id: "announcement-1",
    title: "Welcome to St Georges Academy",
    message: "Welcome to our school website demonstration.",
    date: "2026-11-12",
  },
  {
    id: "announcement-2",
    title: "Admissions are open",
    message: "Parents can submit an application through the admissions page.",
    date: "2026-11-12",
  },
];

const initialEvents: SchoolEvent[] = [
  {
    id: "event-1",
    title: "Parents' Meeting",
    date: "20 November 2026",
    type: "School Meeting",
  },
  {
    id: "event-2",
    title: "End of Term Activities",
    date: "27 November 2026",
    type: "School Event",
  },
  {
    id: "event-3",
    title: "Sports Day",
    date: "4 December 2026",
    type: "Sports",
  },
];

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<SchoolEvent[]>([]);

  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Application | null>(null);

  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("School Event");

  const [loaded, setLoaded] = useState(false);

  // LOAD DEMONSTRATION DATA
  useEffect(() => {
    try {
      const savedApplications = localStorage.getItem(APPLICATIONS_KEY);
      const savedAnnouncements = localStorage.getItem(ANNOUNCEMENTS_KEY);
      const savedEvents = localStorage.getItem(EVENTS_KEY);

      const parsedApplications = savedApplications
        ? JSON.parse(savedApplications)
        : null;

      const parsedAnnouncements = savedAnnouncements
        ? JSON.parse(savedAnnouncements)
        : null;

      const parsedEvents = savedEvents
        ? JSON.parse(savedEvents)
        : null;

      if (Array.isArray(parsedApplications)) {
        setApplications(parsedApplications);
      } else {
        setApplications(sampleApplications);
        localStorage.setItem(
          APPLICATIONS_KEY,
          JSON.stringify(sampleApplications)
        );
      }

      if (Array.isArray(parsedAnnouncements)) {
        setAnnouncements(parsedAnnouncements);
      } else {
        setAnnouncements(initialAnnouncements);
        localStorage.setItem(
          ANNOUNCEMENTS_KEY,
          JSON.stringify(initialAnnouncements)
        );
      }

      if (Array.isArray(parsedEvents)) {
        setEvents(parsedEvents);
      } else {
        setEvents(initialEvents);
        localStorage.setItem(
          EVENTS_KEY,
          JSON.stringify(initialEvents)
        );
      }
    } catch (error) {
      console.error("Could not load demonstration data:", error);
      setApplications(sampleApplications);
      setAnnouncements(initialAnnouncements);
      setEvents(initialEvents);
    }

    setLoaded(true);
  }, []);

  // SAVE APPLICATIONS
  const saveApplications = (updated: Application[]) => {
    try {
      localStorage.setItem(
        APPLICATIONS_KEY,
        JSON.stringify(updated)
      );
      setApplications(updated);
    } catch {
      alert("Could not save the application changes.");
    }
  };

  // SAVE ANNOUNCEMENTS
  const saveAnnouncements = (updated: Announcement[]) => {
    try {
      localStorage.setItem(
        ANNOUNCEMENTS_KEY,
        JSON.stringify(updated)
      );
      setAnnouncements(updated);
    } catch {
      alert("Could not save the announcement.");
    }
  };

  // SAVE EVENTS
  const saveEvents = (updated: SchoolEvent[]) => {
    try {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(updated));
      setEvents(updated);
    } catch {
      alert("Could not save the event.");
    }
  };

  // APPROVE OR REJECT APPLICATION
  const updateStatus = (
    id: string,
    status: Application["status"]
  ) => {
    const updated = applications.map((application) =>
      application.id === id
        ? { ...application, status }
        : application
    );

    saveApplications(updated);

    if (selected?.id === id) {
      setSelected({ ...selected, status });
    }
  };

  // PUBLISH ANNOUNCEMENT
  const addAnnouncement = () => {
    if (!announcementTitle.trim() || !announcementMessage.trim()) {
      alert("Please enter both a title and a message.");
      return;
    }

    const newAnnouncement: Announcement = {
      id: `announcement-${Date.now()}`,
      title: announcementTitle.trim(),
      message: announcementMessage.trim(),
      date: new Date().toISOString().slice(0, 10),
    };

    saveAnnouncements([newAnnouncement, ...announcements]);

    setAnnouncementTitle("");
    setAnnouncementMessage("");
  };

  // ADD EVENT
  const addEvent = () => {
    if (!eventTitle.trim() || !eventDate.trim()) {
      alert("Please enter an event title and date.");
      return;
    }

    const newEvent: SchoolEvent = {
      id: `event-${Date.now()}`,
      title: eventTitle.trim(),
      date: eventDate.trim(),
      type: eventType,
    };

    saveEvents([newEvent, ...events]);

    setEventTitle("");
    setEventDate("");
    setEventType("School Event");
  };

  // EDIT EVENT
  const editEvent = (event: SchoolEvent) => {
    const title = window.prompt(
      "Edit event title:",
      event.title
    );

    if (title === null || !title.trim()) return;

    const date = window.prompt(
      "Edit event date:",
      event.date
    );

    if (date === null || !date.trim()) return;

    const type = window.prompt(
      "Edit event category:",
      event.type
    );

    if (type === null || !type.trim()) return;

    const updated = events.map((item) =>
      item.id === event.id
        ? {
            ...item,
            title: title.trim(),
            date: date.trim(),
            type: type.trim(),
          }
        : item
    );

    saveEvents(updated);
  };

  // SEARCH AND FILTER APPLICATIONS
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const fullName =
        `${application.firstName} ${application.lastName}`.toLowerCase();

      const query = search.toLowerCase();

      const matchesSearch =
        fullName.includes(query) ||
        application.id.toLowerCase().includes(query) ||
        application.classApplyingFor.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" || application.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [applications, search, filter]);

  const pending = applications.filter(
    (a) => a.status === "Pending"
  ).length;

  const approved = applications.filter(
    (a) => a.status === "Approved"
  ).length;

  const rejected = applications.filter(
    (a) => a.status === "Rejected"
  ).length;

  const navItems = [
    "Overview",
    "Admissions",
    "Announcements",
    "Events",
  ];

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#f5f6f3] p-10 text-gray-600">
        Loading dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f6f3] text-[#1b2920]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-64 shrink-0 flex-col bg-[#14231a] p-6 text-white md:flex">
          <div className="mb-12">
            <div className="mb-2 text-2xl font-bold tracking-wide">
              ST GEORGES
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-[#d4b36e]">
              Academy Administration
            </p>
          </div>

          <p className="mb-4 text-xs uppercase tracking-widest text-gray-400">
            Main menu
          </p>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`w-full rounded-lg px-4 py-3 text-left text-sm transition ${
                  activeTab === item
                    ? "bg-[#c9a45c] font-semibold text-[#17231a]"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                {item === "Overview" && "▦  "}
                {item === "Admissions" && "▤  "}
                {item === "Announcements" && "▣  "}
                {item === "Events" && "▧  "}
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-6">
            <a
              href="/"
              className="block rounded-lg px-4 py-3 text-sm text-gray-300 hover:bg-white/10"
            >
              ← View school website
            </a>

            <p className="mt-5 px-4 text-xs text-gray-500">
              Demonstration dashboard
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="min-w-0 flex-1">

          {/* HEADER */}
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-white px-5 py-5 md:px-10">
            <div>
              <p className="text-sm text-gray-500">
                Administration / {activeTab}
              </p>

              <h1 className="mt-1 text-2xl font-bold">
                {activeTab}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">
                  School Administrator
                </p>
                <p className="text-xs text-gray-500">
                  Demo account
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8dfc9] font-bold text-[#263629]">
                SA
              </div>
            </div>
          </header>

          <div className="p-5 md:p-10">

            {/* MOBILE NAVIGATION */}
            <div className="mb-6 flex gap-2 overflow-x-auto md:hidden">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm ${
                    activeTab === item
                      ? "bg-[#18291e] text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

         
{/* OVERVIEW */}
{activeTab === "Overview" && (
  <div className="space-y-8">
    {/* Welcome */}
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a47c36]">
          School Administration
        </p>
        <h2 className="mt-2 text-2xl font-bold">
          Welcome back, Administrator
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Here's what's happening at St Georges Academy.
        </p>
      </div>

      <div className="rounded-lg border border-[#c9a45c]/30 bg-[#faf8f2] px-5 py-3">
        <p className="text-xs text-gray-500">Dashboard status</p>
        <p className="mt-1 text-sm font-bold text-[#263629]">
          ● Demo system active
        </p>
      </div>
    </div>

    {/* STATISTICS */}
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {[
        {
          label: "Total Applications",
          value: applications.length,
          symbol: "▤",
          note: "All submitted records",
          color: "bg-[#eaf0eb] text-[#263629]",
        },
        {
          label: "Pending Applications",
          value: pending,
          symbol: "◷",
          note: "Awaiting review",
          color: "bg-amber-50 text-amber-700",
        },
        {
          label: "Approved Applications",
          value: approved,
          symbol: "✓",
          note: "Successfully approved",
          color: "bg-green-50 text-green-700",
        },
        {
          label: "Rejected Applications",
          value: rejected,
          symbol: "×",
          note: "Rejected records",
          color: "bg-red-50 text-red-700",
        },
      ].map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              {card.label}
            </p>
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold ${card.color}`}
            >
              {card.symbol}
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold text-[#18251d]">
            {card.value}
          </p>

          <p className="mt-2 text-xs text-gray-400">
            {card.note}
          </p>
        </div>
      ))}
    </div>

    {/* APPLICATION ANALYTICS */}
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">
        <div className="mb-7">
          <h3 className="text-lg font-bold">
            Application Overview
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Breakdown of application statuses.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              label: "Approved",
              value: approved,
              color: "bg-green-600",
            },
            {
              label: "Pending",
              value: pending,
              color: "bg-amber-500",
            },
            {
              label: "Rejected",
              value: rejected,
              color: "bg-red-500",
            },
          ].map((item) => {
            const percentage =
              applications.length > 0
                ? (item.value / applications.length) * 100
                : 0;

            return (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-[#18251d]">
                    {item.value} ({Math.round(percentage)}%)
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
          <div>
            <p className="text-xs text-gray-500">
              Total announcements
            </p>
            <p className="mt-2 text-2xl font-bold">
              {announcements.length}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Upcoming school events
            </p>
            <p className="mt-2 text-2xl font-bold">
              {events.length}
            </p>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold">Quick Actions</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage your school activities.
        </p>

        <div className="mt-6 space-y-3">
          {[
            {
              label: "Review Applications",
              tab: "Admissions",
              icon: "▤",
            },
            {
              label: "Publish Announcement",
              tab: "Announcements",
              icon: "▣",
            },
            {
              label: "Manage School Events",
              tab: "Events",
              icon: "▧",
            },
          ].map((action) => (
            <button
              key={action.tab}
              onClick={() => setActiveTab(action.tab)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 text-left transition hover:border-[#c9a45c] hover:bg-[#faf8f2]"
            >
              <span className="flex items-center gap-3 text-sm font-semibold">
                <span className="text-xl text-[#a47c36]">
                  {action.icon}
                </span>
                {action.label}
              </span>
              <span className="text-gray-400">→</span>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-lg bg-[#14231a] p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-[#d4b36e]">
            St Georges Academy
          </p>
          <p className="mt-3 text-sm leading-6 text-gray-300">
            Inspiring minds. Building futures.
          </p>
        </div>
      </div>
    </div>

    {/* RECENT APPLICATIONS */}
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">
            Recent Applications
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Latest student applications received.
          </p>
        </div>

        <button
          onClick={() => setActiveTab("Admissions")}
          className="text-sm font-bold text-[#9b783c] hover:underline"
        >
          View all applications →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-4">Applicant</th>
              <th className="p-4">Reference</th>
              <th className="p-4">Class</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {applications.slice(0, 5).map((application) => (
              <tr
                key={application.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-4 font-semibold">
                  {application.firstName} {application.lastName}
                </td>

                <td className="p-4 text-gray-500">
                  {application.id}
                </td>

                <td className="p-4">
                  {application.classApplyingFor}
                </td>

                <td className="p-4 text-gray-500">
                  {application.submittedAt}
                </td>

                <td className="p-4">
                  <Status status={application.status} />
                </td>
              </tr>
            ))}

            {applications.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-gray-500"
                >
                  No applications have been received yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}

           
{/* ADMISSIONS */}
{activeTab === "Admissions" && (
  <div className="space-y-6">
    {/* PAGE INTRODUCTION */}
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a47c36]">
          Student Management
        </p>
        <h2 className="mt-2 text-2xl font-bold">
          Admission Applications
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Review, manage and update student applications.
        </p>
      </div>

      <div className="rounded-lg border border-[#c9a45c]/30 bg-[#faf8f2] px-5 py-3">
        <p className="text-xs text-gray-500">Total applications</p>
        <p className="mt-1 text-2xl font-bold text-[#18251d]">
          {applications.length}
        </p>
      </div>
    </div>

    {/* APPLICATION SUMMARY */}
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">Pending review</p>
        <p className="mt-2 text-2xl font-bold text-amber-600">
          {pending}
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">Approved</p>
        <p className="mt-2 text-2xl font-bold text-green-700">
          {approved}
        </p>
      </div>

      <div className="col-span-2 rounded-xl border border-gray-200 bg-white p-5 sm:col-span-1">
        <p className="text-sm text-gray-500">Rejected</p>
        <p className="mt-2 text-2xl font-bold text-red-600">
          {rejected}
        </p>
      </div>
    </div>

    {/* APPLICATION RECORDS */}
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">Student Records</h3>
          <p className="mt-1 text-sm text-gray-500">
            Search and filter submitted applications.
          </p>
        </div>

        <span className="rounded-full bg-[#f5f1e7] px-4 py-2 text-xs font-semibold text-[#8c6c34]">
          {filteredApplications.length} record(s) found
        </span>
      </div>

      {/* SEARCH AND FILTER */}
      <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_190px]">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            ⌕
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, class or reference..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#c9a45c] focus:bg-white"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#c9a45c]"
        >
          <option value="All">All applications</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[750px] text-left text-sm">
          <thead className="bg-[#f5f6f3] text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th className="rounded-l-lg p-4">Reference</th>
              <th className="p-4">Applicant</th>
              <th className="p-4">Class</th>
              <th className="p-4">Date submitted</th>
              <th className="p-4">Status</th>
              <th className="rounded-r-lg p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplications.map((application) => (
              <tr
                key={application.id}
                className="border-b border-gray-100 transition hover:bg-[#fafaf7]"
              >
                <td className="p-4">
                  <span className="font-semibold text-[#8c6c34]">
                    {application.id}
                  </span>
                </td>

                <td className="p-4">
                  <p className="font-semibold text-[#18251d]">
                    {application.firstName} {application.lastName}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {application.email}
                  </p>
                </td>

                <td className="p-4 text-gray-600">
                  {application.classApplyingFor}
                </td>

                <td className="p-4 text-gray-500">
                  {application.submittedAt}
                </td>

                <td className="p-4">
                  <Status status={application.status} />
                </td>

                <td className="p-4">
                  <button
                    onClick={() => setSelected(application)}
                    className="rounded-md border border-[#c9a45c]/50 px-3 py-2 text-xs font-bold text-[#8c6c34] transition hover:bg-[#c9a45c] hover:text-[#18251d]"
                  >
                    View Details →
                  </button>
                </td>
              </tr>
            ))}

            {filteredApplications.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center">
                  <p className="font-semibold text-gray-600">
                    No applications found
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    Try changing your search or status filter.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE APPLICATION CARDS */}
      <div className="space-y-4 md:hidden">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="break-all text-xs font-bold text-[#9b783c]">
                  {application.id}
                </p>
                <h3 className="mt-2 font-bold text-[#18251d]">
                  {application.firstName} {application.lastName}
                </h3>
                <p className="mt-1 break-all text-xs text-gray-500">
                  {application.email}
                </p>
              </div>

              <Status status={application.status} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-400">Class</p>
                <p className="mt-1 text-sm font-semibold">
                  {application.classApplyingFor}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Submitted</p>
                <p className="mt-1 text-sm font-semibold">
                  {application.submittedAt}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelected(application)}
              className="mt-4 w-full rounded-lg bg-[#18251d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2b4433]"
            >
              View Application Details →
            </button>
          </div>
        ))}

        {filteredApplications.length === 0 && (
          <div className="rounded-lg border border-gray-200 p-8 text-center">
            <p className="font-semibold text-gray-600">
              No applications found
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Try another search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
)}


            {/* ANNOUNCEMENTS */}
            {activeTab === "Announcements" && (
              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-5 text-lg font-bold">
                    Create announcement
                  </h2>

                  <label className="mb-2 block text-sm font-medium">
                    Title
                  </label>

                  <input
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    placeholder="Announcement title"
                    className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
                  />

                  <label className="mb-2 block text-sm font-medium">
                    Message
                  </label>

                  <textarea
                    value={announcementMessage}
                    onChange={(e) => setAnnouncementMessage(e.target.value)}
                    placeholder="Write your announcement..."
                    rows={5}
                    className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
                  />

                  <button
                    onClick={addAnnouncement}
                    className="rounded-lg bg-[#18291e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#263d2c]"
                  >
                    Publish announcement
                  </button>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-5 text-lg font-bold">
                    Published announcements
                  </h2>

                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold">
                              {announcement.title}
                            </h3>

                            <p className="mt-1 text-xs text-gray-400">
                              {announcement.date}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              if (window.confirm("Delete this announcement?")) {
                                saveAnnouncements(
                                  announcements.filter(
                                    (a) => a.id !== announcement.id
                                  )
                                );
                              }
                            }}
                            className="text-xs font-semibold text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>

                        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                          {announcement.message}
                        </p>
                      </div>
                    ))}

                    {announcements.length === 0 && (
                      <p className="text-sm text-gray-500">
                        No announcements yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* EVENTS */}
            {activeTab === "Events" && (
              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-5 text-lg font-bold">
                    Add a School Event
                  </h2>

                  <label className="mb-2 block text-sm font-medium">
                    Event title
                  </label>

                  <input
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="e.g. Parents' Meeting"
                    className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
                  />

                  <label className="mb-2 block text-sm font-medium">
                    Event date
                  </label>

                  <input
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="e.g. 20 November 2026"
                    className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
                  />

                  <label className="mb-2 block text-sm font-medium">
                    Event category
                  </label>

                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="mb-5 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm"
                  >
                    <option>School Event</option>
                    <option>School Meeting</option>
                    <option>Sports</option>
                    <option>Academic</option>
                    <option>Holiday</option>
                    <option>Other</option>
                  </select>

                  <button
                    onClick={addEvent}
                    className="rounded-lg bg-[#18291e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#263d2c]"
                  >
                    Add Event
                  </button>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-5 text-lg font-bold">
                    Manage School Events
                  </h2>

                  <div className="space-y-4">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold">
                              {event.title}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                              {event.type} · {event.date}
                            </p>
                          </div>

                          <div className="flex gap-3 text-sm">
                            <button
                              onClick={() => editEvent(event)}
                              className="font-semibold text-[#9b783c] hover:underline"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm("Delete this event?")) {
                                  saveEvents(
                                    events.filter(
                                      (item) => item.id !== event.id
                                    )
                                  );
                                }
                              }}
                              className="font-semibold text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {events.length === 0 && (
                      <p className="text-sm text-gray-500">
                        No events have been added yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* APPLICATION DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Application details
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {selected.firstName} {selected.lastName}
                </h2>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-full bg-gray-100 px-3 py-2 text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="mb-3 border-b pb-2 text-sm font-bold uppercase tracking-wide text-[#9b783c]">
                  Student information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Detail label="Reference" value={selected.id} />
                  <Detail
                    label="Full name"
                    value={`${selected.firstName} ${selected.lastName}`}
                  />
                  <Detail label="Date of birth" value={selected.dob} />
                  <Detail label="Gender" value={selected.gender} />
                  <Detail
                    label="Class applying for"
                    value={selected.classApplyingFor}
                  />
                  <Detail
                    label="Previous school"
                    value={selected.previousSchool}
                  />
                </div>
              </section>

              <section>
                <h3 className="mb-3 border-b pb-2 text-sm font-bold uppercase tracking-wide text-[#9b783c]">
                  Parent / Guardian information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Detail
                    label="Parent / Guardian"
                    value={selected.parentName}
                  />
                  <Detail
                    label="Relationship"
                    value={selected.relationship}
                  />
                  <Detail label="Phone number" value={selected.phone} />
                  <Detail label="Email" value={selected.email} />

                  <div className="sm:col-span-2">
                    <Detail
                      label="Residential address"
                      value={selected.address}
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 border-b pb-2 text-sm font-bold uppercase tracking-wide text-[#9b783c]">
                  Additional information
                </h3>

                <Detail
                  label="Parent's message / enquiries"
                  value={selected.message}
                />

                <div className="mt-4">
                  <Detail
                    label="Date submitted"
                    value={selected.submittedAt}
                  />
                </div>
              </section>
            </div>

            <div className="mt-6 border-t pt-5">
              <p className="mb-3 text-sm font-semibold">
                Update application status
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateStatus(selected.id, "Approved")}
                  className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(selected.id, "Rejected")}
                  className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white"
                >
                  Reject
                </button>

                <button
                  onClick={() => updateStatus(selected.id, "Pending")}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  Set pending
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// STATUS BADGE
function Status({ status }: { status: Application["status"] }) {
  const styles = {
    Pending: "bg-amber-100 text-amber-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

// DETAILS FIELD
function Detail({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 break-words text-sm font-medium">
        {value?.trim() || "Not provided"}
      </p>
    </div>
  );
}
