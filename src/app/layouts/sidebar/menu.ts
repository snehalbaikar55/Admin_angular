import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'home',
        link: 'dashboard',
    },
    {
        id: 3,
        label: 'Users',
        icon: 'grid',
        subItems: [
            {
                id: 4,
                label: 'Add User',
                link: '/adduser',
                parentId: 3
            },
            {
                id: 5,
                label: 'Manage Users',
                link: '/manageusers',
                parentId: 3
            }
        ]
    },
    {
        id: 6,
        label: 'Developer',
        icon: 'grid',
        subItems: [
            {
                id: 7,
                label: 'Add new developer',
                link: '/adddeveloper',
                parentId: 6
            },
            {
                id: 8,
                label: 'Manage Developers',
                link: '/managedeveloper',
                parentId: 6
            },
        ]
    },
    {
        id: 9,
        label: 'New Property',
        icon: 'grid',
        subItems: [
            {
                id: 10,
                label: 'Add new property',
                link: '/addproperty',
                parentId: 9
            },
            {
                id: 11,
                label: 'Manage Properties',
                link: '/manageproperties',
                parentId: 9
            },
        ]
    },
    {
        id: 12,
        label: 'Settings',
        icon: 'grid',
        subItems: [
            {
                id: 13,
                label: 'Manage Region',
                link: '/manage_region',
                parentId: 9
            },
            {
                id: 14,
                label: 'Manage Sub-Region',
                link: '/manage_sub_region',
                parentId: 9
            },
            {
                id: 15,
                label: 'Developers Property',
                link: '/devproperty',
                parentId: 9
            },
        ]
    },
    {
        id: 16,
        label: 'Leads',
        icon: 'grid',
        subItems: [
            {
                id: 17,
                label: 'All Leads',
                link: '/manageleads',
                parentId: 12
            }
        ]
    },

    {
        id: 18,
        label: 'Logs',
        icon: 'grid',
        subItems: [
            {
                id: 19,
                label: 'All Logs',
                link: '/managelogs',
                parentId: 14
            }
        ]
    },

];

