import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimeSelectProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  timeSlots: string[];
}

const TimeSelect: React.FC<TimeSelectProps> = ({ startTime, endTime, onStartTimeChange, onEndTimeChange, timeSlots }) => {
  // Filter out the selected time from the other selector
  const getStartTimeSlots = () => timeSlots.filter(slot => slot !== endTime);
  const getEndTimeSlots = () => timeSlots.filter(slot => slot !== startTime);

  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <label className="text-sm font-medium block mb-2 text-custom-text-primary">เวลาเริ่มต้น</label>
        <Select onValueChange={onStartTimeChange} value={startTime}>
          <SelectTrigger>
            <SelectValue placeholder="เลือกเวลาเริ่มต้น" />
          </SelectTrigger>
          <SelectContent>
            {getStartTimeSlots().map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="text-sm font-medium block mb-2 text-custom-text-primary">เวลาสิ้นสุด</label>
        <Select onValueChange={onEndTimeChange} value={endTime}>
          <SelectTrigger>
            <SelectValue placeholder="เลือกเวลาสิ้นสุด" />
          </SelectTrigger>
          <SelectContent>
            {getEndTimeSlots().map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TimeSelect