"use client";

type AdminTab = "overview" | "content" | "media" | "backups" | "settings";

type TabNavProps = {
  activeTab: AdminTab;
  onChange: (tab: AdminTab) => void;
};

const tabs: { id: AdminTab; label: string }[] = [
  { id: "overview", label: "Genel Bakis" },
  { id: "content", label: "Icerik" },
  { id: "media", label: "Medya" },
  { id: "backups", label: "Yedekler" },
  { id: "settings", label: "Ayarlar" },
];

export function TabNav({ activeTab, onChange }: TabNavProps) {
  return (
    <nav className="rounded-xl border border-slate-800 bg-slate-900/60 p-2">
      <div className="grid gap-2 md:grid-cols-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`rounded-lg px-3 py-2 text-sm transition ${
              activeTab === tab.id
                ? "bg-cyan-600 text-white"
                : "border border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export type { AdminTab };
