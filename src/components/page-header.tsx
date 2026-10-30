import { getPage, type AppPage } from "@/lib/pages";

export function PageHeader({ page }: { page: AppPage }) {
  return (
    <header className="page-header">
      <h1>{page.label}</h1>
      <p>{page.description}</p>
    </header>
  );
}

export function EmptyState({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="panel empty-state">
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

export function PlaceholderPage({ href }: { href: string }) {
  const page = getPage(href);

  return (
    <>
      <PageHeader page={page} />
      <EmptyState title="No data yet">This page is coming soon.</EmptyState>
    </>
  );
}
