import { IItems, IRoutes } from '../types';

export const generateRoutes = (items: IItems[]) => {
  const routes = items.reduce((acc: IRoutes[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    if (item.children) {
      item.children.forEach((child) => {
        acc.push({ path: child.path!, element: child.element });
      });
    }
    return acc;
  }, []);
  return routes;
};
