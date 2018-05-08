import React, { Component } from 'react';
import { connect } from 'react-redux';
import { curveBasis } from '@vx/curve';
import { withScreenSize } from '@vx/responsive';
import { transpose } from 'd3-array';
import { Spring } from 'react-spring';
import { Stack } from '@vx/shape';
import { PatternCircles, PatternWaves, PatternLines } from '@vx/pattern';
import { scaleLinear, scaleOrdinal } from '@vx/scale';
import { GradientPurpleTeal, GradientOrangeRed, GradientPinkBlue, GradientPurpleOrange, GradientLightgreenGreen } from '@vx/gradient';

const mapStateToProps = state => ({
    state
});

const containerStyles = {
    width: 800,
    height: 100,
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

let purpleTeal = <GradientPurpleTeal id="purpleTeal" />
let orangeRed = <GradientOrangeRed id="orangeRed" />
let pinkBlue = <GradientPinkBlue id="pinkBlue" />
let purpleOrange = <GradientPurpleOrange id="purpleOrange" />
let lightGreenGreen = <GradientLightgreenGreen id="lightGreenGreen" />


const zScale = scaleOrdinal({
    domain: keys,
    range: [`url(#purpleTeal)`, `url(#orangeRed)`, `url(#pinkBlue)`, `url(#purpleOrange)`, `url(#lightGreenGreen)`]
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
        let synth1 = this.props.state.synthInterface.synth1
        let synth2 = this.props.state.synthInterface.synth2
        let synth3 = this.props.state.synthInterface.synth3

        const { screenWidth: width, screenHeight: height } = this.props

        const data = transpose(keys.map(d => bumps(samplesPerLayer, bumpsPerLayer)))

        const xScale = scaleLinear({
            range: [0, width],
            domain: [0, samplesPerLayer - 1]
        })
        const yScale = scaleLinear({
            range: [height, 0],
            domain: [-300, 50]
        })

        return (
            <div style={{ ...containerStyles }} onClick={this.toggle}>
                <svg width={width - 15} height={height}>
                <GradientPurpleTeal id="purpleTeal" />
                <GradientOrangeRed id="orangeRed" />
                <GradientPinkBlue id="pinkBlue" />
                <GradientPurpleOrange id="purpleOrange" />
                <GradientLightgreenGreen id="lightGreenGreen" />
                <PatternLines id="mustard" height={40} width={40} radius={5} stroke={`url(#orangeRed)`} strokeWidth={1} complement orientation={['diagonal']} />
                <PatternWaves id="cherry" height={12} width={12} fill={`url(#pinkBlue)`} stroke="#ffffff" complement />
                <PatternCircles id="navy" height={60} width={60} radius={10} fill={`url(#purpleOrange)`} complement />
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