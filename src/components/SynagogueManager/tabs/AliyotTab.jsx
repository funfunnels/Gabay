import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select } from '@/components/ui/select';
import { useAliyot } from '../hooks/useAliyot';

export function AliyotTab({ 
  members, 
  aliyot,
  noCohenPresent,
  setNoCohenPresent,
  noLeviPresent,
  setNoLeviPresent,
  onAssignAliyah 
}) {
  const { filterAliyahCandidates } = useAliyot();

  const aliyotTypes = [
    { id: 'openArk', label: 'פתיחת ארון' },
    { id: 'cohen', label: 'כהן' },
    { id: 'levi', label: 'לוי' },
    { id: 'israel', label: 'ישראל' },
    { id: 'hagbaha', label: 'הגבהה' }
  ];

  const getEligibleMembers = (type) => {
    return members.filter(member => 
      filterAliyahCandidates(type, member, noCohenPresent, noLeviPresent)
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>הגדרות</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>אין כהן</span>
              <Switch 
                checked={noCohenPresent}
                onCheckedChange={setNoCohenPresent}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>אין לוי</span>
              <Switch 
                checked={noLeviPresent}
                onCheckedChange={setNoLeviPresent}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {aliyotTypes.map(({ id, label }) => (
        <Card key={id}>
          <CardHeader>
            <CardTitle>{label}</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={aliyot[id]?.id || ''}
              onValueChange={(value) => onAssignAliyah(id, value)}
              options={getEligibleMembers(id).map(member => ({
                value: member.id,
                label: `${member.name} בן ${member.fatherName} ${
                  member.isBirthday ? '🎂' : ''
                }${member.hasPregnantWife ? '👶' : ''}`
              }))}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
