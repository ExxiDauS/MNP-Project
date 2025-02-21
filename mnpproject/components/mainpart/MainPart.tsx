import CardContainer from "../mainpart/CardContainer";
import livehousesData from "@/public/data/livehouses.json";
const livehouses = livehousesData.livehouses;

import React from "react";

const MainPart = () => {
  return (
    <>
      {/* Topic */}
      <div className="my-6 flex justify-center ">
        <h3 className="text-custom-text-primary font-bold text-3xl">
          
        </h3>
      </div>

      {/* Popular Livehouse showcase */}
      <section className="pb-4 mt-6">
        <CardContainer data={livehouses} cardSize={220} />
      </section>
    </>
  );
};

export default MainPart;
