import React, { useEffect, useRef, useState } from 'react';
import { apiGetChartHome } from '../../apis';
import bgChart from '../../assets/bg-chart.jpg';
import bgChart2 from '../../assets/bg-2.jpg';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import _ from 'lodash';
import SongItem from '../../components/SongItem';
import { List, RankList } from '../../components';
import icons from '../../utils/icons';

const { FaPlay } = icons;
const ZingChart = () => {
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);

  const chartRef = useRef();
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });

  console.log('🚀 ~ ZingChart ~ data:', data);
  console.log('🚀 ~ ZingChart ~ chartData:', chartData);

  useEffect(() => {
    const fetchChartData = async () => {
      const res = await apiGetChartHome();
      if (res.data.err === 0) setChartData(res.data.data);
    };

    fetchChartData();
  }, []);

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: 'rgba(0,0,0,0.3)', drawTicks: false },
        min: chartData?.RTChart?.chart?.minScore,
        max: chartData?.RTChart?.chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: 'gray' },
        grid: { color: 'transparent' },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!chartRef || !chartRef.current) return;
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0) {
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
              return;
            }
          }
          const counters = [];
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter((item) => +item?.hour % 2 === 0)?.map((item) => item.counter),
              encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i],
            });
          }
          // console.log('🚀 ~ ChartSection ~ counters:', counters);
          const rs = counters.find((i) => i?.data.some((n) => n === +tooltip.body[0]?.lines[0]?.replace(',', '')));
          console.log('🚀 ~ ChartSection ~ rs:', rs);
          setSelected(rs.encodeId);
          const newTooltipData = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY,
          };
          if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData);
        },
      },
    },
    hover: {
      mode: 'dataset',
      intersect: false,
    },
  };

  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times?.filter((item) => +item?.hour % 2 === 0)?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chartData?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter((item) => +item?.hour % 2 === 0)?.map((item) => item.counter),
          borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: 'white',
          pointHoverRadius: 4,
          pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          pointHoverBorderWidth: 4,
        });
      }
      setData({ labels, datasets });
    }
  }, [chartData]);
  // console.log(Object.entries(chartData?.weekChart));
  return (
    <div className="">
      <div className="flex flex-col">
        <div className="relative">
          <img src={bgChart} alt="bg-chart" className="w-full h-[500px] object-cover grayscale" />
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(206,217,217,0.9)]"></div>
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-t from-[#CED9D9] to-transparent"></div>
          <div className="absolute top-0 left-0 bottom-1/2 right-0 flex gap-4 items-center px-[60px] ">
            <h3 className="font-bold text-[40px] text-chart">#Zingchart</h3>
            <span className="p-3 rounded-full bg-white hover:opacity-80">
              <FaPlay size={20} />
            </span>
          </div>
          <div className="absolute top-1/3 left-0 bottom-0 right-0 px-[60px]">
            {data && <Line ref={chartRef} data={data} options={options} />}
            <div className="tooltip" style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute' }}>
              <SongItem
                thumbnail={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.thumbnail}
                title={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.title}
                artistsNames={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.artistsNames}
                sid={chartData?.RTChart?.items?.find((i) => i.encodeId === selected)?.encodedId}
                style="bg-white"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-[60px] mt-12">
        <RankList data={chartData?.RTChart?.items} number={10} />
      </div>
      <div className="relative">
        <img src={bgChart2} alt="bg-chart" className="w-full h-[650px] object-cover grayscale" />
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(206,217,217,0.9)]"></div>
        <div className="absolute top-0 left-0 bottom-1/2 right-0 px-[60px] mt-8 flex flex-col gap-4">
          <h3 className="font-bold text-[40px] text-main-500">Bảng xếp hạng tuần</h3>
          <div className="flex gap-4 h-fit">
            {chartData?.weekChart &&
              Object.entries(chartData?.weekChart)?.map((item, index) => (
                <div key={index} className="flex-1 rounded-2xl bg-gray-200 px-[10px] py-5">
                  <h3 className="text-[24px] text-main-500 font-bold">{item[0] === 'vn' ? 'Việt Nam' : item[0] === 'us' ? 'US-UK' : item[0] === 'korea' ? 'K-Pop' : ''}</h3>
                  <div className="mt-4 h-fit">
                    <RankList data={item[1]?.items} isHideAlbum={true} number={5} flexArtist={true} link={item[1]?.link} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZingChart;
