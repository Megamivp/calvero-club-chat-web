function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-10 px-4 py-10">
      {children}
    </div>
  );
}

export { MainLayout };
