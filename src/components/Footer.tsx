type FooterProps = {
  left: string;
  right: string;
};

export function Footer({ left, right }: FooterProps) {
  return (
    <footer className="px-5 pb-7 pt-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-burgundy/25 pt-5 text-xs uppercase tracking-[0.22em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{left}</p>
        <p>{right}</p>
      </div>
    </footer>
  );
}
