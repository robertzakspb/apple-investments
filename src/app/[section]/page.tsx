import { notFound } from "next/navigation";

const pages: Record<string, { title: string; description: string }> = {
  accounts: { title: "Accounts", description: "View and manage your investment accounts." },
  positions: { title: "Positions", description: "See the investments held across your accounts." },
  orders: { title: "Orders", description: "Review your investment orders." },
  securities: { title: "Securities", description: "Explore the securities in your portfolio." },
};

export function generateStaticParams() {
  return Object.keys(pages).map((section) => ({ section }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const page = pages[section];

  if (!page) notFound();

  return (
    <section className="page-heading" aria-labelledby="page-title">
      <p className="eyebrow">YOUR PORTFOLIO</p>
      <h1 id="page-title">{page.title}</h1>
      <p className="page-description">{page.description}</p>
    </section>
  );
}
