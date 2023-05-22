import { BreedSvg, FactSvg, HomeSvg } from '@svg/index';
import { DOCS_URL, GITHUB_URL } from '@constants/index';
import { BiCctv } from 'react-icons/bi';
import { MdNotifications } from 'react-icons/md';

const bottomNavigation: cat.BottomNavigation = [
  {
    id: 1,
    label: 'Home',
    href: '/',
    icon: <HomeSvg className='w-6 h-6' />,
  },
  {
    id: 2,
    label: 'Track',
    href: '/facts',
    icon: <BiCctv className={`h-6 w-6`} />,
  },
  {
    id: 3,
    label: 'Notifications',
    href: '/breeds',
    icon: <MdNotifications className={`h-6 w-6`} />,
  },
];

const navBar: cat.Navbar = [
  { id: 1, label: 'Docs', href: DOCS_URL, external: true },
  { id: 2, label: 'Github', href: GITHUB_URL, external: true },
  { id: 3, label: 'Facts', href: '/facts', external: false },
  { id: 4, label: 'Breeds', href: '/breeds', external: false },
];

export { bottomNavigation, navBar };
