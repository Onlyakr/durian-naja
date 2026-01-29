import { Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const creators = [
    { name: "Titikorn Keekhor", ig: "https://www.instagram.com/b4nkrub_/" },
    { name: "Thanyawut Leewangsri", ig: "https://www.instagram.com/jxegyy/" },
    { name: "Ploychompu loedpananon", ig: "https://www.instagram.com/_47px/" },
    { name: "Akarawin Datchanee", ig: "https://www.instagram.com/onlyakr_/" },
    { name: "เต็ง", ig: "https://instagram.com/..." },
  ];

  return (
    <footer className="bg-muted/30 border-t mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h3 className="text-base font-bold text-foreground">
              DURIAN PLATFORM
            </h3>
            <p className="text-xs text-muted-foreground">
              แหล่งรวบรวมข้อมูลทุเรียนไทย เพื่อคนรักทุเรียน
            </p>
            <p className="text-[10px] text-muted-foreground mt-2">
              © 2026 Project for Systemplatform
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-base font-bold text-foreground">
              คณะผู้จัดทำ (Creators)
            </span>

            <div className="flex flex-col items-center md:items-end gap-0.5">
              {creators.map((person, index) => (
                <Link
                  key={index}
                  href={person.ig}
                  target="_blank"
                  className="text-xs text-muted-foreground hover:text-yellow-600 hover:underline transition-all flex items-center gap-1.5"
                >
                  {person.name}
                  <Instagram className="w-3 h-3 opacity-70" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
