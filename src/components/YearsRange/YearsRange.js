import React, { PureComponent } from 'react'
import { values, max as lmax, range, get } from 'lodash'
import { scaleLinear } from 'd3-scale'
import Dimensions from 'react-dimensions'
import Slider from 'rc-slider'
import './YearsRange.css'

const Range = Slider.Range

class YearsBarsUnwrap extends PureComponent {
  render() {
    const { barHeight, counts, filteredCounts, containerWidth, min, max } = this.props
    const maxCount = lmax(values(counts)) || 0
    const scale = scaleLinear().domain([0, maxCount]).range([0, barHeight])
    const years = range(min, max + 1)
    const barWidth = containerWidth / years.length

    return (
      <svg style={{ height: barHeight + 30, width: '100%', userSelect: 'none' }}>
        <g>
          {years.map((year, i) => {
            const height = scale(get(counts, year, 0))
            return (
              <rect className="YearsBar__Bar--count" key={year} x={i * barWidth} width={barWidth} y={barHeight - height} height={height} />
            )
          })}
        </g>
        <g>
          {years.map((year, i) => {
            const height = scale(get(filteredCounts, year, 0))
            return (
              <rect key={year} x={i * barWidth} width={barWidth} y={barHeight - height} height={height}
                className="YearsBar__Bar--count-filtered"
              />
            )
          })}
        </g>
        <g>
          {years.map((year, i) => (
            <text key={year} x={i * barWidth + barWidth / 2} y={barHeight + 22} textAnchor='middle'
            className="YearsBar__Label"
            >{year}</text>
          ))}
        </g>
      </svg>
    )
  }
}
const YearsBars = Dimensions()(YearsBarsUnwrap)


class YearsRange extends PureComponent {
  onChange = (val) => {
    if (val[0] === val[1]) {
      this.props.onChange(this.props.value)
    } else {
      this.props.onChange(val)
    }
  }

  render() {
    const {
      min,
      max,
      defaultValue,
      onChange,
      value,
      counts,
      filteredCounts,
      uncertainYears,
      onUncertainYearsChange,
      uncertainYearsCount,
      barHeight = 80,
    } = this.props

    return (
      <div>
        <div style={{ height: barHeight + 30 }}>
          <YearsBars counts={counts} filteredCounts={filteredCounts} barHeight={barHeight} min={min} max={max} />
        </div>
        <div style={{ marginTop: '-37px' }}>
          <Range allowCross={false} min={min} max={max + 1} defaultValue={defaultValue} onChange={this.onChange} value={value} />
        </div>
        <div style={{ marginTop: '32px' }}>
          <label className="custom-control custom-checkbox align-items-center">
            <input type="checkbox" className="custom-control-input" onChange={() => onUncertainYearsChange(!uncertainYears)} checked={uncertainYears} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description YearsRange__Uncertain">{`Include ${uncertainYearsCount || 0} items with uncertain dates`}</span>
          </label>
        </div>
      </div>
    )
  }
}

export default YearsRange
