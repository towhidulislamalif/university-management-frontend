import React from 'react';

export interface IItems {
  name?: string;
  path?: string;
  element?: React.ReactNode;
  children?: IItems[];
}

export interface IRoutes {
  path: string;
  element: React.ReactNode;
}

export type ISidebar = {
  key: string;
  label: React.ReactNode;
  children?: Sidebar[];
};

interface Sidebar {
  key: string;
  label: React.ReactNode;
}
