import React, { Component } from 'react';
import { connect } from 'react-redux';
import { curveBasis } from '@vx/curve';
import { withScreenSize } from '@vx/responsive';
import { transpose } from 'd3-array';
import { Spring } from 'react-spring';
import { Stack } from '@vx/shape';
import { PatternCircles, PatternWaves, PatternLines, PatternHexagons } from '@vx/pattern';
import { scaleLinear, scaleOrdinal } from '@vx/scale';

const mapStateToProps = state => ({
    state
});

const containerStyles = {
  width: 1000,
  height: 300,
  cursor: 'pointer'
}

const range = n => Array.from(Array(n), (d, i) => i)

const numLayers = 20
const samplesPerLayer = 25
const bumpsPerLayer = 10

const keys = range(numLayers)

function bumps(n, m) {
  var a = [],
    i
  for (i = 0; i < n; ++i) a[i] = 0
  for (i = 0; i < m; ++i) bump(a, n)
  return a
}

function bump(a, n) {
  var x = 1 / (0.1 + Math.random()),
    y = 2 * Math.random() - 0.5,
    z = 10 / (0.1 + Math.random())
  for (var i = 0; i < n; i++) {
    var w = (i / n - y) * z
    a[i] += x * Math.exp(-w * w)
  }
}

const zScale = scaleOrdinal({
  domain: keys,
  range: ['#ff777f', '#580040', '#9cfaff', '#bc5399', '#c84653']
})
const patternScale = scaleOrdinal({
  domain: keys,
  range: ['mustard', 'cherry', 'navy', 'transparent', 'transparent', 'transparent', 'transparent']
})

const Graph = ({ data, xScale, yScale }) => (
  <Stack
    curve={curveBasis}
    data={data}
    keys={keys}
    offset="wiggle"
    x={(d, i) => xScale(i)}
    y0={d => yScale(d[0])}
    y1={d => yScale(d[1])}
    render={({ seriesData, path }) => {
      return seriesData.map((series, i) => {
        const d = path(series)
        return (
          <g key={`series-${series.key}`}>
            <Spring to={{ d }}>
              {tweened => (
                <React.Fragment>
                  <path d={tweened.d} fill={zScale(series.key)} />
                  <path d={tweened.d} fill={`url(#${patternScale(series.key)})`} />
                </React.Fragment>
              )}
            </Spring>
          </g>
        )
      })
    }}
  />
)

class App extends Component {
  state = { toggle: true }
  toggle = () => this.setState(state => ({ toggle: !state.toggle }))
  render() {
    console.log(this.state.props)
    const { screenWidth: width, screenHeight: height } = this.props

    const data = transpose(keys.map(d => bumps(samplesPerLayer, bumpsPerLayer)))

    const xScale = scaleLinear({
      range: [0, width],
      domain: [0, samplesPerLayer - 1]
    })
    const yScale = scaleLinear({
      range: [height, 0],
      domain: [-100, 50]
    })
    let colorgraph;
    
    return (
      <div style={{ ...containerStyles }} onClick={this.toggle}>
        <svg width={width - 15} height={height}>
          <PatternLines id="mustard" height={40} width={40} radius={5} stroke="#9cfaff" strokeWidth={1} complement orientation={['diagonal']} />
          <PatternWaves id="cherry" height={12} width={12} fill="transparent" stroke="#d0ffff" complement />
          <PatternCircles id="navy" height={60} width={60} radius={10} fill="#00f59f" complement />
          <PatternLines id="transparent" height={60} width={60} size={10} stroke="transparent" strokeWidth={1} complement />
          <g onClick={event => this.forceUpdate()} onTouchStart={event => this.forceUpdate()}>
            <rect x={0} y={0} width={width} height={height} fill="#262226" />
            <Graph data={data} xScale={xScale} yScale={yScale} />
          </g>
        </svg>
      </div>
    )
  }
}

const ColorStream = withScreenSize(App);
export default connect(mapStateToProps)(ColorStream);