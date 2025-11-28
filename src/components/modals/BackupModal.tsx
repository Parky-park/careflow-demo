import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Download, Calendar, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BackupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BackupModal({ open, onOpenChange }: BackupModalProps) {
  const { toast } = useToast();

  const backups = [
    {
      id: "1",
      name: "Full System Backup",
      date: "2024-01-09 00:00:00",
      size: "2.3 GB",
      status: "completed",
      type: "automatic"
    },
    {
      id: "2",
      name: "Full System Backup",
      date: "2024-01-08 00:00:00",
      size: "2.2 GB",
      status: "completed",
      type: "automatic"
    },
    {
      id: "3",
      name: "Manual Backup",
      date: "2024-01-07 15:30:00",
      size: "2.1 GB",
      status: "completed",
      type: "manual"
    },
    {
      id: "4",
      name: "Full System Backup",
      date: "2024-01-07 00:00:00",
      size: "2.2 GB",
      status: "completed",
      type: "automatic"
    },
  ];

  const handleCreateBackup = () => {
    toast({
      title: "Backup Started",
      description: "Creating a new backup of your system data...",
    });
  };

  const handleRestoreBackup = (backup: typeof backups[0]) => {
    toast({
      title: "Restore Backup",
      description: `Restoring backup from ${backup.date}...`,
    });
  };

  const handleDownloadBackup = (backup: typeof backups[0]) => {
    toast({
      title: "Download Started",
      description: `Downloading backup from ${backup.date}...`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Backup & Recovery
          </DialogTitle>
          <DialogDescription>
            Manage system backups and restore points
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-1">
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Automatic Backups</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Daily backups are created automatically at midnight. Last 30 days are retained.
              </p>
              <Button onClick={handleCreateBackup}>
                Create Manual Backup
              </Button>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Available Backups</h3>
              {backups.map((backup) => (
                <div
                  key={backup.id}
                  className="p-4 border rounded-lg bg-card"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-full bg-muted">
                        <Database className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{backup.name}</h4>
                          <Badge variant={backup.type === 'automatic' ? 'default' : 'secondary'}>
                            {backup.type}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            {backup.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {backup.date}
                          </div>
                          <div>Size: {backup.size}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRestoreBackup(backup)}
                    >
                      Restore
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadBackup(backup)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
