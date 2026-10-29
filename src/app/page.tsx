export default function HomePage() {
  return <PageHeading eyebrow="YOUR PORTFOLIO" title="Home" />;
}

function PageHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <section className="page-heading" aria-labelledby="page-title">
      <p className="eyebrow">{eyebrow}</p>
      <h1 id="page-title">{title}</h1>
      <p className="page-description">Your investment overview, all in one place.</p>
    </section>
  );
}
