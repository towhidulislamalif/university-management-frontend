import { NavLink } from 'react-router-dom';
import { IItems } from '../types';

export const generateSidebar = (items: IItems[], role: string) => {
  const sidebar = items.reduce((acc: any, item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name!,
        label: item.name,
        children: item.children.map((child) => {
          // console.log('🚀 ~ children:item.children.map ~ child:', child);
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);
  return sidebar;
};
