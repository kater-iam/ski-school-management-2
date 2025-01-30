import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { formatDateToJapanese, isDateField } from "@/lib/utils";

// リレーションの詳細を表示するモーダルコンポーネント
export const RelationDetailModal = ({ 
    relationName, 
    relationData,
    isOpen,
    onClose
}: { 
    relationName: string;
    relationData: Record<string, any>;
    isOpen: boolean;
    onClose: () => void;
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{relationName}の詳細情報</DialogTitle>
                </DialogHeader>
                <div className="relative max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4">
                        {Object.entries(relationData).map(([fieldKey, fieldValue]) => (
                            <div key={fieldKey} className="space-y-2">
                                <div className="text-sm font-medium text-foreground/70">{fieldKey}</div>
                                <div className="rounded-md border bg-muted px-4 py-2 text-sm">
                                    {isDateField(fieldKey, fieldValue) ? (
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4" />
                                            {formatDateToJapanese(fieldValue as string)}
                                        </div>
                                    ) : (
                                        String(fieldValue)
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// リレーションボタンコンポーネント
export const RelationButton = ({
    relationName,
    relationData
}: {
    relationName: string;
    relationData: Record<string, any>;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsModalOpen(true)}
                type="button"
            >
                {relationName}の詳細を表示
            </Button>
            <RelationDetailModal
                relationName={relationName}
                relationData={relationData}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}; 