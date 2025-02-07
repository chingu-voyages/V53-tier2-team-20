import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Edit2, Plus, Trash2, X } from 'lucide-react';
import { AllergyItem } from '@/types';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

function AllergyList() {
    const [allergies, setAllergies] = useState<AllergyItem[]>([
        { id: 1, name: 'Allergy 1', initial: 'A' },
        { id: 2, name: 'Allergy 2', initial: 'A' },
        { id: 3, name: 'Allergy 3', initial: 'A' },
    ]);
    const [newAllergy, setNewAllergy] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const addAllergy = () => {
        const trimmedAllergy = newAllergy.trim();
        if (trimmedAllergy == '') {
            return;
        }

        const isDuplicate = allergies.some(
            (allergy) => allergy.name.toLowerCase() === trimmedAllergy.toLowerCase()
        );

        if (isDuplicate) {
            setErrorMessage('Allergy already exists!');
            return;
        }

        const newItem: AllergyItem = {
            id: Date.now(),
            name: newAllergy,
            initial: newAllergy.charAt(0).toUpperCase(),
        };

        setAllergies([...allergies, newItem]);
        setNewAllergy('');
        setErrorMessage('');
    };

    const deleteAllergy = (id: number) => {
        setAllergies(allergies.filter((allergy) => allergy.id !== id));
    };

    const startEditing = (id: number, name: string) => {
        setEditingId(id);
        setEditingName(name);
    };

    const saveEdit = () => {
        console.log('save edit', editingName.trim());
        const trimmedName = editingName.trim();
        if (trimmedName === '') return;

        const isDuplicate = allergies.some(
            (allergy) => allergy.name.toLowerCase() === trimmedName.toLowerCase()
        );

        if (isDuplicate) {
            setErrorMessage('Allergy already exists!');
            return;
        }

        setAllergies(
            allergies.map((allergy) =>
                allergy.id === editingId ? { ...allergy, name: editingName } : allergy
            )
        );
        // reset
        cancelEdit();
    };

    const cancelEdit = () => {
        console.log('cancel edit');
        setEditingId(null);
        setEditingName('');
        setErrorMessage('');
    };

    // const handleBlur = () => {
    //     setTimeout(() => {
    //         if (!isSaving) {
    //             cancelEdit();
    //         }
    //     }, 0);
    // };

    return (
        <Card className="w-full max-w-2xl border-0 bg-gray-50">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Allergy Lists</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Error Message */}
                {errorMessage && (
                    <Alert variant="destructive">
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
                {/* Input for adding a new allergy */}
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Add new allergy"
                        value={newAllergy}
                        onChange={(e) => {
                            setNewAllergy(e.target.value);
                            setErrorMessage('');
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && addAllergy()}
                    />
                    <Button onClick={addAllergy}>
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                    </Button>
                </div>
                {allergies.map((allergy) => (
                    <div
                        key={allergy.id}
                        className="flex justify-between rounded-lg bg-white p-2 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-sm text-primary">
                                    {allergy.initial}
                                </AvatarFallback>
                            </Avatar>
                            {/* Show input when editing, otherwise show text */}
                            {/* TODO: input styles need to be adjusted */}
                            {editingId === allergy.id ? (
                                <Input
                                    type="text"
                                    value={editingName}
                                    autoFocus
                                    onChange={(e) => setEditingName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                                />
                            ) : (
                                <span className="text-sm text-gray-600">{allergy.name}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            {editingId === allergy.id ? (
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
                                    onClick={() => startEditing(allergy.id, allergy.name)}
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
                ))}
            </CardContent>
        </Card>
    );
}

export default AllergyList;
