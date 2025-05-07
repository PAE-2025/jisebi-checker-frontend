import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all 2xl:text-base  whitespace-nowrap 
          ${
            active
              ? "bg-brand-primary-400 text-white font-medium"
              : "text-brand-primary-900 hover:bg-brand-primary-050 hover:text-brand-primary-500"
          }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
