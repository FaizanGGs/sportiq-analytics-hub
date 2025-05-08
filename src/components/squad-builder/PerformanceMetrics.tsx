
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlayerType } from '@/types/player';
import { User } from 'lucide-react';

interface PerformanceMetricsProps {
  player: PlayerType | null;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ player }) => {
  const generatePerformanceData = (player: PlayerType | null) => {
    if (!player) return [];
    
    if (player.sport === 'football') {
      return [
        { name: 'Goals', value: player.stats?.goals as number || 0 },
        { name: 'Assists', value: player.stats?.assists as number || 0 },
        { name: 'Minutes', value: (player.stats?.minutesPlayed as number || 0) / 90 },
        { name: 'Form', value: parseFloat(player.form) || 0 }
      ];
    } else { // Cricket
      return [
        { name: 'Runs', value: player.stats?.runs as number || 0 },
        { name: 'Wickets', value: player.stats?.wickets as number || 0 },
        { name: 'Strike Rate', value: (player.stats?.strikeRate as number || 0) / 10 },
        { name: 'Form', value: parseFloat(player.form) || 0 }
      ];
    }
  };

  const chartColors = {
    primary: '#3b82f6',
    secondary: '#10b981',
    text: '#ffffff'
  };

  return (
    <div className="h-full flex flex-col">
      <h3 className="font-bold mb-2">Player Performance</h3>
      
      {player ? (
        <>
          <div className="mb-4 flex items-center gap-3 p-3 bg-sportiq-lightgray/20 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-sportiq-blue/20 flex items-center justify-center">
              <User className="h-6 w-6 text-sportiq-blue" />
            </div>
            <div>
              <p className="font-bold text-lg">{player.name}</p>
              <p className="text-white/70">{player.team} • {player.position}</p>
            </div>
          </div>
          
          <div className="flex-1 h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={generatePerformanceData(player)}
                margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#555" horizontal={false} />
                <XAxis type="number" stroke={chartColors.text} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={80}
                  stroke={chartColors.text}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#333', 
                    color: chartColors.text,
                    border: `1px solid ${chartColors.primary}`
                  }}
                />
                <Bar dataKey="value" fill={chartColors.primary} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-sportiq-lightgray/20 p-2 rounded">
              <p className="text-xs text-white/70">Points</p>
              <p className="text-lg font-bold">{player.points}</p>
            </div>
            <div className="bg-sportiq-lightgray/20 p-2 rounded">
              <p className="text-xs text-white/70">Price</p>
              <p className="text-lg font-bold">${player.price.toFixed(1)}m</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-white/50">
          <p>Select a player to view performance metrics</p>
        </div>
      )}
    </div>
  );
};

export default PerformanceMetrics;
