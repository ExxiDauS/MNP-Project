// import { Card } from '@/components/ui/card'
import React from "react";
import PopularLivehouses from "@/components/cards/PopularLivehouses";
import MainPart from "@/components/mainpart/MainPart";

const page = () => {
  return (
    <>
      <div className="pt-20">
        <PopularLivehouses></PopularLivehouses>
      </div>

      <MainPart></MainPart>
    </>
  );
};

export default page;
