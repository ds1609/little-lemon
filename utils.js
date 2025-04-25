import { useRef, useEffect } from 'react';

export function getSectionListData(menuItems) {
    const sectionArr = [];
    menuItems.map((item) => {
        sectionArr.push(item.category);
    });
    
    const sections = [...new Set(sectionArr)];
    return sections;
}

export function useUpdateEffect(effect, dependencies = []) {
    const isInitialMount = useRef(true);
  
    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        return effect();
      }
    }, dependencies);
}