import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface SlotData {
  nome: string;
  imagem: string;
  rtp: string;
  maxWin: string;
  porcentagem: number;
  jogadores: number;
}

interface SlotCardProps {
  slot: SlotData;
}

export default function SlotCard({ slot }: SlotCardProps) {
  const getPercentageClass = (percentage: number) => {
    return percentage >= 90 ? 'percentage-high' : 'percentage-medium';
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('pt-BR');
  };

  const handlePlayClick = () => {
    window.open('https://www.bggbet.com/#/?agentid=12014888', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="game-card card-gradient rounded-2xl p-6 border border-pg-border hover:border-pg-orange/50 transition-all duration-300">
      <div className="relative mb-4 group">
        <img 
          src={slot.imagem} 
          alt={slot.nome} 
          className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjMkEyQTJBIi8+CjxwYXRoIGQ9Ik04NSA3MEg5NVY5MEg4NVY3MFoiIGZpbGw9IiM2NjY2NjYiLz4KPGF0aCBkPSJNMTA1IDcwSDExNVY5MEgxMDVWNzBaIiBmaWxsPSIjNjY2NjY2Ii8+Cjwvc3ZnPgo=';
          }}
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <div className={`${getPercentageClass(slot.porcentagem)} text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg`}>
            {slot.porcentagem}%
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-white truncate">{slot.nome}</h3>
        
        {/* Barra de Porcentagem */}
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Status</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                slot.porcentagem >= 90 
                  ? 'bg-green-500/20 text-green-400' 
                  : slot.porcentagem >= 80 
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
              }`}>
                {slot.porcentagem >= 90 ? '🔥 QUENTE' : slot.porcentagem >= 80 ? '⚡ MÉDIO' : '❄️ FRIO'}
              </span>
            </div>
            <span className="text-sm font-bold text-white">{slot.porcentagem}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-3 rounded-full transition-all duration-700 ease-out ${
                slot.porcentagem >= 90 
                  ? 'bg-gradient-to-r from-green-500 to-green-400 shadow-lg shadow-green-500/30' 
                  : slot.porcentagem >= 80 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-400 shadow-lg shadow-orange-500/30'
                    : 'bg-gradient-to-r from-red-500 to-red-400 shadow-lg shadow-red-500/30'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, slot.porcentagem))}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>70%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-pg-green rounded-full mr-2 animate-pulse"></span>
            {formatNumber(slot.jogadores)} jogando
          </span>
          <span className="text-pg-orange font-medium">Agora: {slot.porcentagem}%</span>
        </div>
        
        <Button 
          onClick={handlePlayClick}
          className="play-button w-full py-3 px-6 rounded-xl font-bold text-white shadow-lg flex items-center justify-center space-x-2 animate-glow hover:scale-105 transition-transform"
        >
          <span>🎮</span>
          <span>Jogue Agora</span>
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
