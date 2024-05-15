import icons from './icons';

const { MdOutlineLibraryMusic, IoDiscOutline, MdOutlineFeed, TbChartArcs, TbDeviceHeartMonitor } = icons;
export const sidebarMenu = [
  {
    path: 'mymusic',
    text: 'Cá nhân',
    icons: <MdOutlineLibraryMusic size={24} />,
  },
  {
    path: '',
    text: 'Khám phá',
    end: true,
    icons: <IoDiscOutline size={24} />,
  },
  {
    path: 'zing-chart',
    text: '#zingchart',
    icons: <TbChartArcs size={24} />,
  },
  {
    path: 'follow',
    text: 'Theo dõi',
    icons: <TbDeviceHeartMonitor size={24} />,
  },
];
