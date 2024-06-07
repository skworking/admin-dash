'use client'
import Link from "next/link";
import Breadcrumbs from "../../components/reuseable/bread";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname=usePathname()
  return (
    <>
      <div className="relative">
        <Breadcrumbs currentLoc={pathname} />
        <div className="flex gap-3 ">

        <div className="w-[320px]  border-2 overflow-hidden flex-wrap">
        <amp-story-player layout="fixed" width="360" height="420" >
          <Link href="https://www.trucksbuses.com/web-stories/ashok-leynands-sarathi-suraksha-policy">
            <img src="https://res.cloudinary.com/dgag5hikv/image/fetch/c_scale,w_300,f_auto,q_30/https://trucksbusesdekho.com/uploads/webstories/1433_8536803c-62a1-4054-8884-0b67c5b42cd6.webp" className="w-full h-[420px]" loading="lazy" data-amp-story-player-poster-img />
            <p>05 Jun 24</p>
            Ashok Leyland Unveils Sarathi Suraksha Policy For Truck Drivers
          </Link>
        </amp-story-player>
          
        </div>
        <div className="w-[320px]  border-2 overflow-hidden flex-wrap">
        <amp-story-player layout="fixed" width="360" height="420" >
          <Link href="https://www.trucksbuses.com/web-stories/process-and-important-details-about-driving-license">
            <img src="https://res.cloudinary.com/dgag5hikv/image/fetch/c_scale,w_300,f_auto,q_30/https://trucksbusesdekho.com/uploads/webstories/1431_6056cf3d-f7c4-4d50-bbbc-0e68e151af74.webp" className="w-full h-[420px]" loading="lazy" data-amp-story-player-poster-img />
            <p>05 Jun 24</p>
            ड्राइविंग लाइसेंस अप्लाई करने के कितने दिनों बाद आ जाता है, जानें प्रोसेस और जरूरी डिटेल
          </Link>
        </amp-story-player>

        </div>
        </div>
      </div>
    </>
  );
}
