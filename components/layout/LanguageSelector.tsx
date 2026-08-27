"use client";

import * as React from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params?.locale as string) || "en";
  const { content } = useSiteContent();

  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const languages = content.languages && content.languages.length > 0
    ? content.languages.filter((l) => l.enabled)
    : [
        { code: "en", name: "English", nativeName: "English", dir: "ltr", enabled: true, order: 1 },
        { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr", enabled: true, order: 2 },
        { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", enabled: true, order: 3 },
        { code: "fr", name: "French", nativeName: "Français", dir: "ltr", enabled: true, order: 4 },
        { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr", enabled: true, order: 5 },
      ];

  const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    setIsOpen(false);
    if (langCode === currentLocale) return;

    // Replace locale in path
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0 && languages.some((l) => l.code === pathSegments[0])) {
      pathSegments[0] = langCode;
    } else {
      pathSegments.unshift(langCode);
    }
    const newPath = "/" + pathSegments.join("/");
    router.push(newPath);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#1E1915] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] hover:border-[#f15e1c] transition-colors cursor-pointer shadow-xs"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#f15e1c]" />
        <span className="uppercase font-bold font-mono">{currentLang.code}</span>
        <ChevronDown className={cn("w-3 h-3 text-[#7A6A5F] transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#FFFDF9] dark:bg-[#1C1814] border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl z-50 p-1.5 space-y-1 animate-in fade-in slide-in-from-top-2">
          {languages.map((lang) => {
            const isSelected = lang.code === currentLocale;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageSelect(lang.code)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer",
                  isSelected
                    ? "bg-[#FCE3D3] dark:bg-[#2A211B] text-[#f15e1c] font-bold"
                    : "text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#FBF3EA] dark:hover:bg-[#261F1A]"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[11px] uppercase w-5 text-[#f15e1c]">
                    {lang.code}
                  </span>
                  <span>{lang.nativeName}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#f15e1c]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
