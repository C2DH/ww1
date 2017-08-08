import React, { PureComponent } from 'react'
import { defaultMemoize } from 'reselect'
import { isArray, values, max as lmax, range, get } from 'lodash'
import { scaleLinear } from 'd3-scale'
import Dimensions from 'react-dimensions'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './YearsRange.css'

const Range = Slider.Range

class YearsBarsUnwrap extends PureComponent {
  render() {
    const { barHeight, counts, filteredCounts, containerWidth, min, max } = this.props
    const maxCount = lmax(values(counts)) || 0
    const scale = scaleLinear().domain([0, maxCount]).rangeRound([0, barHeight])
    const years = [`<${min}`].concat(range(min, max + 1)).concat(`${max}>`)
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
            >
              {year === (min - 1) && `<<${min}`}
              {year !== (min - 1) && year !== (max + 1) && `${year}`}
              {year === (max + 1) && `${max}>>`}
            </text>
          ))}
        </g>
      </svg>
    )
  }
}
const YearsBars = Dimensions()(YearsBarsUnwrap)

// Living in a life of sbatte...

const maybeArray = fn => (a, ...args) => isArray(a) ? fn(a, ...args) : a

// [1913, 1920] => ['<1913','1919>']
const adjustOutputRangeValue = maybeArray(defaultMemoize((rvalue, min, max) => {
  return rvalue.map(val => {
    if (val === min - 1) {
      return `<${min}`
    } else if (val === max + 2) {
      return `${max + 1}>`
    } else {
      return +val
    }
  })
}))

// ['<1913','1920>'] => [1912, 1921]
const adjustInputRangeValue = maybeArray(defaultMemoize((rvalue, min, max) => {
  return rvalue.map(val => {
    if (typeof val === 'number') {
      return val
    }
    if (val.charAt(0) === '<') {
      return +val.slice(1) - 1
    } else if (val.charAt(val.length - 1)  === '>') {
      return +val.slice(0, -1) + 1
    } else {
      return +val
    }
  })
}))

class YearsRange extends PureComponent {
  onChange = (val) => {
    if (val[0] === val[1]) {
      this.props.onChange(this.adjustOutputValue(this.props.value))
    } else {
      this.props.onChange(this.adjustOutputValue(val))
    }
  }

  adjustInputValue = value =>
    adjustInputRangeValue(value, this.props.min, this.props.max)

  adjustOutputValue = value =>
    adjustOutputRangeValue(value, this.props.min, this.props.max)

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
        <div style={{ marginTop: '-35px' }}>
          <Range
            allowCross={false}
            min={min - 1}
            max={max + 2}
            onChange={this.onChange}
            defaultValue={this.adjustInputValue(defaultValue)}
            value={this.adjustInputValue(value)}
          />
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
