import React from 'react';
import { PageHeader, Card } from '../../components/ui/dashboard-shell';
import { Search, ShoppingCart, CreditCard, Banknote, Tag, User, Trash2 } from 'lucide-react';

export default function RestaurantPosPage() {
  const moduleName = "RestaurantPosPage".replace(/([A-Z])/g, ' $1').trim().replace('Page', '');
  
  return (
    <div className="space-y-6 flex flex-col h-full min-h-[85vh]">
      <PageHeader 
        title={moduleName} 
        eyebrow="Transactions > POS Terminal" 
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Items Catalog */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input placeholder="Search items, categories, barcodes..." className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-op-purple shadow-sm" />
            </div>
            <button className="px-4 border border-border bg-background rounded-xl hover:bg-muted"><Tag className="h-5 w-5" /></button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {['All Items', 'Beverages', 'Main Course', 'Desserts', 'Add-ons', 'Merch'].map(c => (
              <button key={c} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${c === 'All Items' ? 'bg-foreground text-background' : 'bg-background border border-border hover:bg-muted'}`}>{c}</button>
            ))}
          </div>
          
          <div className="flex-1 bg-muted/20 border border-border rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto content-start custom-scrollbar">
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-3 cursor-pointer hover:border-op-purple transition-colors shadow-sm text-center flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">🍔</div>
                <div className="text-sm font-medium leading-tight">Item Product {i+1}</div>
                <div className="text-op-purple font-semibold text-sm">$12.50</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Side: Current Order / Cart */}
        <Card className="flex flex-col p-0 overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2"><ShoppingCart className="h-5 w-5" /> Current Order</h3>
            <button className="text-muted-foreground hover:text-foreground"><User className="h-5 w-5" /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-xs font-bold">x{i}</div>
                  <div>
                    <div className="text-sm font-medium">Selected Item {i}</div>
                    <div className="text-xs text-muted-foreground">$12.50 each</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold">{`$${(12.50 * i).toFixed(2)}`}</div>
                  <button className="text-red-500/50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-muted/20 border-t border-border space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>$75.00</span></div>
            <div className="flex justify-between text-sm text-muted-foreground"><span>Tax (10%)</span><span>$7.50</span></div>
            <div className="border-t border-border pt-3 flex justify-between text-lg font-bold"><span>Total</span><span>$82.50</span></div>
            
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button className="py-3 border border-border bg-background rounded-xl font-semibold flex flex-col items-center gap-1 hover:bg-muted">
                <Banknote className="h-5 w-5" /> Cash
              </button>
              <button className="py-3 bg-op-purple text-foreground rounded-xl font-semibold flex flex-col items-center gap-1 hover:bg-op-purple/90 shadow-sm">
                <CreditCard className="h-5 w-5" /> Card Checkout
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}