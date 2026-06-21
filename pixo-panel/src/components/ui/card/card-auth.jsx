/**
 * @property {string} title
 * @property {string} sub
 * @property {React.ReactNode} children
 */

function CardAuth({ title, sub, children }) {
  return (
    <div className="border-border md:bg-card text-card-foreground mx-auto mt-10 w-full max-w-lg space-y-10 rounded-lg p-3 md:border md:px-16 md:py-12">
      <header className="grid gap-3">
        <h1 className="font-weight-bold text-3xl">{title}</h1>
        <p className="text-muted-foreground">{sub}</p>
      </header>
      {children}
    </div>
  );
}
export default CardAuth;
