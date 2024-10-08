import React, { useEffect, useState } from 'react';
import icons from '../utils/icons';
import { useSelector } from 'react-redux';
import SongItem from './SongItem';
import { apiGetDetailPlaylist } from '../apis';
import { Scrollbars } from 'react-custom-scrollbars-2';

const { TbTrashX } = icons;
const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } = useSelector((state) => state.music);

  const fetchDetailPlaylist = async () => {
    const res = await apiGetDetailPlaylist(curAlbumId);

    if (res.data?.err === 0) setPlaylist(res?.data?.data?.song?.items);
  };

  useEffect(() => {
    curAlbumId && fetchDetailPlaylist();
  }, []);

  useEffect(() => {
    if (curAlbumId && isPlaying) fetchDetailPlaylist();
  }, [curAlbumId, isPlaying]);

  useEffect(() => {
    isPlaying && setIsRecent(false);
  }, [isPlaying, curSongId]);

  return (
    <div className="flex flex-col text-xs w-full h-full">
      <div className="h-[70px] w-full flex-none gap-8 py-[14px] px-2 flex items-center justify-between">
        <div className="flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer">
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`py-[5px] ${!isRecent && 'bg-main-100'} flex justify-center items-center rounded-l-full rounded-r-full flex-1`}
          >
            Danh sách phát
          </span>
          <span
            onClick={() => setIsRecent((prev) => !prev)}
            className={`py-[5px] ${isRecent && 'bg-main-100'} flex justify-center items-center rounded-l-full rounded-r-full flex-1`}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="p-2 rounded-full cursor-pointer hover:bg-main-100">
          <TbTrashX size={16} />
        </span>
      </div>
      {isRecent ? (
        <div className="w-full flex-col flex-auto flex px-2">
          <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
            {recentSongs && (
              <div className="flex flex-col">
                {recentSongs?.map((item) => (
                  <SongItem key={item?.sid} thumbnail={item?.thumbnail} artistsNames={item?.artistsNames} title={item?.title} sid={item?.sid} size="w-[40px] h-[40px]" />
                ))}
              </div>
            )}
          </Scrollbars>
        </div>
      ) : (
        <div className="w-full flex-col flex-auto flex px-2">
          <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
            {curSongId && (
              <SongItem
                thumbnail={curSongData?.thumbnail}
                artistsNames={curSongData?.artistsNames}
                title={curSongData?.title}
                sid={curSongData?.encodeId}
                size="w-[40px] h-[40px]"
                style="bg-main-500 text-white"
              />
            )}

            <div className="flex flex-col text-black pt-[15px] px-2 pb-[5px]">
              <span className="text-sm font-bold">Tiếp theo</span>
              <span className="opacity-70 text-xs flex gap-1">
                <span>Từ playlist</span>
                <span className="font-semibold text-main-500">
                  {curSongData?.album?.title.length > 30 ? `${curSongData?.album?.title?.slice(0, 30)}...` : curSongData?.album?.title}
                </span>
              </span>
            </div>
            {playlist && (
              <div className="flex flex-col">
                {playlist?.map((item) => (
                  <SongItem key={item?.encodeId} thumbnail={item?.thumbnail} artistsNames={item?.artistsNames} title={item?.title} sid={item?.encodeId} size="w-[40px] h-[40px]" />
                ))}
              </div>
            )}
          </Scrollbars>
        </div>
      )}
      <div className="w-full h-[90px]"></div>
    </div>
  );
};

export default SidebarRight;
