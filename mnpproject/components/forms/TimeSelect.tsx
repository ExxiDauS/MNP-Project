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
        <label className="text-sm font-medium block mb-2 text-custom-text-primary">Start Time</label>
        <Select onValueChange={onStartTimeChange} value={startTime}>
          <SelectTrigger>
            <SelectValue placeholder="Select start time" />
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
        <label className="text-sm font-medium block mb-2 text-custom-text-primary">End Time</label>
        <Select onValueChange={onEndTimeChange} value={endTime}>
          <SelectTrigger>
            <SelectValue placeholder="Select end time" />
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