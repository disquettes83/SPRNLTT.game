import React from 'react';
import LottoNumber from './LottoNumber';

interface LottoGridProps {
  selectedNumbers: number[];
  onNumberClick: (number: number) => void;
  maxSelections: number;
  disableSelection?: boolean; // Nuova prop
}

const LottoGrid: React.FC<LottoGridProps> = ({ 
  selectedNumbers, 
  onNumberClick, 
  maxSelections,
  disableSelection = false // Default a false
}) => {
  return (
    <div className="grid grid-cols-10 gap-1">
      {Array.from({ length: 90 }, (_, i) => i + 1).map(number => (
        <LottoNumber
          key={number}
          number={number}
          selected={selectedNumbers.includes(number)}
          onClick={() => onNumberClick(number)}
          disabled={disableSelection || selectedNumbers.length >= maxSelections && !selectedNumbers.includes(number)}
        />
      ))}
    </div>
  );
};

export default LottoGrid;
