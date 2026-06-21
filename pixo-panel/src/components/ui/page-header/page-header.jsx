/**
 *
 * @property {string} pageTitle => document title for react router
 * @property {string} title
 * @property {string} sub
 */

function PageHeader({ pageTitle, title, sub }) {
  return (
    <div className="mb-10">
      <title>{pageTitle}</title>
      <header className="container mx-auto grid w-full gap-4 px-4 py-8">
        <h1 className="font-weight-bold text-2xl md:text-4xl">{title}</h1>
        <p className="text-muted-foreground">{sub}</p>
      </header>
      <div className="border-border w-full border-b"></div>
    </div>
  );
}
export default PageHeader;
