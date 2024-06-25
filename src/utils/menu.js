import icons from './icons';

const { MdOutlineLibraryMusic, IoDiscOutline, MdOutlineFeed, TbChartArcs, TbDeviceHeartMonitor } = icons;
export const sidebarMenu = [
  {
    path: 'mymusic',
    text: 'Thư viện',
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
    path: 'radio',
    text: 'Radio',
    icons: <TbDeviceHeartMonitor size={24} />,
  },
];

export const searchMenu = [
  {
    path: 'tat-ca',
    text: 'TẤT CẢ',
  },
  {
    path: 'bai-hat',
    text: 'BÀI HÁT',
  },
  {
    path: 'playlist',
    text: 'PLAYLIST/ALBUM',
  },
  // {
  //   path: 'follow',
  //   text: 'Theo dõi',
  //   icons: <TbDeviceHeartMonitor size={24} />,
  // },
];
