import clsx from "clsx";

export interface TabOption<T extends string> {
  id: T;
  label: string;
}

interface TabsProps<T extends string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onSelect: (tab: T) => void;
}

/** Generic underline tab strip — Section 45 component list ("one screen, one job" navigation within a module). */
export function Tabs<T extends string>({ tabs, activeTab, onSelect }: TabsProps<T>) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={clsx(
            "shrink-0 border-b-2 px-3 py-2.5 text-body font-medium transition-colors",
            activeTab === tab.id
              ? "border-primary text-primary"
              : "border-transparent text-text-secondary hover:text-text-primary"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
