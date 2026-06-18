import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, User } from 'lucide-react';

const DAYS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i - 2); // Start 2 days ago
  return d;
});

const ROOMS = [
  { id: '101', type: 'Standard King', floor: '1' },
  { id: '102', type: 'Standard King', floor: '1' },
  { id: '103', type: 'Standard Twin', floor: '1' },
  { id: '201', type: 'Deluxe Suite', floor: '2' },
  { id: '202', type: 'Deluxe Suite', floor: '2' },
  { id: '301', type: 'Ocean View', floor: '3' },
  { id: '401', type: 'Presidential', floor: '4' },
];

const BLOCKS = [
  { room: '101', start: 1, span: 3, guest: 'Jackson Miller', status: 'Checked-In' },
  { room: '102', start: 0, span: 2, guest: 'Olivia Smith', status: 'Completed' },
  { room: '102', start: 3, span: 4, guest: 'Emma Watson', status: 'Confirmed' },
  { room: '201', start: 2, span: 5, guest: 'Eleanor Vance', status: 'Confirmed' },
  { room: '301', start: 4, span: 3, guest: 'David Patel', status: 'Pending' },
  { room: '401', start: 5, span: 5, guest: 'Sarah Connor', status: 'Confirmed' },
];

export default function ReservationCalendar() {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Checked-In': return 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20';
      case 'Confirmed': return 'bg-blue-500 text-white border-blue-600 shadow-blue-500/20';
      case 'Pending': return 'bg-orange-500 text-white border-orange-600 shadow-orange-500/20';
      case 'Completed': return 'bg-slate-400 text-white border-slate-500';
      default: return 'bg-gray-500 text-white border-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-display font-semibold">Reservation Calendar</h2>
          <p className="text-sm text-muted-foreground">Visual timeline of room bookings and availability.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-background border border-border p-1.5 rounded-xl shadow-sm">
          <button className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-colors"><ChevronLeft className="h-5 w-5" /></button>
          <span className="text-sm font-semibold px-4 flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-op-purple" />
            October 2023
          </span>
          <button className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-colors"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar pb-2">
          <div className="min-w-[1000px]">
            {/* Header */}
            <div className="flex border-b border-border bg-muted/30">
              <div className="w-48 shrink-0 p-4 font-semibold text-sm border-r border-border text-foreground/80 flex items-center">
                Room Number
              </div>
              <div className="flex-1 flex">
                {DAYS.map((d, i) => {
                  const isToday = i === 2;
                  return (
                    <div key={i} className={`flex-1 min-w-[80px] p-2 text-center border-r border-border/50 ${isToday ? 'bg-op-purple/5' : ''}`}>
                      <div className={`text-xs font-semibold uppercase mb-1 ${isToday ? 'text-op-purple' : 'text-muted-foreground'}`}>
                        {d.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className={`text-lg font-display ${isToday ? 'text-op-purple font-bold' : 'text-foreground'}`}>
                        {d.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grid */}
            <div className="relative">
              {ROOMS.map((room) => (
                <div key={room.id} className="flex border-b border-border/50 hover:bg-muted/10 transition-colors group">
                  <div className="w-48 shrink-0 p-4 border-r border-border flex flex-col justify-center">
                    <span className="font-display font-semibold text-foreground text-lg">Room {room.id}</span>
                    <span className="text-xs text-muted-foreground">{room.type}</span>
                  </div>
                  
                  <div className="flex-1 relative flex">
                    {DAYS.map((_, i) => (
                      <div key={i} className={`flex-1 min-w-[80px] border-r border-border/20 ${i === 2 ? 'bg-op-purple/5' : ''}`}></div>
                    ))}

                    {/* Booking Blocks for this room */}
                    {BLOCKS.filter(b => b.room === room.id).map((block, idx) => (
                      <div 
                        key={idx}
                        className={`absolute top-2 bottom-2 rounded-lg border shadow-sm px-3 py-1.5 flex flex-col justify-center overflow-hidden cursor-pointer hover:brightness-110 transition-all ${getStatusColor(block.status)}`}
                        style={{ 
                          left: `${(block.start / DAYS.length) * 100}%`,
                          width: `calc(${(block.span / DAYS.length) * 100}% - 4px)`
                        }}
                      >
                        <span className="text-xs font-semibold truncate flex items-center gap-1.5">
                          <User className="h-3 w-3 shrink-0" /> {block.guest}
                        </span>
                        <span className="text-[10px] opacity-80 mt-0.5 uppercase tracking-wider">{block.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
