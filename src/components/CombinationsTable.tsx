import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info } from 'lucide-react';
import { COMBINATIONS_TABLE } from '@/lib/lotteryUtils';

interface CombinationsTableProps {
  onSelectNumbers?: (count: number) => void;
  currentSelection?: number;
}

const CombinationsTable: React.FC<CombinationsTableProps> = ({ 
  onSelectNumbers,
  currentSelection = 6
}) => {
  return (
    <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
      <div className="mb-3 flex items-center">
        <Info className="h-4 w-4 mr-2 text-primary" />
        <h3 className="font-bold text-sm">Tabella delle Combinazioni</h3>
      </div>
      
      <Table>
        <TableCaption>Scegli più numeri per sviluppare più combinazioni</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Numeri</TableHead>
            <TableHead>Combinazioni</TableHead>
            <TableHead className="text-right">Costo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {COMBINATIONS_TABLE.map((row) => (
            <TableRow 
              key={row.numeri}
              className={currentSelection === row.numeri ? "bg-primary/10 font-medium" : ""}
              onClick={() => onSelectNumbers && onSelectNumbers(row.numeri)}
              style={{ cursor: onSelectNumbers ? 'pointer' : 'default' }}
            >
              <TableCell className="font-medium">{row.numeri}</TableCell>
              <TableCell>{row.combinazioni.toLocaleString('it-IT')}</TableCell>
              <TableCell className="text-right">{row.costo.toFixed(2)}€</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <p className="text-xs text-muted-foreground mt-3">
        La tabella mostra quante combinazioni di 6 numeri vengono generate selezionando un numero maggiore di caselle.
        Il costo della giocata aumenta proporzionalmente al numero di combinazioni.
      </p>
    </div>
  );
};

export default CombinationsTable;