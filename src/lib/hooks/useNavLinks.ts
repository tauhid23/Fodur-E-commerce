import { useEffect, useState } from "react";
import { NavItem } from "@/types/nav";

// ─── Dummy data (replace this fetch with your real API endpoint) ──────
async function fetchNavLinks(): Promise<NavItem[]> {
  // TODO: replace with → const res = await fetch("/api/nav"); return res.json();
  return [
    { label: "Shop",   href: "/collections" },
    { label: "Men",    href: "/collections/men" },
    { label: "Women",  href: "/collections/women" },
    { label: "Kids",   href: "/collections/kids" },
    { label: "New",    href: "/collections/new",  badge: "New" },
    { label: "Sale",   href: "/collections/sale", highlight: true },
  ];
}

type State = {
  links: NavItem[];
  loading: boolean;
  error: string | null;
};

export function useNavLinks() {
  const [state, setState] = useState<State>({ links: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    fetchNavLinks()
      .then((links) => {
        if (!cancelled) setState({ links, loading: false, error: null });
      })
      .catch(() => {
        if (!cancelled) setState({ links: [], loading: false, error: "Failed to load nav" });
      });

    return () => { cancelled = true; };
  }, []);

  return state;
}