export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-center min-h-screen
      bg-[url('/durian.png')]
      bg-cover
      bg-center
      bg-no-repeat
      bg-fixed
      px-4
      
      "
    >
      {children}
    </div>
  );
}