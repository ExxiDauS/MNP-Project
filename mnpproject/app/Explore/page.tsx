// import { Card } from '@/components/ui/card'
import React from "react";
import PopularLivehouses from "@/components/landing/hero/PopularLivehouses";
import MainExPart from "@/components/Explorepart/MainExPart";

const page = () => {
  return (
    <section className="mt-24">
      <PopularLivehouses></PopularLivehouses>
      <MainExPart></MainExPart>
    </section>
  );
};

export default page;
