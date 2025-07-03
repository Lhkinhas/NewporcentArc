import { useState, useCallback } from "react";

interface SlotData {
  nome: string;
  imagem: string;
  rtp: string;
  maxWin: string;
  porcentagem: number;
  jogadores: number;
}

interface StatsData {
  totalGames: number;
  averageRTP: number;
  totalPlayers: number;
}

const STATIC_SLOTS = [
  { 
    nome: "Fortune Tiger", 
    imagem: "https://www.pgsoft.com/uploads/Games/Images/573dd356-c258-4f7d-b6a3-94c4ab44a780.png",
    maxWin: "2,500x"
  },
  { 
    nome: "Cash Mania", 
    imagem: "https://www.pgsoft.com/uploads/Games/Images/a32fdc67-e0c0-4d7b-a211-53868866a0f7.png",
    maxWin: "5,000x"
  },
  { 
    nome: "Fortune Dragon", 
    imagem: "https://www.pgsoft.com/uploads/Games/Images/6db8b734-210d-4c7f-b427-0480a05a9e7d.png",
    maxWin: "2,000x"
  },
  { 
    nome: "Mahjong Ways 2", 
    imagem: "https://www.pgsoft.com/uploads/Games/Images/5ccb820b-44a0-4d93-96ad-6ca241b13127.png",
    maxWin: "100,000x"
  },
  { 
    nome: "Lucky Neko", 
    imagem: "https://www.pgsoft.com/uploads/Games/Images/a0117f36-871d-4aef-a40c-c83d083c8dbd.png",
    maxWin: "2,500x"
  },
  { 
    nome: "Fortune Ox", 
    imagem: "https://www.pgsoft.com/uploads/Games/Images/dad28553-b44b-41d9-9e8f-1188f7ffd995.png",
    maxWin: "5,000x"
  },
  { 
    nome: "Fortune Rabbit", 
    imagem: "https://www.pgsoft.com/uploads/Games/Images/1c66cd3b-e9e6-417a-a59e-74124af6ebc5.png",
    maxWin: "5,000x"
  },
  { 
    nome: "Fortune Mouse", 
    imagem: "https://www.pgsoft.com/uploads/Games/Images/dcb0a0c8-86e4-4f81-a738-46fb29bf7c6a.png",
    maxWin: "10,000x"
  }
];

// Generate different RTP for each game
const getGameRTP = (gameName: string): string => {
  const rtpRanges: { [key: string]: { min: number; max: number } } = {
    "Fortune Tiger": { min: 96.5, max: 97.2 },
    "Cash Mania": { min: 95.8, max: 96.4 },
    "Fortune Dragon": { min: 96.1, max: 96.7 },
    "Mahjong Ways 2": { min: 97.0, max: 97.8 },
    "Lucky Neko": { min: 95.5, max: 96.1 },
    "Fortune Ox": { min: 96.8, max: 97.5 },
    "Fortune Rabbit": { min: 96.2, max: 96.9 },
    "Fortune Mouse": { min: 96.6, max: 97.3 }
  };
  
  const range = rtpRanges[gameName] || { min: 96.0, max: 97.0 };
  const randomRTP = Math.random() * (range.max - range.min) + range.min;
  
  return randomRTP.toFixed(2) + "%";
};

// Generate different percentages for each game with wider ranges for more visual variation
const getGamePercentage = (gameName: string): number => {
  const gameRanges: { [key: string]: { min: number; max: number } } = {
    "Fortune Tiger": { min: 88, max: 98 },      // Popular game - higher chance of being "hot"
    "Cash Mania": { min: 75, max: 90 },        // More volatile - can be cold or hot
    "Fortune Dragon": { min: 80, max: 93 },    // Medium range
    "Mahjong Ways 2": { min: 85, max: 96 },    // Consistent performer
    "Lucky Neko": { min: 77, max: 89 },        // Can be quite cold sometimes
    "Fortune Ox": { min: 90, max: 98 },        // Usually hot
    "Fortune Rabbit": { min: 82, max: 92 },    // Balanced range
    "Fortune Mouse": { min: 84, max: 94 }      // Good performer
  };
  
  const range = gameRanges[gameName] || { min: 75, max: 95 };
  
  // Use time-based seed for more realistic variation
  const timeSeed = Date.now() % 1000;
  const gameNameSeed = gameName.length * 31;
  const combinedSeed = (timeSeed + gameNameSeed) % 100;
  
  // Create weighted random that tends toward the middle but can hit extremes
  const random1 = Math.random();
  const random2 = Math.random();
  const weightedRandom = (random1 + random2) / 2; // More likely to be in middle
  
  // Occasionally allow extreme values
  const useExtreme = Math.random() < 0.15; // 15% chance of extreme values
  const finalRandom = useExtreme ? Math.random() : weightedRandom;
  
  const basePercentage = Math.floor(finalRandom * (range.max - range.min + 1)) + range.min;
  
  // Add small variation based on combined seed
  const variation = (combinedSeed % 3) - 1; // -1, 0, or +1
  const finalPercentage = Math.min(99, Math.max(70, basePercentage + variation));
  
  return finalPercentage;
};

// Generate different player counts for each game
const getGamePlayers = (gameName: string): number => {
  const popularGames = ["Fortune Tiger", "Mahjong Ways 2", "Fortune Ox"];
  const baseMin = popularGames.includes(gameName) ? 600 : 400;
  const baseMax = popularGames.includes(gameName) ? 1200 : 900;
  
  return Math.floor(Math.random() * (baseMax - baseMin + 1)) + baseMin;
};

export function useSlotsData() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize with different data for each game
  const [slots, setSlots] = useState<SlotData[]>(() => {
    return STATIC_SLOTS.map((slot) => ({
      nome: slot.nome,
      imagem: slot.imagem,
      maxWin: slot.maxWin,
      rtp: getGameRTP(slot.nome),
      porcentagem: getGamePercentage(slot.nome),
      jogadores: getGamePlayers(slot.nome)
    }));
  });
  
  const [stats, setStats] = useState<StatsData>(() => {
    return {
      totalGames: STATIC_SLOTS.length,
      averageRTP: 96.5,
      totalPlayers: STATIC_SLOTS.length * 650
    };
  });

  const generateSlotsData = useCallback(() => {
    const newSlots: SlotData[] = STATIC_SLOTS.map(slot => ({
      nome: slot.nome,
      imagem: slot.imagem,
      maxWin: slot.maxWin,
      rtp: getGameRTP(slot.nome),
      porcentagem: getGamePercentage(slot.nome),
      jogadores: getGamePlayers(slot.nome)
    }));

    const totalPlayers = newSlots.reduce((sum, slot) => sum + slot.jogadores, 0);
    const averageRTP = newSlots.reduce((sum, slot) => sum + parseFloat(slot.rtp), 0) / newSlots.length;

    setSlots(newSlots);
    setStats({
      totalGames: STATIC_SLOTS.length,
      averageRTP,
      totalPlayers
    });
  }, []);

  const updateData = useCallback(() => {
    generateSlotsData();
  }, [generateSlotsData]);

  return {
    slots,
    stats,
    isLoading,
    updateData
  };
}