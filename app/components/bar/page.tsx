"use client"
import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';

export default function Bar(props: any) {
  const container = useRef(null);
  const chart = useRef(null);

  useEffect(() => {    
    if (!chart.current && Object.keys(props.data).length > 0) {
      chart.current = renderBarChart(container.current) as any; // Add 'as any' to allow assignment
    }
  }, []);
  

  function renderBarChart(container: any) {
    const chart = new Chart({
      container,
      autoFit: true,
      });
    
    // 声明可视化
    chart
      .interval() // 创建一个 Interval 标记
      .data(props.data) // 绑定数据
      .encode('x', props.x) // 编码 x 通道
      .encode('y', props.y) // 编码 y 通道
      .encode('key', props.x) // 指定 key
      .animate('update', { duration: 300 }); // 指定更新动画的时间
  
    // 渲染可视化
    chart.render();
    return chart;
  }

  return (
    <div className="App">
      <div ref={container}></div>
    </div>
  );
}