import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { isToday } from '../utils/dates';

export function DashboardTab({ members, prayers }) {
  const getUpcomingEvents = () => {
    const events = [];
    const today = new Date();

    members.forEach(member => {
      if (isToday(member.birthDate)) {
        events.push({
          type: 'birthday',
          member,
          icon: '🎂'
        });
      }

      if (member.hasPregnantWife && member.expectedDueDate) {
        const dueDate = new Date(member.expectedDueDate);
        const daysUntil = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
        if (daysUntil >= 0 && daysUntil <= 30) {
          events.push({
            type: 'pregnancy',
            member,
            daysUntil,
            icon: '👶'
          });
        }
      }
    });

    return events;
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>אירועים מיוחדים</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getUpcomingEvents().map((event, index) => (
              <Alert key={index}>
                <AlertTitle className="flex items-center gap-2">
                  {event.icon}
                  {event.type === 'birthday' ? 'יום הולדת' : 
                   `לידה צפויה בעוד ${event.daysUntil} ימים`}
                </AlertTitle>
                <p>
                  {event.member.name} בן {event.member.fatherName}
                  {event.member.phone && ` - ${event.member.phone}`}
                </p>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>תפילות לרפואה שלמה</CardTitle>
        </CardHeader>
        <CardContent>
          {prayers.length > 0 && (
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">רשימה מרוכזת:</h3>
              <p>{prayers.map(p => `${p.patientName} בן ${p.motherName}`).join(' • ')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
