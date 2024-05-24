import React, { memo } from 'react';
import icons from '../utils/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';

const { BsMusicNoteBeamed } = icons;
const List = ({ songData }) => {
  // console.log('🚀 ~ List ~ songData:', { songData });

  const dispatch = useDispatch();

  return (
    <div
      className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer"
      onClick={() => {
        dispatch(actions.setCurSongId(songData.encodeId));
        dispatch(actions.play(true));
      }}
    >
      <div className="flex items-center gap-3 flex-1">
        <span>
          <BsMusicNoteBeamed />
        </span>
        <img src={songData?.thumbnail} alt="thumbnail" className="w-10 h-10 object-cover rounded-md" />
        <span className="flex flex-col w-full">
          <span className="text-sm font-semibold">{songData?.title.length > 30 ? `${songData?.title.slice(0, 30)}...` : songData?.title}</span>
          <span>{songData?.artistsNames}</span>
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center">{songData?.album?.title.length > 30 ? `${songData?.album?.title.slice(0, 40)}...` : songData?.album?.title}</div>
      <div className="flex-1 flex justify-end">{moment.utc(songData?.duration * 1000).format('mm:ss')}</div>
    </div>
  );
};

// Vì truyền props nên dùng memo để tránh bị re-render nhiều lần (ở page album truyền props xuống cho lists và list chỉ khi props thay đổi thì mới render lại còn không chỉ mình album render vì 2 thằng con bọc trong memmo)
export default memo(List);
