
import React from 'react';
import { cn } from '@/lib/utils';
import { BudgetInfo } from '@/types/player';

interface BudgetManagerProps {
  budget: BudgetInfo;
  onBudgetChange: (total: number) => void;
}

const BudgetManager: React.FC<BudgetManagerProps> = ({ budget, onBudgetChange }) => {
  const budgetOptions = [50, 75, 100, 150, 200];
  const percentSpent = (budget.spent / budget.total) * 100;
  
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-medium text-white/80">Team Budget</h4>
        <div className="flex space-x-1">
          {budgetOptions.map(option => (
            <button
              key={option}
              onClick={() => onBudgetChange(option)}
              className={cn(
                "text-xs px-2 py-1 rounded transition-colors",
                budget.total === option 
                  ? "bg-[#9b87f5] text-white" 
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              )}
            >
              {option}m
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/80">{budget.spent.toFixed(1)}m spent</span>
          <span className="text-white/80">{budget.remaining.toFixed(1)}m remaining</span>
        </div>
        
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all",
              percentSpent > 90 ? "bg-red-500" : 
              percentSpent > 75 ? "bg-amber-500" : 
              "bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]"
            )}
            style={{ width: `${Math.min(100, percentSpent)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetManager;
