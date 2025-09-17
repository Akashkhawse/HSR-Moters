 import React, { useState } from "react";

// HSR Motors - Single-file prototype React component
// Tailwind CSS utility classes are used for styling (assumes Tailwind is available in the project).
// This component is a visual mockup only (no real backend). It demonstrates the 4 main screens:
// S1 - Lead Listings
// S2 - Lead Details
// S3 - Lead Management
// S4 - Dashboard

export default function HSRMotorsPrototype() {
  const [view, setView] = useState("leads");
  const [selectedLead, setSelectedLead] = useState(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const leads = [
    {
      id: "L-1001",
      name: "Aman Singh",
      phone: "+91 98765 43210",
      email: "aman.s@example.com",
      source: "Google",
      status: "New",
      assignedTo: "Unassigned",
      budget: "8-10 Lakh",
      createdAt: "2025-09-10",
      notes: [
        { who: "System", text: "Lead captured from Google Ads form." },
      ],
    },
    {
      id: "L-1002",
      name: "Priya Sharma",
      phone: "+91 91234 56780",
      email: "priya.s@example.com",
      source: "Facebook",
      status: "Contacted",
      assignedTo: "Rahul (Sales)",
      budget: "10-12 Lakh",
      createdAt: "2025-09-11",
      notes: [
        { who: "Rahul", text: "Called — interested in test drive next week." },
      ],
    },
    {
      id: "L-1003",
      name: "Karan Verma",
      phone: "+91 90123 45678",
      email: "karan.v@example.com",
      source: "Walk-in",
      status: "Interested",
      assignedTo: "Amit (Sales)",
      budget: "15 Lakh",
      createdAt: "2025-08-29",
      notes: [
        { who: "Amit", text: "Wants finance options details." },
      ],
    },
  ];

  const filtered = leads.filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.source.toLowerCase().includes(q)
    );
  });

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "New").length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    interested: leads.filter((l) => l.status === "Interested").length,
    conversionRate: Math.round((leads.filter((l) => l.status === "Interested").length / leads.length) * 100) || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-sky-600 to-green-500 flex items-center justify-center text-white font-bold">HSR</div>
          <div>
            <div className="font-semibold">HSR Motors</div>
            <div className="text-xs text-slate-500">Dealer CRM • Desktop web app</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600">Welcome, Business Manager</div>
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">BM</div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 p-4 border-r bg-white">
          <nav className="flex flex-col gap-2">
            <button onClick={() => setView("leads")} className={`text-left p-2 rounded ${view==='leads' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
              • Lead listings
            </button>
            <button onClick={() => setView("dashboard")} className={`text-left p-2 rounded ${view==='dashboard' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
              • Dashboard
            </button>
            <button onClick={() => setView("management")} className={`text-left p-2 rounded ${view==='management' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
              • Lead management
            </button>
            <div className="mt-4 text-xs text-slate-500">Automations</div>
            <div className="mt-2 text-sm">
              <div className="flex items-center justify-between">
                <div>Auto-assign (round-robin)</div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>Follow-up reminders</div>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {view === "leads" && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Lead listings</h2>
                <div className="flex gap-2">
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, phone, email" className="p-2 border rounded w-72" />
                  <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)} className="p-2 border rounded">
                    <option value="all">All statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                  </select>
                  <button onClick={()=>setView('management')} className="px-4 py-2 bg-sky-600 text-white rounded">+ New Lead</button>
                </div>
              </div>

              <div className="bg-white rounded shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="p-3 text-left">Lead</th>
                      <th className="p-3 text-left">Source</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Assigned</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((l) => (
                      <tr key={l.id} className="border-t">
                        <td className="p-3">
                          <div className="font-medium">{l.name}</div>
                          <div className="text-xs text-slate-500">{l.phone} • {l.email}</div>
                        </td>
                        <td className="p-3">{l.source}</td>
                        <td className="p-3">{l.status}</td>
                        <td className="p-3">{l.assignedTo}</td>
                        <td className="p-3 text-right">
                          <button onClick={() => { setSelectedLead(l); setView('details'); }} className="px-3 py-1 border rounded mr-2">View</button>
                          <button onClick={() => alert('Pretend: mark as contacted')} className="px-3 py-1 bg-emerald-500 text-white rounded">Mark Contacted</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {view === "details" && selectedLead && (
            <section>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Lead details — {selectedLead.name}</h2>
                  <div className="text-sm text-slate-500">{selectedLead.phone} • {selectedLead.email} • Source: {selectedLead.source}</div>
                </div>
                <div>
                  <button onClick={() => setView('leads')} className="px-3 py-1 border rounded">Back to list</button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white p-4 rounded shadow-sm">
                  <h3 className="font-medium mb-2">Profile</h3>
                  <p><strong>Lead ID:</strong> {selectedLead.id}</p>
                  <p><strong>Budget:</strong> {selectedLead.budget}</p>
                  <p className="mt-4"><strong>Notes / Timeline</strong></p>
                  <div className="mt-2 space-y-2">
                    {selectedLead.notes.map((n, idx) => (
                      <div key={idx} className="p-2 bg-slate-50 rounded">
                        <div className="text-xs text-slate-500">{n.who}</div>
                        <div className="text-sm">{n.text}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <textarea placeholder="Add a note..." className="w-full p-2 border rounded" rows={3}></textarea>
                    <div className="mt-2 flex gap-2">
                      <button className="px-3 py-1 bg-sky-600 text-white rounded">Save note</button>
                      <button className="px-3 py-1 border rounded">Log call</button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-medium mb-2">Actions</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs">Status</label>
                      <select className="w-full p-2 border rounded mt-1">
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Interested</option>
                        <option>Lost</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs">Assign to</label>
                      <select className="w-full p-2 border rounded mt-1">
                        <option>Unassigned</option>
                        <option>Rahul (Sales)</option>
                        <option>Amit (Sales)</option>
                      </select>
                    </div>
                    <button className="w-full px-3 py-2 bg-emerald-600 text-white rounded">Save</button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {view === "management" && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Lead management</h2>
              <div className="bg-white p-4 rounded shadow-sm">
                <form onSubmit={(e)=>{ e.preventDefault(); alert('Pretend: lead saved'); }}>
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Full name" className="p-2 border rounded" />
                    <input placeholder="Phone" className="p-2 border rounded" />
                    <input placeholder="Email" className="p-2 border rounded" />
                    <input placeholder="Source (Google, Facebook, Walk-in)" className="p-2 border rounded" />
                    <input placeholder="Budget" className="p-2 border rounded" />
                    <select className="p-2 border rounded">
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Interested</option>
                    </select>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded">Create lead</button>
                    <label className="px-4 py-2 border rounded cursor-pointer">
                      Bulk import (CSV)
                      <input type="file" accept=".csv" className="hidden" />
                    </label>
                  </div>
                </form>
              </div>

              <div className="mt-4 text-sm text-slate-500">
                Tips: CSV should include columns: <code>id,name,phone,email,source,status,budget,createdAt</code>
              </div>
            </section>
          )}

          {view === "dashboard" && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded shadow-sm">
                  <div className="text-xs text-slate-500">Total leads</div>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <div className="text-xs text-slate-500">New</div>
                  <div className="text-2xl font-bold">{stats.new}</div>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <div className="text-xs text-slate-500">Contacted</div>
                  <div className="text-2xl font-bold">{stats.contacted}</div>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <div className="text-xs text-slate-500">Conversion</div>
                  <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-medium mb-2">Leads by source</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><div>Google</div><div>1</div></div>
                    <div className="flex justify-between text-sm"><div>Facebook</div><div>1</div></div>
                    <div className="flex justify-between text-sm"><div>Walk-in</div><div>1</div></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-medium mb-2">Activity</h3>
                  <div className="text-sm text-slate-500">Recent actions: Rahul logged a call with Priya. Amit updated Karan's status to Interested.</div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      <footer className="p-4 text-xs text-slate-500 text-center">Prototype • HSR Motors CRM mockup • Desktop-first</footer>
    </div>
  );
}
