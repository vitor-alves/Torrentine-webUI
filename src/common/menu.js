import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'Status',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: 'Show All',
        path: 'analysis',
      },
      {
        name: 'Downloading',
        path: 'teste1',
      },
      {
        name: 'Seeding',
        path: 'teste2',
      },
      {
        name: 'Completed',
        path: 'teste3',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
      {
        name: 'Resumed',
        path: 'teste4',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
      {
        name: 'Paused',
        path: 'teste5',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
      {
        name: 'Active',
        path: 'teste6',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
      {
        name: 'Inactive',
        path: 'teste7',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
      {
        name: 'Error',
        path: 'teste8',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: 'Trackers',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: 'Show All',
        path: 'teste9',
      },
      {
        name: 'leechers-paradise.org',
        path: 'teste10',
      },
      {
        name: 'openbittorrent.com',
        path: 'teste11',
      },
      {
        name: 'opentrackr.org',
        authority: 'admin',
        path: '12',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
