import { EmptyState, PageHeader } from "@/components/page-header";
import { getPage } from "@/lib/pages";

const metrics = ["Assets under management", "Clients", "Accounts", "Positions"];

export default function HomePage() {
  return (
    <>
      <PageHeader page={getPage("/")} />

      <dl className="metric-grid">
        {metrics.map((label) => (
          <div className="panel metric" key={label}>
            <dt>{label}</dt>
            <dd>—</dd>
          </div>
        ))}
      </dl>

      <EmptyState title="No portfolio data yet">
        Firm metrics and recent activity will appear here once client accounts are connected.
      </EmptyState>
    </>
  );
}
