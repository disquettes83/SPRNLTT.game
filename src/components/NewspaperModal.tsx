import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Newspaper } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface NewspaperModalProps {
  open: boolean;
  onClose: () => void;
  headline: {
    title: string;
    content: string;
  };
  currentDate: Date;
}

const NewspaperModal: React.FC<NewspaperModalProps> = ({
  open,
  onClose,
  headline,
  currentDate
}) => {
  const formattedDate = format(currentDate, "EEEE d MMMM yyyy", { locale: it });
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between border-b pb-2 mb-2">
            <div className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-primary" />
              <DialogTitle className="text-lg font-serif">IL QUOTIDIANO NAZIONALE</DialogTitle>
            </div>
            <div className="text-sm text-muted-foreground font-serif italic">
              {formattedDate}
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <h2 className="text-xl font-black font-serif uppercase tracking-tight leading-tight">
            {headline.title}
          </h2>
          
          <p className="text-sm font-serif">
            {headline.content}
          </p>
          
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full">Chiudi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewspaperModal;
