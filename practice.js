/* 
routes:
 [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'create-admin',
        element: <CreateAdmin />,
      },
      {
        path: 'create-teacher',
        element: <CreateTeacher />,
      },
      {
        path: 'create-student',
        element: <CreateStudent />,
      },
    ],

      const admin_path = [
{
  name: 'Dashboard',
path: 'dashboard',
element: 'Navbar'
},
{
  name: 'Dashboard',
children: [
  {
    name: 'Create Admin',
path: 'create-admin',
element: 'Navbar'
  },
  {
    name: 'Create Teacher',
path: 'create-teacher',
element: 'Navbar'
  },
  {
    name: 'Create Student',
path: 'create-student',
element: 'Navbar'
  }
]
}
      ]

sidebar:
[
  {
    key: '123',
    label: 'Dashboard',
  },
  {
    key: '456',
    label: 'User Management',
    children: [
      {
        key: '444',
        label: 'Create Admin',
      },
      {
        key: '555',
        label: 'Create Teacher',
      },
      {
        key: '666',
        label: 'Create Student',
      },
    ],
  },
];
*/
const admin_path = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: 'Navbar',
  },
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: 'Navbar',
  },
  // {
  //   name: 'User Management',
  //   children: [
  //     {
  //       name: 'Create Admin',
  //       path: 'create-admin',
  //       element: 'Navbar',
  //     },
  //     {
  //       name: 'Create Teacher',
  //       path: 'create-teacher',
  //       element: 'Navbar',
  //     },
  //     {
  //       name: 'Create Student',
  //       path: 'create-student',
  //       element: 'Navbar',
  //     },
  //   ],
  // },
];
const routes = admin_path.reduce((acc, item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }
  if (item.children) {
    item.children.forEach((child) => {
      acc.push({ path: child.path, element: child.element });
    });
  }
  return acc;
}, []);

const sidebar = admin_path.reduce((acc, item) => {
  if (item.name && item.path) {
    acc.push({
      key: item.name,
      label: item.name,
    });
  }

  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => {
        return {
          key: child.name,
          label: child.name,
        };
      }),
    });
  }

  return acc;
}, []);

console.log(routes);
console.log('sidebar', JSON.stringify(sidebar));
