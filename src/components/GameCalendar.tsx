import React from 'react';
import { useTime } from '@/contexts/TimeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, getDay, isFirstDayOfMonth } from 'date-fns';
import { it } from 'date-fns/locale';
import { CalendarClock } from 'lucide-react';

// Days of the week for lotto draws (Sunday = 0, Monday = 1, etc.)
const DRAW_DAYS = [2, 4, 5, 6]; // Tuesday, Thursday, Friday, Saturday

const GameCalendar: React.FC = () => {
  const { currentDate, advanceTime, isDrawDay, daysUntilNextDraw, daysUntilSalary } = useTime();
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarClock className="h-5 w-5" />
          Calendario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center font-bold text-xl">
          {format(currentDate, "EEEE d MMMM yyyy", { locale: it })}
        </div>
        
        <div className="space-y-2 border-t pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              Estrazione
            </span>
            <Badge variant={isDrawDay ? "default" : "outline"} className={isDrawDay ? "bg-amber-500" : ""}>
              {isDrawDay ? "Oggi" : `Tra ${daysUntilNextDraw} ${daysUntilNextDraw === 1 ? 'giorno' : 'giorni'}`}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Stipendio
            </span>
            <Badge variant={daysUntilSalary === 0 ? "default" : "outline"} className={daysUntilSalary === 0 ? "bg-green-500" : ""}>
              {daysUntilSalary === 0 ? "Oggi" : `Tra ${daysUntilSalary} ${daysUntilSalary === 1 ? 'giorno' : 'giorni'}`}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => advanceTime(1)}
          >
            +1 Giorno
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => advanceTime(daysUntilNextDraw)}
          >
            Prossima Estrazione
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCalendar;
