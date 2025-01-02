import { useState, useEffect } from 'react';

export function useSynagogueData() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('synagogue_members');
    return saved ? JSON.parse(saved) : [];
  });

  const [aliyot, setAliyot] = useState(() => {
    const saved = localStorage.getItem('synagogue_aliyot');
    return saved ? JSON.parse(saved) : {
      openArk: null,
      cohen: null,
      levi: null,
      israel: null,
      hagbaha: null
    };
  });

  const [prayers, setPrayers] = useState(() => {
    const saved = localStorage.getItem('synagogue_prayers');
    return saved ? JSON.parse(saved) : [];
  });

  const [noCohenPresent, setNoCohenPresent] = useState(false);
  const [noLeviPresent, setNoLeviPresent] = useState(false);

  // LocalStorage Sync
  useEffect(() => {
    localStorage.setItem('synagogue_members', JSON.stringify(members));
    localStorage.setItem('synagogue_aliyot', JSON.stringify(aliyot));
    localStorage.setItem('synagogue_prayers', JSON.stringify(prayers));
  }, [members, aliyot, prayers]);

  return {
    activeTab,
    setActiveTab,
    members,
    setMembers,
    aliyot,
    setAliyot,
    prayers,
    setPrayers,
    noCohenPresent,
    setNoCohenPresent,
    noLeviPresent,
    setNoLeviPresent
  };
}
