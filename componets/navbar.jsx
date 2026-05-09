import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Home, Globe, Settings } from "lucide-react";
import { useSettings } from "@/lib/SettingsContext";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Gamepad2, label: "Games", path: "/games" },
  { icon: Globe, label: "Web", path: "/web" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

function NavLink({ icon: Icon, label, path, variant = "top" }) {
  const location = useLocation();
  const isActive = location.pathname === path;

  if (variant === "side") {
    return (
      <Link
        to={path}
        title={label}
        className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 ${
          isActive ? "bg-white/20 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon className="h-5 w-5" />
        <span className="text-[10px] font-medium">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      to={path}
      className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 overflow-hidden ${
        isActive ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300">
        {label}
      </span>
    </Link>
  );
}

export default function Navbar() {
  const { navLayout } = useSettings();

  if (navLayout === "sideLeft" || navLayout === "sideRight") {
    return (
      <aside
        className={`fixed top-0 ${navLayout === "sideLeft" ? "left-0 border-r" : "right-0 border-l"} h-full z-50 flex flex-col items-center py-6 gap-2 w-16 bg-white/5 backdrop-blur-xl border-white/10`}
      >
        <Link to="/" className="font-lemon text-base text-primary-foreground mb-4 select-none">T</Link>
        {navItems.map((item) => (
          <NavLink key={item.path} {...item} variant="side" />
        ))}
      </aside>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full px-4 pt-3">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 relative">
        <Link to="/" className="font-lemon text-xl text-primary-foreground tracking-wide font-light select-none">
          TOI
        </Link>

        {navLayout === "topCenter" ? (
          <>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink key={item.path} {...item} />
              ))}
            </div>
            <div className="flex-1" />
          </>
        ) : (
          <>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink key={item.path} {...item} />
              ))}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
