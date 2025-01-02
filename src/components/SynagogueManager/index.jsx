import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardTab } from './tabs/DashboardTab';
import { AliyotTab } from './tabs/AliyotTab';
import { MembersTab } from './tabs/MembersTab';
import { PrayersTab } from './tabs/PrayersTab';
import { Calendar, Users, Heart, Bell } from 'lucide-react';
import { useSynagogueData } from './hooks/useSynagogueData';

function SynagogueManager() {
  const {
    activeTab,
    setActiveTab,
    members,
    aliyot,
    prayers,
    handleAddMember,
    handleAddPrayer,
    assignAliyah,
    noCohenPresent,
    setNoCohenPresent,
    noLeviPresent,
    setNoLeviPresent
  } = useSynagogueData();

  return (
    <div className="rtl p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">
            <Bell className="ml-2" />
            לוח בקרה
          </TabsTrigger>
          <TabsTrigger value="aliyot">
            <Calendar className="ml-2" />
            עליות
          </TabsTrigger>
          <TabsTrigger value="members">
            <Users className="ml-2" />
            מתפללים
          </TabsTrigger>
          <TabsTrigger value="prayers">
            <Heart className="ml-2" />
            תפילות
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <DashboardTab members={members} prayers={prayers} />
        </TabsContent>

        <TabsContent value="aliyot">
          <AliyotTab 
            members={members}
            aliyot={aliyot}
            noCohenPresent={noCohenPresent}
            setNoCohenPresent={setNoCohenPresent}
            noLeviPresent={noLeviPresent}
            setNoLeviPresent={setNoLeviPresent}
            onAssignAliyah={assignAliyah}
          />
        </TabsContent>

        <TabsContent value="members">
          <MembersTab 
            members={members}
            onAddMember={handleAddMember}
          />
        </TabsContent>

        <TabsContent value="prayers">
          <PrayersTab 
            prayers={prayers}
            onAddPrayer={handleAddPrayer}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SynagogueManager;
