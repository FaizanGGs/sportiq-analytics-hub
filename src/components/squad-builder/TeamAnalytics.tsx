
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, Check, Info } from 'lucide-react';
import { PlayerType, TeamAnalytics as TeamAnalyticsType } from '@/types/player';
import { cn } from '@/lib/utils';

interface TeamAnalyticsProps {
  players: PlayerType[];
  analytics: TeamAnalyticsType;
}

const TeamAnalytics: React.FC<TeamAnalyticsProps> = ({ players, analytics }) => {
  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA'];

  const ratingData = [
    { name: 'Attack', value: analytics.attackRating },
    { name: 'Midfield', value: analytics.midfieldRating },
    { name: 'Defense', value: analytics.defenseRating },
    { name: 'Form', value: analytics.formRating }
  ];
  
  const teamCompositionData = [
    { name: 'Forward', value: players.filter(p => p.position === 'Forward').length },
    { name: 'Midfielder', value: players.filter(p => p.position === 'Midfielder').length },
    { name: 'Defender', value: players.filter(p => p.position === 'Defender').length },
    { name: 'Goalkeeper', value: players.filter(p => p.position === 'Goalkeeper').length }
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <h4 className="text-sm font-medium mb-2 text-white/80">Team Rating</h4>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-white">{analytics.overallRating.toFixed(1)}</span>
            <span className="text-sm text-white/60">/ 10</span>
          </div>
          
          <div className="mt-4 space-y-2">
            {ratingData.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70">{item.name}</span>
                  <span className="font-medium">{item.value.toFixed(1)}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      item.value >= 8 ? "bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]" : 
                      item.value >= 6 ? "bg-gradient-to-r from-[#7E69AB] to-[#9b87f5]" : 
                      "bg-gradient-to-r from-[#6E59A5] to-[#7E69AB]"
                    )}
                    style={{ width: `${item.value * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <h4 className="text-sm font-medium mb-2 text-white/80">Team Composition</h4>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={teamCompositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {teamCompositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} players`, name]}
                  contentStyle={{ 
                    backgroundColor: '#222',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2 space-x-3">
            {teamCompositionData.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-1 text-xs">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-white/70">{item.name}s</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <h4 className="text-sm font-medium mb-3 text-white/80">Team Insights</h4>
        
        <div className="space-y-3">
          {analytics.strengths.length > 0 && (
            <div className="p-2 rounded bg-[#9b87f5]/10">
              <div className="flex items-start">
                <Check className="h-4 w-4 text-[#9b87f5] mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-[#D6BCFA]">Strengths</p>
                  <ul className="list-disc text-xs text-white/70 pl-4 mt-1 space-y-1">
                    {analytics.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {analytics.weaknesses.length > 0 && (
            <div className="p-2 rounded bg-white/5">
              <div className="flex items-start">
                <AlertCircle className="h-4 w-4 text-orange-300 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-orange-300">Areas to Improve</p>
                  <ul className="list-disc text-xs text-white/70 pl-4 mt-1 space-y-1">
                    {analytics.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {analytics.suggestions.length > 0 && (
            <div className="p-2 rounded bg-white/5">
              <div className="flex items-start">
                <Info className="h-4 w-4 text-sky-300 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-sky-300">Suggestions</p>
                  <ul className="list-disc text-xs text-white/70 pl-4 mt-1 space-y-1">
                    {analytics.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamAnalytics;
