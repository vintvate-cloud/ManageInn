import { create } from 'zustand'
import type { Room, Booking, Guest, Transaction, RestaurantTable, MenuItem, Order } from '../types'

// ── HOTEL STORE ─────────────────────────────────────────────

interface HotelStore {
  rooms: Room[]
  bookings: Booking[]
  guests: Guest[]
  transactions: Transaction[]
  loading: boolean
  
  fetchHotelData: (businessId: string) => Promise<void>
  addRoom: (room: Omit<Room, 'id' | 'created_at'>) => Promise<void>
  updateRoom: (id: string, updates: Partial<Room>) => Promise<void>
  deleteRoom: (id: string) => Promise<void>
  addBooking: (booking: any) => Promise<void>
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>
  addTransaction: (tx: any) => Promise<void>
}

export const useHotelStore = create<HotelStore>((set, get) => ({
  rooms: [],
  bookings: [],
  guests: [],
  transactions: [],
  loading: false,

  fetchHotelData: async (businessId: string) => {
    set({ loading: true })
    try {
      // Mock Data
      set({
        rooms: [],
        bookings: [],
        guests: [],
        transactions: [],
        loading: false
      })
    } catch (err) {
      console.error('Fetch hotel data failed:', err)
      set({ loading: false })
    }
  },

  addRoom: async (room) => {
    const newRoom = { ...room, id: Date.now().toString(), created_at: new Date().toISOString() } as Room
    set(s => ({ rooms: [...s.rooms, newRoom] }))
  },

  updateRoom: async (id, updates) => {
    set(s => ({ rooms: s.rooms.map(r => r.id === id ? { ...r, ...updates } : r) }))
  },

  deleteRoom: async (id) => {
    set(s => ({ rooms: s.rooms.filter(r => r.id !== id) }))
  },

  addBooking: async (booking) => {
    const newBooking = { ...booking, id: Date.now().toString(), created_at: new Date().toISOString() } as Booking
    set(s => ({ bookings: [newBooking, ...s.bookings] }))
  },

  updateBooking: async (id, updates) => {
    set(s => ({ bookings: s.bookings.map(b => b.id === id ? { ...b, ...updates } : b) }))
  },

  addTransaction: async (tx) => {
    const newTx = { ...tx, id: Date.now().toString(), created_at: new Date().toISOString() } as Transaction
    set(s => ({ transactions: [newTx, ...s.transactions] }))
  },
}))

// ── RESTAURANT STORE ──────────────────────────────────────────

interface RestaurantStore {
  tables: RestaurantTable[]
  menu: MenuItem[]
  orders: Order[]
  loading: boolean

  fetchRestaurantData: (businessId: string) => Promise<void>
  addTable: (table: Omit<RestaurantTable, 'id' | 'created_at'>) => Promise<void>
  updateTable: (id: string, updates: Partial<RestaurantTable>) => Promise<void>
  addOrder: (order: any, items: any[]) => Promise<void>
  updateOrder: (id: string, updates: Partial<Order>) => Promise<void>
  addMenuItem: (item: Omit<MenuItem, 'id' | 'created_at'>) => Promise<void>
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => Promise<void>
}

export const useRestaurantStore = create<RestaurantStore>((set, get) => ({
  tables: [],
  menu: [],
  orders: [],
  loading: false,

  fetchRestaurantData: async (businessId: string) => {
    set({ loading: true })
    try {
      set({
        tables: [],
        menu: [],
        orders: [],
        loading: false
      })
    } catch (err) {
      console.error('Fetch restaurant data failed:', err)
      set({ loading: false })
    }
  },

  addTable: async (table) => {
    const newTable = { ...table, id: Date.now().toString(), created_at: new Date().toISOString() } as RestaurantTable
    set(s => ({ tables: [...s.tables, newTable] }))
  },

  updateTable: async (id, updates) => {
    set(s => ({ tables: s.tables.map(t => t.id === id ? { ...t, ...updates } : t) }))
  },

  addMenuItem: async (item) => {
    const newItem = { ...item, id: Date.now().toString(), created_at: new Date().toISOString() } as MenuItem
    set(s => ({ menu: [...s.menu, newItem] }))
  },

  updateMenuItem: async (id, updates) => {
    set(s => ({ menu: s.menu.map(m => m.id === id ? { ...m, ...updates } : m) }))
  },

  addOrder: async (order, items) => {
    const newOrder = { ...order, id: Date.now().toString(), created_at: new Date().toISOString() } as Order
    const orderItems = items.map(item => ({ ...item, order_id: newOrder.id }))
    
    // In memory relationships
    const fullOrder = {
      ...newOrder,
      items: orderItems
    }
    
    set(s => ({ orders: [fullOrder, ...s.orders] }))
  },

  updateOrder: async (id, updates) => {
    set(s => ({ orders: s.orders.map(o => o.id === id ? { ...o, ...updates } : o) }))
  },
}))
