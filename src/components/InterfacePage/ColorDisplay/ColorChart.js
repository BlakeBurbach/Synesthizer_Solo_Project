import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AreaClosed } from '@vx/shape';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { appleStock } from '@vx/mock-data';
import { extent, max } from 'd3-array';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';

const mapStateToProps = state => ({
    state
});


class ColorChart extends Component {

    render() {
        console.log(this.props.state.synthInterface);
        // let synth1 = this.props.state.synthInterface.synth1.map((synth1)=>{
        //     return (<synth1 />)
        // })
        const data = appleStock;

        const width = 1260;
        const height = 300;

        const margin = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        };
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        const x = d => new Date(d.date); // d.date is unix timestamps
        const y = d => d.close;

        data.map(y); // gives an array of all the y values

        const xScale = scaleTime({
            range: [0, xMax],
            domain: extent(data, x)
        });

        const yScale = scaleLinear({
            range: [yMax, 0],
            domain: [0, max(data, y)],
        });

        const chart = (
            <svg width={width} height={height}>
                <Group top={margin.top} left={margin.left}>
                    <LinearGradient
                        from='#fbc2eb'
                        to='#a6c1ee'
                        id='gradient'
                    />
                    <AreaClosed
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        x={x}
                        y={y}
                        fill={"url(#gradient)"}
                        stroke={""}
                    />
                </Group>
            </svg>
        )
        return (
            <div>
                {chart}
            </div>
        )
    }
}

// export default connect(mapStateToProps)(ColorChart);