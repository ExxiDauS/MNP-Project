import Calendar from "@/components/Calendarpart/Calendar";
import BackButton from "@/components/buttons/BackButton";

export default function Home() {
  return (
    <div className="mt-20 flex justify-center relative">
      <div className="relative">
        <div className="absolute -top-3 left-0 mt-2 mr-2 z-10">
          <BackButton href="/manager-landing" />
        </div>

        <Calendar />
      </div>
    </div>
  );
}
