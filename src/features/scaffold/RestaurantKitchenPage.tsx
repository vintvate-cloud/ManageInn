import React from 'react';
import { PageHeader, Card } from '../../components/ui/dashboard-shell';
import { Plus, MoreHorizontal, Clock, CheckCircle2, User } from 'lucide-react';

export default function RestaurantKitchenPage() {
  const moduleName = "RestaurantKitchenPage".replace(/([A-Z])/g, ' $1').trim().replace('Page', '');
  
  return (
    <div className="space-y-6 flex flex-col h-full min-h-[80vh]">
      <PageHeader 
        title={moduleName} 
        eyebrow="Workflow > Kanban Board"
        action={
          <button className="px-4 py-2 bg-op-purple text-foreground rounded-xl text-sm font-semibold hover:bg-op-purple/90 flex items-center gap-2">
            <Plus className="h-4 w-4" /> New Task
          </button>
        }
      />
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4 items-start">
        <KanbanColumn title="To Do" count={4} color="bg-muted text-muted-foreground" borderColor="border-border">
          <KanbanCard title="Prep Station 1" time="10:00 AM" priority="Normal" />
          <KanbanCard title="Inventory Check" time="11:30 AM" priority="High" />
          <KanbanCard title="Deep Clean" time="2:00 PM" priority="Normal" />
        </KanbanColumn>
        
        <KanbanColumn title="In Progress" count={2} color="bg-blue-500/10 text-blue-500" borderColor="border-blue-500/20">
          <KanbanCard title="Active Order #402" time="Started 10m ago" priority="Urgent" active />
          <KanbanCard title="Setup Display" time="Started 1h ago" priority="Normal" active />
        </KanbanColumn>
        
        <KanbanColumn title="Completed" count={12} color="bg-green-500/10 text-green-500" borderColor="border-green-500/20">
          <KanbanCard title="Morning Briefing" time="Done" priority="Normal" completed />
          <KanbanCard title="Shift Handover" time="Done" priority="Normal" completed />
        </KanbanColumn>
      </div>
    </div>
  );
}

function KanbanColumn({ title, count, children, color, borderColor }: any) {
  return (
    <div className={`flex flex-col bg-muted/20 border ${borderColor} rounded-2xl p-4 min-w-[280px]`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          {title} <span className={`text-xs px-2 py-0.5 rounded-full ${color}`}>{count}</span>
        </h3>
        <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function KanbanCard({ title, time, priority, active, completed }: any) {
  return (
    <div className={`bg-background border border-border p-4 rounded-xl shadow-sm cursor-grab hover:border-op-purple/50 transition-colors ${completed ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${priority === 'Urgent' ? 'bg-red-500/10 text-red-500' : priority === 'High' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-muted text-muted-foreground'}`}>{priority}</span>
        <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
      </div>
      <h4 className={`font-medium mb-3 ${completed ? 'line-through text-muted-foreground' : ''}`}>{title}</h4>
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          {completed ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> : <Clock className={`h-3.5 w-3.5 ${active ? 'text-blue-500' : ''}`} />}
          <span className={active ? 'text-blue-500' : ''}>{time}</span>
        </div>
        <div className="h-6 w-6 rounded-full bg-muted border border-border flex items-center justify-center">
          <User className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}