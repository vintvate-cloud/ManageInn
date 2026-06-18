import React, { useState } from 'react';
import { BedDouble, Settings, Sparkles, Wind, DoorOpen, ShieldAlert } from 'lucide-react';

const FLOORS = [
  { level: 1, name: 'Ground Floor (Standard)' },
  { level: 2, name: 'Second Floor (Deluxe)' },
  { level: 3, name: 'Third Floor (Premium)' },
];

const ROOM_DATA = [
  // Floor 1
  { id: '101', status: 'Available', type: 'Standard King', floor: 1 },
  { id: '102', status: 'Occupied', type: 'Standard Twin', floor: 1, guest: 'Jackson Miller' },
  { id: '103', status: 'Cleaning', type: 'Standard King', floor: 1 },
  { id: '104', status: 'Maintenance', type: 'Standard Twin', floor: 1, issue: 'AC Repair' },
  { id: '105', status: 'Available', type: 'Standard King', floor: 1 },
  // Floor 2
  { id: '201', status: 'Reserved', type: 'Deluxe Suite', floor: 2, guest: 'Sarah Connor', checkIn: 'Today 14:00' },
  { id: '202', status: 'Occupied', type: 'Deluxe Suite', floor: 2, guest: 'Eleanor Vance' },
  { id: '203', status: 'Available', type: 'Deluxe Suite', floor: 2 },
  { id: '204', status: 'Cleaning', type: 'Deluxe Suite', floor: 2 },
  // Floor 3
  { id: '301', status: 'Occupied', type: 'Presidential', floor: 3, guest: 'David Patel' },
  { id: '302', status: 'Out of Order', type: 'Ocean View', floor: 3, issue: 'Plumbing Leak' },
  { id: '303', status: 'Available', type: 'Ocean View', floor: 3 },
];

export default function RoomTracker() {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Available': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
      case 'Occupied': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'Reserved': return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'Cleaning': return 'bg-orange-500/10 text-orange-600 border-orange-200';
      case 'Maintenance': return 'bg-slate-500/10 text-slate-600 border-slate-200';
      case 'Out of Order': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Available': return <DoorOpen className="h-5 w-5" />;
      case 'Occupied': return <BedDouble className="h-5 w-5" />;
      case 'Reserved': return <ShieldAlert className="h-5 w-5" />;
      case 'Cleaning': return <Sparkles className="h-5 w-5" />;
      case 'Maintenance': return <Settings className="h-5 w-5" />;
      case 'Out of Order': return <Wind className="h-5 w-5" />;
      default: return <BedDouble className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      <div className="flex-1 space-y-8">
        <div>
          <h2 className="text-xl font-display font-semibold">Room Availability Tracker</h2>
          <p className="text-sm text-muted-foreground">Interactive floor map showing real-time room statuses.</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 bg-background border border-border p-3 rounded-xl shadow-sm">
          {['Available', 'Occupied', 'Reserved', 'Cleaning', 'Maintenance', 'Out of Order'].map(s => (
            <div key={s} className="flex items-center gap-1.5 text-xs font-semibold">
              <span className={`w-3 h-3 rounded-full border ${getStatusColor(s).replace('text-', 'bg-').split(' ')[0]}`}></span>
              {s}
            </div>
          ))}
        </div>

        {/* Floors */}
        <div className="space-y-6">
          {FLOORS.map(floor => (
            <div key={floor.level} className="bg-background rounded-2xl border border-border p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2">{floor.name}</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {ROOM_DATA.filter(r => r.floor === floor.level).map(room => (
                  <button 
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`relative flex flex-col p-4 rounded-xl border-2 transition-all hover:-translate-y-1 hover:shadow-md ${getStatusColor(room.status)} ${selectedRoom?.id === room.id ? 'ring-2 ring-op-purple ring-offset-2 scale-105' : ''}`}
                  >
                    <div className="flex justify-between items-start w-full mb-3">
                      <span className="font-display font-bold text-xl">{room.id}</span>
                      {getStatusIcon(room.status)}
                    </div>
                    <span className="text-xs font-semibold text-left mb-1 opacity-80 uppercase">{room.status}</span>
                    <span className="text-[10px] text-left opacity-70 truncate w-full">{room.type}</span>
                    
                    {room.guest && (
                      <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-background/50 px-1.5 py-0.5 rounded backdrop-blur-sm truncate max-w-[80%]">
                        {room.guest}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Panel */}
      {selectedRoom ? (
        <div className="w-full xl:w-80 shrink-0 bg-background rounded-2xl border border-border shadow-md flex flex-col h-fit sticky top-6 overflow-hidden animate-in fade-in slide-in-from-right-4">
          <div className={`p-6 border-b border-border ${getStatusColor(selectedRoom.status)} bg-opacity-20`}>
            <div className="flex justify-between items-start">
              <h3 className="text-3xl font-display font-bold text-foreground">Room {selectedRoom.id}</h3>
              {getStatusIcon(selectedRoom.status)}
            </div>
            <p className="font-medium mt-1 text-foreground/80">{selectedRoom.type}</p>
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-3 border bg-background/50 backdrop-blur-sm">
              {selectedRoom.status}
            </span>
          </div>
          
          <div className="p-6 space-y-6">
            {selectedRoom.guest ? (
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Current Guest</h4>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-op-purple/10 text-op-purple flex items-center justify-center font-bold">
                    {selectedRoom.guest.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{selectedRoom.guest}</p>
                    <p className="text-xs text-blue-500 hover:underline cursor-pointer">View Profile</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 border-2 border-dashed border-border rounded-xl">
                <p className="text-sm text-muted-foreground">No guest currently assigned</p>
              </div>
            )}

            {selectedRoom.issue && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">Reported Issue</h4>
                <p className="text-sm text-red-700 font-medium">{selectedRoom.issue}</p>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</h4>
              <button className="w-full py-2 bg-op-purple text-white text-sm font-semibold rounded-lg hover:bg-op-purple/90 transition-colors">
                Assign Guest
              </button>
              <button className="w-full py-2 bg-muted text-foreground text-sm font-semibold rounded-lg hover:bg-muted/80 transition-colors">
                Mark as Clean
              </button>
              <button className="w-full py-2 bg-muted text-foreground text-sm font-semibold rounded-lg hover:bg-muted/80 transition-colors">
                Report Maintenance
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden xl:flex w-80 shrink-0 bg-muted/30 rounded-2xl border border-dashed border-border items-center justify-center p-6 text-center text-muted-foreground">
          Select a room from the floor map to view details and available actions.
        </div>
      )}
    </div>
  );
}
