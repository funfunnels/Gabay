import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

export function PrayersTab({ prayers, onAddPrayer, onRemovePrayer }) {
  const [formData, setFormData] = React.useState({
    patientName: '',
    motherName: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPrayer({
      ...formData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString()
    });
    setFormData({ patientName: '', motherName: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>הוספת תפילה לרפואה שלמה</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="שם החולה"
              value={formData.patientName}
              onChange={(e) => setFormData({...formData, patientName: e.target.value})}
              required
            />
            <Input
              placeholder="שם האם"
              value={formData.motherName}
              onChange={(e) => setFormData({...formData, motherName: e.target.value})}
              required
            />
            <Button type="submit">הוספה</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>רשימת תפילות</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prayers.map(prayer => (
              <div key={prayer.id} className="flex items-center justify-between p-4 border rounded">
                <span>{prayer.patientName} בן {prayer.motherName}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemovePrayer(prayer.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
