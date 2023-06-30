export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full">
      <div className="flexCenter h-full">{children}</div>
    </section>
  );
}
