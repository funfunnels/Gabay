import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

export function MembersTab({ members, onAddMember }) {
  const [formData, setFormData] = React.useState({
    name: '',
    fatherName: '',
    type: 'israel',
    phone: '',
    birthDate: '',
    isRegular: true,
    hasPregnantWife: false,
    expectedDueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMember({
      ...formData,
      id: Date.now().toString()
    });
    setFormData({
      name: '',
      fatherName: '',
      type: 'israel',
      phone: '',
      birthDate: '',
      isRegular: true,
      hasPregnantWife: false,
      expectedDueDate: ''
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>הוספת מתפלל חדש</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="שם פרטי"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <Input
              placeholder="שם האב"
              value={formData.fatherName}
              onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
              required
            />
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => setFormData({...formData, type: value})}
            >
              <div className="flex space-x-4">
                <RadioGroupItem value="cohen" label="כהן" />
                <RadioGroupItem value="levi" label="לוי" />
                <RadioGroupItem value="israel" label="ישראל" />
              </div>
            </RadioGroup>
            <Input
              type="tel"
              placeholder="טלפון"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <Input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
            />
            <div className="flex items-center justify-between">
              <span>מתפלל קבוע</span>
              <Switch
                checked={formData.isRegular}
                onCheckedChange={(checked) => setFormData({...formData, isRegular: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>אשתו בהריון</span>
              <Switch
                checked={formData.hasPregnantWife}
                onCheckedChange={(checked) => setFormData({...formData, hasPregnantWife: checked})}
              />
            </div>
            {formData.hasPregnantWife && (
              <Input
                type="date"
                placeholder="תאריך לידה משוער"
                value={formData.expectedDueDate}
                onChange={(e) => setFormData({...formData, expectedDueDate: e.target.value})}
              />
            )}
            <Button type="submit">הוספה</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>רשימת מתפללים</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map(member => (
              <div key={member.id} className="p-4 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">
                      {member.name} בן {member.fatherName}
                      {member.isBirthday && ' 🎂'}
                      {member.hasPregnantWife && ' 👶'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {member.type} • {member.isRegular ? 'קבוע' : 'אורח'}
                    </p>
                  </div>
                  {member.phone && (
                    <a href={`tel:${member.phone}`} className="text-blue-500">
                      {member.phone}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
