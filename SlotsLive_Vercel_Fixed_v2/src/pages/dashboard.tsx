import { useEffect } from "react";
import { useSlotsData } from "@/hooks/use-slots-data";
import SlotCard from "@/components/slot-card";
import StatsBar from "@/components/stats-bar";

export default function Dashboard() {
  const { slots, stats, isLoading, updateData } = useSlotsData();

  useEffect(() => {
    // Auto-update every 8 seconds to see the bar animations
    const interval = setInterval(() => {
      updateData();
    }, 8000);

    return () => clearInterval(interval);
  }, [updateData]);

  return (
    <div className="bg-pg-dark text-white min-h-screen">
      {/* Header */}
      <header className="header-gradient border-b border-pg-border sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-pg-orange bg-clip-text text-transparent">
                🎰 PG Soft Slots
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mt-2 font-medium">
                Porcentagens ao Vivo • Dados Atualizados
              </p>
              <div className="flex items-center justify-center mt-3 space-x-2">
                <div className="w-2 h-2 bg-pg-green rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Online agora</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <StatsBar stats={stats} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="card-gradient rounded-2xl p-6 border border-pg-border">
                <div className="loading-shimmer h-48 rounded-xl mb-4"></div>
                <div className="loading-shimmer h-6 rounded mb-3"></div>
                <div className="loading-shimmer h-4 rounded mb-2"></div>
                <div className="loading-shimmer h-4 rounded mb-4"></div>
                <div className="loading-shimmer h-10 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {slots.map((slot, index) => (
              <SlotCard key={slot.nome} slot={slot} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="header-gradient border-t border-pg-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2024 PG Soft Dashboard • Dados atualizados em tempo real
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Jogue com responsabilidade • +18 anos
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
