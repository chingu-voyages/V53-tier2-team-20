import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Check, Edit2, Trash2, X } from 'lucide-react';
import { AllergyItem as AllergyItemType } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAllergyStore } from '@/store/allergyStore';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AllergyItemProps {
    allergy: AllergyItemType;
}

function AllergyItem({ allergy }: AllergyItemProps) {
    const { allergies, updateAllergy, deleteAllergy } = useAllergyStore();

    const [editingName, setEditingName] = useState(allergy.name);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const saveEdit = () => {
        const trimmedName = editingName.trim();
        if (trimmedName === '') {
            setErrorMessage('Allergy name cannot be empty');
            return;
        }

        const isDuplicate = allergies.some(
            (a) => a.id !== allergy.id && a.name.toLowerCase() === trimmedName.toLowerCase()
        );

        if (isDuplicate) {
            setErrorMessage('Allergy already exists!');
            return;
        }

        updateAllergy(allergy.id, trimmedName);
        setIsEditing(false);
        setEditingName(trimmedName);
        setErrorMessage('');
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditingName(allergy.name);
        setErrorMessage('');
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // Check if the related target is one of the edit buttons
        const isEditButton = e.relatedTarget?.closest('button');
        if (!isEditButton) {
            cancelEdit();
        }
    };

    return (
        <div className="space-y-2">
            {errorMessage && (
                <Alert variant="destructive">
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            )}

            <div className="flex justify-between rounded-lg bg-white p-2 shadow-sm">
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-sm text-primary">
                            {allergy.initial}
                        </AvatarFallback>
                    </Avatar>
                    {isEditing ? (
                        <Input
                            type="text"
                            value={editingName}
                            autoFocus
                            onChange={(e) => setEditingName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                            onBlur={handleBlur}
                        />
                    ) : (
                        <span className="text-sm text-gray-600">{allergy.name}</span>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    {isEditing ? (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={saveEdit}
                            >
                                <Check className="text-green-500 h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={cancelEdit}
                            >
                                <X className="text-red-500 h-4 w-4" />
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit2 className="text-gray-400 h-4 w-4" />
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => deleteAllergy(allergy.id)}
                    >
                        <Trash2 className="text-gray-400 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AllergyItem;
