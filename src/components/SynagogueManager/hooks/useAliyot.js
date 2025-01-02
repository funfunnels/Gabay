import { useCallback } from 'react';

export function useAliyot() {
  const filterAliyahCandidates = useCallback((type, member, noCohenPresent, noLeviPresent) => {
    if (type === 'cohen') {
      if (noCohenPresent) {
        return member.type === 'levi' || member.type === 'israel';
      }
      return member.type === 'cohen';
    }
    
    if (type === 'levi') {
      if (noCohenPresent) {
        return member.type === 'israel';
      }
      if (noLeviPresent) {
        return member.type === 'cohen';
      }
      return member.type === 'levi';
    }
    
    return true;
  }, []);

  return { filterAliyahCandidates };
}
