// import { Card } from '@/components/ui/card'
import React from "react";
import PopularLivehouses from "@/components/landing/hero/PopularLivehouses";
import MainExPart from "@/components/Explorepart/MainExPart";

const page = () => {
  return (
    <>
      <div className="pt-20">
        <PopularLivehouses></PopularLivehouses>
      </div>
      <MainExPart></MainExPart>
    </>
  );
};

export default page;
