import React, { Component } from 'react';
import { connect } from 'react-redux';
import { curveBasis } from '@vx/curve';
import { withScreenSize } from '@vx/responsive';
import { transpose } from 'd3-array';
import { Spring } from 'react-spring';
import { Stack } from '@vx/shape';
import { PatternCircles, PatternWaves, PatternLines } from '@vx/pattern';
import { scaleLinear, scaleOrdinal } from '@vx/scale';
import { GradientPurpleTeal,
        GradientOrangeRed,
        GradientPinkBlue,
        GradientPurpleOrange,
        GradientLightgreenGreen,
        GradientDarkgreenGreen,
        GradientPinkRed,
        GradientSteelPurple,
        GradientTealBlue,
        LinearGradient } from '@vx/gradient';

const mapStateToProps = state => ({
    state
});

const containerStyles = {
    width: 1000,
    height: 500,
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
let darkGreenGreen = <GradientDarkgreenGreen id="darkGreenGreen"/>
let pinkRed = <GradientPinkRed id="pinkRed"/>
let steelPurple = <GradientSteelPurple id="steelPurple"/>
let tealBlue = <GradientTealBlue id="tealBlue"/>

let colors = [`url(#purpleTeal)`,
 `url(#darkGreenGreen)`,
  `url(#orangeRed)`,
   `url(#pinkBlue)`,
    `url(#steelPurple)`,
    `url(#purpleOrange)`,
    `url(#pinkRed)`,
     `url(#lightGreenGreen)`,
    `url(#tealBlue)`];


const patternScale = scaleOrdinal({
    domain: keys,
    range: ['mustard', 'cherry', 'navy', 'transparent', 'transparent', 'transparent', 'transparent']
})

const Graph = ({ data, xScale, yScale, zScale }) => (
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

class ColorGraph extends Component {

    constructor(props) {
        super(props);
        this.state = { toggle: true }
        this.interval;
        this.colorIndex = 0;
    }

    componentDidMount() {
    }

    updateTempo(tempo, colorIndex) {
        if (tempo) {
            clearInterval(this.interval);
            this.interval = setInterval(this.updateGraph, tempo);
        }

    }

    componentWillReceiveProps(nextProps) {
        this.updateTempo(60000 / nextProps.state.synthInterface.interfaceMasterControl.tempo)
        return true;
    }

    updateGraph = () => {
        this.setState({ toggle: !this.state.toggle });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

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
            domain: [-100, 50]
        })
        // console.log(this.props.state.synthInterface.synth1.chord.colorNum)
        const zScale = scaleOrdinal({
            domain: keys,
            range: [colors[synth1.chord.colorNum]]
        });
        // 
        let NewColorGraph;

        // if any of the synth modules' looping is undefined or false, don't show the graph.
        // On page load and after all synth's have stopped looping it should be blank.
        if (synth1.looping === undefined && synth2.looping === undefined && synth3.looping === undefined) {
            NewColorGraph = <svg width={width - 15} height={height}>
                <g>
                    <rect x={0} y={0} width={width} height={height} fill="#262226" />
                    <Graph data={data} xScale={xScale} yScale={yScale} zScale={zScale} />
                </g>
            </svg>
        } else if (synth1.looping === false && synth2.looping === false && synth3.looping === false){
            NewColorGraph = <svg width={width - 15} height={height}>
                <g>
                    <rect x={0} y={0} width={width} height={height} fill="#262226" />
                    <Graph data={data} xScale={xScale} yScale={yScale} zScale={zScale} />
                </g>
            </svg>
        }else {
            NewColorGraph = <svg width={width - 15} height={height}>
                <GradientPurpleTeal id="purpleTeal" />
                <GradientOrangeRed id="orangeRed" />
                <GradientPinkBlue id="pinkBlue" />
                <GradientPurpleOrange id="purpleOrange" />
                <GradientLightgreenGreen id="lightGreenGreen" />
                <GradientDarkgreenGreen id="darkGreenGreen"/>
                <GradientPinkRed id="pinkRed"/>
                <GradientSteelPurple id="steelPurple"/>
                <GradientTealBlue id="tealBlue"/>
                <PatternLines id="mustard" height={40} width={40} radius={5} stroke={`url(#orangeRed)`} strokeWidth={1} complement orientation={['diagonal']} />
                <PatternWaves id="cherry" height={12} width={12} fill={`url(#pinkBlue)`} stroke="#ffffff" complement />
                <PatternWaves id="navy" height={60} width={60} fill={`url(#purpleOrange)`} stroke={`url(#lightGreenGreen)`} complement />
                <PatternLines id="transparent" height={60} width={60} size={10} stroke="transparent" strokeWidth={1} complement />
                <g>
                    <rect x={0} y={0} width={width} height={height} fill="#262226" />
                    <Graph data={data} xScale={xScale} yScale={yScale} zScale={zScale} />
                </g>
            </svg>
        }

        return (
            <div style={{ ...containerStyles }}>
                {NewColorGraph}
            </div>
        )
    }
}

// Change ColorGraph to ColorStream, which will be our exported Component that contains everything in here to
// use in ColorDisplay
const ColorStream = withScreenSize(ColorGraph);
export default connect(mapStateToProps)(ColorStream);