"use client";
import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";


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
      .data(props.data) // 绑定数据
      .encode("x", props.x) // 编码 x 通道
      .encode("y", props.y) // 编码 y 通道
      .scale("x", {
        range: [0, 1],
      })
      .scale("y", {
        domainMin: 0,
        nice: true,
      });

    chart.line().label({
      text: props.y,
      style: {
        dx: 2,
        dy: -12,
      },
    });

    chart.point().style("fill", "white").tooltip(false);

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
