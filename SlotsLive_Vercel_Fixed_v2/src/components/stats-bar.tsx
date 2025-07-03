interface StatsData {
  totalGames: number;
  averageRTP: number;
  totalPlayers: number;
}

interface StatsBarProps {
  stats: StatsData;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const formatNumber = (num: number) => {
    return num.toLocaleString('pt-BR');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card-gradient rounded-xl p-4 text-center border border-pg-border">
          <div className="text-2xl font-bold text-pg-orange">{stats.totalGames}</div>
          <div className="text-sm text-gray-400">Jogos Ativos</div>
        </div>
        <div className="card-gradient rounded-xl p-4 text-center border border-pg-border">
          <div className="text-2xl font-bold text-pg-green">{stats.averageRTP.toFixed(1)}%</div>
          <div className="text-sm text-gray-400">RTP Médio</div>
        </div>
        <div className="card-gradient rounded-xl p-4 text-center border border-pg-border">
          <div className="text-2xl font-bold text-white">{formatNumber(stats.totalPlayers)}</div>
          <div className="text-sm text-gray-400">Jogadores Online</div>
        </div>
        <div className="card-gradient rounded-xl p-4 text-center border border-pg-border">
          <div className="text-2xl font-bold text-pg-orange">🔥</div>
          <div className="text-sm text-gray-400">Atualização Live</div>
        </div>
      </div>
    </div>
  );
}
