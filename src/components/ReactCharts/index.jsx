
/**
 * @module com
 */

/** 
 * @description 图表
 * @export ReactEcharts
 * @param {object} value 数据
 * @param {function} onChange 函数
 * @param {arrry} TypeSource 时间类型
 * @param {function} callback 变动回调
 * @return 组件
 * @example <ReactEcharts />
 */

import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/tooltip';
import 'echarts';

import 'echarts/lib/chart/line';

export default class ReactEcharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '100%',
      height: '100%',
    };
    this.chart = null;
  }

  async componentDidMount() {
    // 初始化图表
    await this.initChart(this.el);
    // 将传入的配置(包含数据)注入
    this.setOption(this.props.option);
    // 监听屏幕缩放，重新绘制 echart 图表
  }

  componentDidUpdate() {
    // 每次更新组件都重置
    this.setOption(this.props.option);
  }

  componentWillUnmount() {
    // 组件卸载前卸载图表
    this.dispose();
  }

  initChart = el => {
    // renderer 用于配置渲染方式 可以是 svg 或者 canvas
    const renderer = this.props.renderer || 'canvas';

    return new Promise(resolve => {
      setTimeout(() => {
        this.chart = echarts.init(el, null, {
          renderer,
          width: 'auto',
          height: 'auto',
        });
        resolve();
      }, 0);
    });
  };

  setOption = option => {
    if (!this.chart) {
      return;
    }

    const { notMerge } = this.props;
    const { lazyUpdate } = this.props;

    this.chart.setOption(option, notMerge, lazyUpdate);
  };

  dispose = () => {
    if (!this.chart) {
      return;
    }

    this.chart.dispose();
    this.chart = null;
  };

  resize = () => {
    this.chart && this.chart.resize();
  };

  getInstance = () => {
    return this.chart;
  };

  render() {
    const { width, height } = this.state;

    return (
      <div
        className="default-chart"
        // eslint-disable-next-line no-return-assign
        ref={el => (this.el = el)}
        style={{ width, height }}
      />
    );
  }
}
