import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAllergyStore } from '@/store/allergyStore';
import AllergyItem from './AllergyItem';

function AllergyList() {
    const { allergies, addAllergy } = useAllergyStore();
    const [newAllergy, setNewAllergy] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddAllergy = () => {
        const trimmedAllergy = newAllergy.trim();
        if (trimmedAllergy === '') return;

        const isDuplicate = allergies.some(
            (allergy) => allergy.name.toLowerCase() === trimmedAllergy.toLowerCase()
        );

        if (isDuplicate) {
            setErrorMessage('Allergy already exists!');
            return;
        }

        addAllergy({ name: trimmedAllergy, initial: trimmedAllergy.charAt(0).toUpperCase() });
        setNewAllergy('');
        setErrorMessage('');
    };

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
                        onKeyDown={(e) => e.key === 'Enter' && handleAddAllergy()}
                    />
                    <Button onClick={handleAddAllergy}>
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                    </Button>
                </div>
                {allergies.map((allergy) => (
                    <AllergyItem allergy={allergy} key={allergy.id} />
                ))}
            </CardContent>
        </Card>
    );
}

export default AllergyList;
