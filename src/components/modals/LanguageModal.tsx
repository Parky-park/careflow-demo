import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import { useState } from "react";
import { useUpdatePreferences } from "@/hooks/useUserSettings";

interface LanguageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLanguage: string;
}

export function LanguageModal({ open, onOpenChange, currentLanguage }: LanguageModalProps) {
  const updatePreferences = useUpdatePreferences();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const languages = [
    { value: "en-US", label: "English (US)" },
    { value: "en-GB", label: "English (UK)" },
    { value: "es-ES", label: "Español (España)" },
    { value: "fr-FR", label: "Français (France)" },
    { value: "de-DE", label: "Deutsch (Deutschland)" },
    { value: "it-IT", label: "Italiano (Italia)" },
    { value: "pt-BR", label: "Português (Brasil)" },
    { value: "zh-CN", label: "中文 (简体)" },
    { value: "ja-JP", label: "日本語 (日本)" },
    { value: "ko-KR", label: "한국어 (대한민국)" },
  ];

  const handleSave = () => {
    updatePreferences.mutate(
      { language: selectedLanguage },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Select Language
          </DialogTitle>
          <DialogDescription>
            Choose your preferred language for the interface
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-1">
          <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <div className="space-y-3">
              {languages.map((language) => (
                <div key={language.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={language.value} id={language.value} />
                  <Label htmlFor={language.value} className="flex-1 cursor-pointer">
                    {language.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updatePreferences.isPending}>
            {updatePreferences.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
