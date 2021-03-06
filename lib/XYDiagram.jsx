import React from "react"
import ReactDOM from "react-dom"
import interact from "interact.js"


function defaultLabelFunc(value) {
	return `${value}`
}


export default class XYDiagram extends React.PureComponent {
	static displayName = "XYDiagram"

	static propTypes = {
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
		labelFont: React.PropTypes.string,
		labelSize: React.PropTypes.number,
		labelColor: React.PropTypes.string,
		centerText: React.PropTypes.string,
		centerTextFont: React.PropTypes.string,
		centerTextSize: React.PropTypes.number,
		centerTextColor: React.PropTypes.string,

		axisColor: React.PropTypes.string,
		backgroundColor: React.PropTypes.string,

		leftAxisXOffset: React.PropTypes.number,
		rightAxisXOffset: React.PropTypes.number,

		x: React.PropTypes.array.isRequired,
		xStep: React.PropTypes.number,
		xMin: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.func]),
		xMax: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.func]),
		xFactor: React.PropTypes.number,
		xGridOrigin: React.PropTypes.number,
		xGridSpacing: React.PropTypes.number,
		xGridAtPoint: React.PropTypes.bool,
		xGridColor: React.PropTypes.string,
		xLabelOrigin: React.PropTypes.number,
		xLabelSpacing: React.PropTypes.number,
		xLabelAtPoint: React.PropTypes.bool,
		xLabelFunc: React.PropTypes.func,
		xLabelNoOverlapCheck: React.PropTypes.bool, // overlap checks only work from left to right, disable if points are right to left

		y: React.PropTypes.array.isRequired,
		yMin: React.PropTypes.number,
		yMax: React.PropTypes.number,
		yFactor: React.PropTypes.number,
		yValuesPerX: React.PropTypes.number, // show that number of bars per point, y.length == x.length * yValuesPerX
		yColor: React.PropTypes.string,
		yOpacity: React.PropTypes.number,
		yLabelColor: React.PropTypes.string,
		yGridOrigin: React.PropTypes.number,
		yGridSpacing: React.PropTypes.number,
		yGridColor: React.PropTypes.string,
		yLabelOrigin: React.PropTypes.number,
		yLabelSpacing: React.PropTypes.number,
		yLabelFunc: React.PropTypes.func,
		yLabelAtPoint: React.PropTypes.bool,
		yLineWidth: React.PropTypes.number,
		yLineDashes: React.PropTypes.string,
		markerSize: React.PropTypes.number,
		yBars: React.PropTypes.number,
		yAxisTitle: React.PropTypes.string,

		y2: React.PropTypes.array,
		y2Min: React.PropTypes.number,
		y2Max: React.PropTypes.number,
		y2Factor: React.PropTypes.number,
		y2ValuesPerX: React.PropTypes.number, // show that number of bars per point, y2.length == x.length * y2ValuesPerX
		y2Color: React.PropTypes.string,
		y2Opacity: React.PropTypes.number,
		y2LabelColor: React.PropTypes.string,
		y2LabelOrigin: React.PropTypes.number,
		y2LabelSpacing: React.PropTypes.number,
		y2LabelFunc: React.PropTypes.func,
		y2LabelAtPoint: React.PropTypes.bool,
		y2LineWidth: React.PropTypes.number,
		y2LineDashes: React.PropTypes.string,
		markerSize2: React.PropTypes.number,
		y2OnRightAxis: React.PropTypes.bool,
		y2Bars: React.PropTypes.number,
		y2AxisTitle: React.PropTypes.string,

		y3: React.PropTypes.array,
		y3Min: React.PropTypes.number,
		y3Max: React.PropTypes.number,
		y3Factor: React.PropTypes.number,
		y3ValuesPerX: React.PropTypes.number, // show that number of bars per point, y3.length == x.length * y3ValuesPerX
		y3Color: React.PropTypes.string,
		y3Opacity: React.PropTypes.number,
		y3LabelOrigin: React.PropTypes.number,
		y3LabelSpacing: React.PropTypes.number,
		y3LabelFunc: React.PropTypes.func,
		y3LineWidth: React.PropTypes.number,
		y3LineDashes: React.PropTypes.string,
		markerSize3: React.PropTypes.number,
		y3Bars: React.PropTypes.number,

		y4: React.PropTypes.array,
		y4Min: React.PropTypes.number,
		y4Max: React.PropTypes.number,
		y4Factor: React.PropTypes.number,
		y4Color: React.PropTypes.string,
		y4Opacity: React.PropTypes.number,
		y4LabelOrigin: React.PropTypes.number,
		y4LabelSpacing: React.PropTypes.number,
		y4LabelFunc: React.PropTypes.func,
		y4LineWidth: React.PropTypes.number,
		y4LineDashes: React.PropTypes.string,
		markerSize4: React.PropTypes.number,

		bgValues: React.PropTypes.array,
		bgColorFunc: React.PropTypes.func,

		onClickMarker: React.PropTypes.func,
		selectedIndex: React.PropTypes.number,
		selectedMarkerSize: React.PropTypes.number,
		selectedMarkerColor: React.PropTypes.string,
		leftMarkerX: React.PropTypes.number,
		leftMarkerColor: React.PropTypes.string,
		leftMarkerDragged: React.PropTypes.func,
		rightMarkerX: React.PropTypes.number,
		rightMarkerColor: React.PropTypes.string,
		rightMarkerDragged: React.PropTypes.func,
		leftRightMarkerCoverColor: React.PropTypes.string,
		leftRightMarkerCoverOpacity: React.PropTypes.number,
		leftRightMarkerWidth: React.PropTypes.number,

		extraPointsX: React.PropTypes.array,
		extraPointsY: React.PropTypes.array,
		extraPointsSize: React.PropTypes.number,
		extraPointsColor: React.PropTypes.string,
	}

	static defaultProps = {
		labelFont: `"Lucida Console", Monaco, monospace`,
		labelSize: 16,
		labelColor: "#000",
		centerText: "",
		centerTextFont: `"Lucida Console", Monaco, monospace`,
		centerTextSize: 48,
		centerTextColor: "#000",
		axisColor: "#000",
		backgroundColor: "#FFF",

		xStep: 1,
		xMin: 0,
		xMax: 1,
		xFactor: 1,
		xGridOrigin: 0,
		xGridAtPoint: false,
		xGridColor: "#AAA",
		xLabelOrigin: 0,
		xLabelAtPoint: false,
		xLabelFunc: defaultLabelFunc,
		xLabelNoOverlapCheck: false,

		yMin: 0,
		yMax: 1,
		yFactor: 1,
		yValuesPerX: 1,
		yColor: "#0082C8",
		yOpacity: 1,
		yGridOrigin: 0,
		yGridColor: "#AAA",
		yLabelOrigin: 0,
		yLabelFunc: defaultLabelFunc,
		yLabelAtPoint: false,
		yLineWidth: 1,
		markerSize: 0,
		yBars: 0,

		y2Min: 0,
		y2Max: 1,
		y2Factor: 1,
		y2ValuesPerX: 1,
		y2Color: "#92D050",
		y2Opacity: 1,
		y2LabelOrigin: 0,
		y2LabelFunc: defaultLabelFunc,
		y2LabelAtPoint: false,
		y2LineWidth: 1,
		markerSize2: 0,
		y2OnRightAxis: false,
		y2Bars: 0,

		y3Min: 0,
		y3Max: 1,
		y3Factor: 1,
		y3ValuesPerX: 1,
		y3Color: "#FF00FF",
		y3Opacity: 1,
		y3LabelOrigin: 0,
		y3LabelFunc: defaultLabelFunc,
		y3LineWidth: 1,
		markerSize3: 0,
		y3Bars: 0,

		y4Min: 0,
		y4Max: 1,
		y4Factor: 1,
		y4Color: "#647280",
		y4Opacity: 1,
		y4LabelOrigin: 0,
		y4LabelFunc: defaultLabelFunc,
		y4LineWidth: 1,
		markerSize4: 0,

		selectedIndex: -1,
		selectedMarkerSize: 0,
		selectedMarkerColor: "#0082C8",
		leftMarkerX: NaN,
		leftMarkerColor: "#11F",
		rightMarkerX: NaN,
		rightMarkerColor: "#11F",
		leftRightMarkerCoverColor: "#666",
		leftRightMarkerCoverOpacity: 0.5,
		leftRightMarkerWidth: 16,

		extraPointsSize: 5,
		extraPointsColor: "#F00",
	}

	static shiftArray(a, val) {
		a.copyWithin(0, 1)
		a[a.length - 1] = val
	}

	static rotateArray(a) {
		XYDiagram.shiftArray(a, a[0])
	}

	static calcTextWidth(text, labelSize) {
		return text.length * labelSize * 0.6
	}

	static calcLeftAxisXOffset(yMin, yMax, yAxisTitle = null, yLabelFunc = defaultLabelFunc, labelSize = XYDiagram.defaultProps.labelSize) {
		const textHeight = labelSize * 1.2
		const minLabel = yLabelFunc(yMin, yMin, yMax)
		const maxLabel = yLabelFunc(yMax, yMin, yMax)
		let textWidth = Math.max(XYDiagram.calcTextWidth(minLabel, labelSize), XYDiagram.calcTextWidth(maxLabel, labelSize))
		if (yAxisTitle) {
			textWidth = Math.max(textWidth, XYDiagram.calcTextWidth(yAxisTitle, labelSize) * 0.5)
		}
		return textHeight * 0.2 + textWidth
	}

	static calcRightAxisXOffset(y2Min, y2Max, y2AxisTitle = null, y2LabelFunc = defaultLabelFunc, labelSize = XYDiagram.defaultProps.labelSize) {
		const textHeight = labelSize * 1.2
		const minLabel = y2LabelFunc(y2Min, y2Min, y2Max)
		const maxLabel = y2LabelFunc(y2Max, y2Min, y2Max)
		let textWidth = Math.max(XYDiagram.calcTextWidth(minLabel, labelSize), XYDiagram.calcTextWidth(maxLabel, labelSize))
		if (y2AxisTitle) {
			textWidth = Math.max(textWidth, XYDiagram.calcTextWidth(y2AxisTitle, labelSize) * 0.5)
		}
		return textHeight * 0.2 + textWidth
	}

	constructor(...args) {
		super(...args)
		this.onClickMarker = this.onClickMarker.bind(this)
	}

	axisXOffset() {
		if (this.props.leftAxisXOffset) {
			return this.props.leftAxisXOffset
		}
		if (!this.hasLeftYLabels()) {
			return 0
		}
		const { yMin, yMax, yAxisTitle, yLabelFunc, labelSize } = this.props
		return XYDiagram.calcLeftAxisXOffset(yMin, yMax, yAxisTitle, yLabelFunc, labelSize)
	}

	rightAxisXOffset() {
		if (this.props.rightAxisXOffset) {
			return this.props.rightAxisXOffset
		}
		if (!this.hasRightYLabels()) {
			return 0
		}
		const { y2Min, y2Max, y2AxisTitle, y2LabelFunc, labelSize } = this.props
		return XYDiagram.calcRightAxisXOffset(y2Min, y2Max, y2AxisTitle, y2LabelFunc, labelSize)
	}

	onClickMarker(event) {
		if (this.props.onClickMarker) {
			const index = parseInt(event.target.getAttribute("data-index"))
			const x = parseFloat(event.target.getAttribute("data-x"))
			const y = parseFloat(event.target.getAttribute("data-y"))
			const selected = event.target.hasAttribute("data-selected")
			this.props.onClickMarker(index, x, y, selected)
		}
	}

	makeDraggable(group, marker, onDragged) {
		const parent = ReactDOM.findDOMNode(this.refs.parent)
		group = ReactDOM.findDOMNode(group)
		marker = ReactDOM.findDOMNode(marker)
		interact(marker)
			.draggable({
				startAxis: "x",
				lockAxis: "x",
				preventDefault: "always",
				restrict: {
					restriction: parent,
					elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
				}
			})
			.on("dragstart", (event) => {
				event.preventDefault()
				// Only way to change the class of an SVG element:
				marker.setAttribute("class", "dragging")
			})
			.on("dragmove", (event) => {
				const dx = event.clientX - event.clientX0
				group.setAttribute("transform", `translate(${dx})`)
			})
			.on("dragend", (event) => {
				// Only way to change the class of an SVG element:
				marker.removeAttribute("class")
				group.removeAttribute("transform")
				if (onDragged) {
					const clientX = event.clientX - parent.getBoundingClientRect().left

					const { xFactor } = this.props
					const xMin = this.xMin()
					const xMax = this.xMax()
					const leftMarkerVisible = this.isLeftMarkerVisible()
					const xOffset = leftMarkerVisible ? this.props.leftRightMarkerWidth : 0
					const axisXOffset = this.axisXOffset()
					const rangeWidth = this.rangeWidth()
					const xRange = xMax - xMin
					const xScale = rangeWidth / xRange
					// axisXOffset + xOffset + (x*xFactor - xMin) * xScale = clientX
					// (x*xFactor - xMin) * xScale = clientX - axisXOffset - xOffset
					// x*xFactor - xMin = (clientX - axisXOffset - xOffset) / xScale
					// x*xFactor = (clientX - axisXOffset - xOffset) / xScale + xMin
					const x = ((clientX - axisXOffset - xOffset) / xScale + xMin) / xFactor
					onDragged(x, clientX)
				}
			})
	}

	componentDidMount() {
		this.makeDraggable(this.refs.leftMarkerGroup, this.refs.leftMarker, this.props.leftMarkerDragged)
		this.makeDraggable(this.refs.rightMarkerGroup, this.refs.rightMarker, this.props.rightMarkerDragged)
	}

	isLeftMarkerVisible() {
		return !isNaN(this.props.leftMarkerX) && this.props.leftMarkerX !== this.props.rightMarkerX
	}

	isRightMarkerVisible() {
		return !isNaN(this.props.rightMarkerX) && this.props.leftMarkerX !== this.props.rightMarkerX
	}

	hasXLabels() {
		return !!this.props.xLabelSpacing || this.props.xLabelAtPoint
	}

	hasLeftYLabels() {
		return !!this.props.yLabelSpacing && !this.props.y2OnRightAxis
	}

	hasRightYLabels() {
		return !!this.props.y2LabelSpacing || (!!this.props.yLabelSpacing && this.props.y2OnRightAxis)
	}

	rangeWidth() {
		let rangeWidth = this.props.width - this.axisXOffset() - this.rightAxisXOffset()
		rangeWidth -= this.isLeftMarkerVisible() ? this.props.leftRightMarkerWidth : 0
		rangeWidth -= this.isRightMarkerVisible() ? this.props.leftRightMarkerWidth : 0
		return rangeWidth
	}

	xMin() {
		const { xMin } = this.props
		return (typeof xMin === "function") ? xMin(this.axisXOffset()) : xMin
	}

	xMax() {
		const { xMax } = this.props
		return (typeof xMax === "function") ? xMax(this.rightAxisXOffset()) : xMax
	}

	textWidth(text) {
		return text.length * this.props.labelSize * 0.6
	}

	render() {
		////////////////////////////////////////////////////////////////////////////////
		// Set constants to work with:

		const leftMarkerVisible = this.isLeftMarkerVisible()
		const rightMarkerVisible = this.isRightMarkerVisible()

		const { labelFont, labelSize, labelColor, xLabelOrigin, xLabelSpacing, xLabelAtPoint, yLabelAtPoint, xLabelFunc, xLabelNoOverlapCheck, xStep } = this.props
		const { yLabelOrigin, yLabelSpacing, yLabelFunc, yColor, yOpacity, markerSize, yAxisTitle } = this.props
		const { y2LabelOrigin, y2LabelSpacing, y2LabelFunc, y2LabelAtPoint, y2Color, y2Opacity, markerSize2, y2AxisTitle } = this.props
		const { y3Color, y3Opacity, markerSize3 } = this.props
		const { y4Color, y4Opacity, markerSize4 } = this.props

		const yLabelColor = this.props.yLabelColor || yColor
		const y2LabelColor = this.props.y2LabelColor || y2Color

		const textHeight = labelSize * 1.2
		const hasXLabels = this.hasXLabels()
		const hasLeftYLabels = this.hasLeftYLabels()
		const hasRightYLabels = this.hasRightYLabels()
		const hasYLabels = hasLeftYLabels || hasRightYLabels

		const { xFactor, width, height, selectedIndex } = this.props
		const { yMin, yMax, yFactor, yBars } = this.props
		const { y2Min, y2Max, y2Factor, y2Bars } = this.props
		const { y3Min, y3Max, y3Factor, y3Bars } = this.props
		const { y4Min, y4Max, y4Factor } = this.props
		const { xGridOrigin, xGridSpacing, xGridAtPoint, xGridColor, yGridOrigin, yGridSpacing, yGridColor, backgroundColor } = this.props
		const { yValuesPerX, y2ValuesPerX, y3ValuesPerX } = this.props

		const xOffset = leftMarkerVisible ? this.props.leftRightMarkerWidth : 0
		const axisXOffset = this.axisXOffset()
		const axisXOffsetFixed = axisXOffset.toFixed()
		const rightAxisXOffset = this.rightAxisXOffset()
		const rightAxisX = width - rightAxisXOffset
		const rightAxisXFixed = rightAxisX.toFixed(1)
		const axisYOffset = hasXLabels ? textHeight : (hasYLabels ? textHeight * 0.5 : 0)
		const axisYOffsetFixed = axisYOffset.toFixed(1)

		const rangeWidth = this.rangeWidth()
		let rangeTop = height - textHeight * 0.5
		let rangeHeight = height - axisYOffset - textHeight * 0.5
		if (yAxisTitle || y2AxisTitle) {
			rangeTop -= textHeight
			rangeHeight -= textHeight
		}

		const xMin = this.xMin()
		const xMax = this.xMax()

		const xRange = xMax - xMin
		const yRange = yMax - yMin
		const y2Range = y2Max - y2Min
		const y3Range = y3Max - y3Min
		const y4Range = y4Max - y4Min

		const xScale = rangeWidth / xRange
		const yScale = rangeHeight / yRange
		const y2Scale = rangeHeight / y2Range
		const y3Scale = rangeHeight / y3Range
		const y4Scale = rangeHeight / y4Range

		////////////////////////////////////////////////////////////////////////////////
		// Transform x/y values to graphics coordinates:

		function transformX(x) {
			return axisXOffset + xOffset + (x*xFactor - xMin) * xScale
		}

		function transformY(y) {
			return axisYOffset + (y*yFactor - yMin) * yScale
		}

		function transformY2(y2) {
			return axisYOffset + (y2*y2Factor - y2Min) * y2Scale
		}

		function transformY3(y3) {
			return axisYOffset + (y3*y3Factor - y3Min) * y3Scale
		}

		function transformY4(y4) {
			return axisYOffset + (y4*y4Factor - y4Min) * y4Scale
		}

		////////////////////////////////////////////////////////////////////////////////
		// Axis lines:

		let axisPoints = `${axisXOffsetFixed},${rangeTop} ${axisXOffsetFixed},${axisYOffsetFixed} ${rightAxisX},${axisYOffsetFixed}`
		if (hasRightYLabels) {
			axisPoints += ` ${rightAxisXFixed},${rangeTop}`
		}

		////////////////////////////////////////////////////////////////////////////////
		// Grid lines:

		let xGridLinesD = ""
		let yGridLinesD = ""
		if (xGridAtPoint) {
			for (const x of this.props.x) {
				if (x >= xMin && x <= xMax) {
					const tx = transformX(x).toFixed(1)
					xGridLinesD += `M${tx} ${axisYOffsetFixed}V${rangeTop}`
				}
			}
		} else if (xGridSpacing) {
			const start = xGridOrigin !== 0 ? xGridOrigin : Math.ceil(xMin / xGridSpacing) * xGridSpacing
			for (let x = start; x <= xMax; x += xGridSpacing) {
				if (x >= xMin) {
					const tx = transformX(x).toFixed(1)
					xGridLinesD += `M${tx} ${axisYOffsetFixed}V${rangeTop}`
				}
			}
		}
		if (yGridSpacing) {
			const start = yGridOrigin !== 0 ? yGridOrigin : Math.ceil(yMin / yGridSpacing) * yGridSpacing
			for (let y = start; y <= yMax; y += yGridSpacing) {
				if (y >= yMin) {
					const ty = transformY(y).toFixed(1)
					yGridLinesD += `M${axisXOffsetFixed} ${ty}H${rightAxisXFixed}`
				}
			}
		}
		let gridLines = null
		if (xGridLinesD.length > 0 || yGridLinesD.length > 0) {
			if (xGridColor === yGridColor) {
				gridLines = <path d={xGridLinesD + yGridLinesD} stroke={xGridColor} strokeWidth="1"/>
			} else {
				gridLines = [
					<path key="xGrid" d={xGridLinesD} stroke={xGridColor} strokeWidth="1"/>,
					<path key="yGrid" d={yGridLinesD} stroke={yGridColor} strokeWidth="1"/>,
				]
			}
		}

		////////////////////////////////////////////////////////////////////////////////
		// Labels:

		const numYPoints = Math.min(this.props.x.length, this.props.y.length / yValuesPerX)

		const labels = []
		if (hasXLabels) {
			let ticksD = ""
			let lastTextRightX = -Number.MAX_VALUE

			const addXLabel = x => {
				if (x < xMin || x > xMax) {
					return
				}

				const tx = transformX(x)
				const txFixed = tx.toFixed(1)
				ticksD += `M${txFixed} ${(axisYOffset - textHeight*0.2).toFixed(1)}V${axisYOffset}`
				const text = xLabelFunc(x, xMin, xMax)
				const halfWidth = this.textWidth(text) * 0.5
				if (xLabelNoOverlapCheck || (tx - halfWidth > lastTextRightX)) {
					lastTextRightX = tx + halfWidth
					labels.push(
						<text
							key={"xlt" + x}
							x={txFixed}
							y={(-textHeight*0.1).toFixed(1)}
							transform="scale(1,-1)"
							textAnchor="middle"
							fill={labelColor}
						>
							{text}
						</text>
					)
				}
			}

			if (xLabelAtPoint) {
				for (const x of this.props.x) {
					addXLabel(x)
				}
			} else {
				for (let x = xLabelOrigin !== 0 ? xLabelOrigin : Math.ceil(xMin / xLabelSpacing) * xLabelSpacing; x <= xMax; x += xLabelSpacing) {
					addXLabel(x)
				}
			}

			labels.push(<path key="xll" d={ticksD} stroke={labelColor} strokeWidth="1"/>)
		}

		if (yLabelAtPoint) {
			const labelYOffset = labelSize * -0.5

			for (let i = 0; i < numYPoints; i += xStep) {
				const x = this.props.x[i]
				const y = this.props.y[i * yValuesPerX]
				if (!Number.isFinite(x) || !Number.isFinite(y) || x < xMin || x > xMax) {
					continue
				}

				const tx = transformX(x)
				const txFixed = tx.toFixed(1)
				const ty = transformY(y)

				const text = yLabelFunc(y, yMin, yMax)
				labels.push(
					<text
						key={"ylap" + i}
						x={txFixed}
						y={(labelYOffset - ty).toFixed(1)}
						transform="scale(1,-1)"
						textAnchor="middle"
						fill={yColor}
					>
						{text}
					</text>
				)
			}
		}

		if (y2LabelAtPoint) {
			const labelYOffset = labelSize * -0.5

			for (let i = 0; i < numYPoints; i += xStep) {
				const x = this.props.x[i]
				const y2 = this.props.y2[i * y2ValuesPerX]
				if (!Number.isFinite(x) || !Number.isFinite(y2) || x < xMin || x > xMax) {
					continue
				}

				const tx = transformX(x)
				const txFixed = tx.toFixed(1)
				const ty2 = transformY2(y2)

				const text = y2LabelFunc(y2, y2Min, y2Max)
				labels.push(
					<text
						key={"y2lap" + i}
						x={txFixed}
						y={(labelYOffset - ty2).toFixed(1)}
						transform="scale(1,-1)"
						textAnchor="middle"
						fill={y2Color}
					>
						{text}
					</text>
				)
			}
		}

		if (hasLeftYLabels) {
			let ticksD = ""
			const tickX = (axisXOffset - textHeight * 0.2).toFixed(1)
			const labelYOffset = labelSize * 0.3
			const start = yLabelOrigin !== 0 ? yLabelOrigin : Math.ceil(yMin / yLabelSpacing) * yLabelSpacing
			for (let y = start; y <= yMax; y += yLabelSpacing) {
				if (y >= yMin) {
					const ty = transformY(y)
					ticksD += `M${tickX} ${ty.toFixed(1)}H${axisXOffsetFixed}`
					labels.push(
						<text
							key={"ylt" + y}
							x={tickX}
							y={(labelYOffset - ty).toFixed(1)}
							transform="scale(1,-1)"
							textAnchor="end"
							fill={yLabelColor}
						>
							{yLabelFunc(y, yMin, yMax)}
						</text>
					)
				}
			}

			labels.push(<path key="yll" d={ticksD} stroke={yLabelColor} strokeWidth="1"/>)
		}
		if (hasRightYLabels) {
			let ticksD = ""
			const tickX = (rightAxisX + textHeight * 0.2).toFixed(1)
			const labelYOffset = labelSize * 0.3
			const start = y2LabelOrigin !== 0 ? y2LabelOrigin : Math.ceil(y2Min / y2LabelSpacing) * y2LabelSpacing
			for (let y2 = start; y2 <= y2Max; y2 += y2LabelSpacing) {
				if (y2 >= y2Min) {
					const ty2 = transformY2(y2)
					ticksD += `M${rightAxisXFixed} ${ty2.toFixed(1)}H${tickX}`
					labels.push(
						<text
							key={"y2lt" + y2}
							x={tickX}
							y={(labelYOffset - ty2).toFixed(1)}
							transform="scale(1,-1)"
							fill={y2LabelColor}
						>
							{y2LabelFunc(y2, y2Min, y2Max)}
						</text>
					)
				}
			}

			labels.push(<path key="y2ll" d={ticksD} stroke={y2LabelColor} strokeWidth="1"/>)
		}

		if (yAxisTitle) {
			labels.push(
				<text
					key="yAxisTitle"
					x={axisXOffset.toFixed(1)}
					y={(-rangeTop - labelSize).toFixed(1)}
					textAnchor="middle"
					transform="scale(1,-1)"
					fill={yColor}
				>
					{yAxisTitle}
				</text>
			)
		}

		if (y2AxisTitle) {
			labels.push(
				<text
					key="y2AxisTitle"
					x={rightAxisX.toFixed(1)}
					y={(-rangeTop - labelSize).toFixed(1)}
					textAnchor="middle"
					transform="scale(1,-1)"
					fill={y2LabelColor}
				>
					{y2AxisTitle}
				</text>
			)
		}

		////////////////////////////////////////////////////////////////////////////////
		// y data series graphics:

		const bars = []

		let yPoints = ""
		if (yBars) {
			// draw y values as bars
			const barWidth = yBars / yValuesPerX;
			const yZero = transformY(0)
			let moveLeft
			if (!y2Bars && !y3Bars) {
				moveLeft = yBars * 0.5
			} else if (y2Bars && y3Bars) {
				moveLeft = yBars + y2Bars * 0.5
			} else {
				moveLeft = yBars
			}
			for (let i = 0; i < numYPoints; i += xStep) {
				for (let j = 0; j < yValuesPerX; j++) {
					let x = this.props.x[i]
					let y = this.props.y[i * yValuesPerX + j]
					if (Number.isFinite(x) && Number.isFinite(y)) {
						x = transformX(x) - moveLeft + (j * barWidth)
						y = transformY(y)
						let h = y - yZero
						if (h < 0) {
							h = -h
						} else {
							y = yZero
						}
						let key = "yBar" + i
						if (j > 0) {
							key += "_" + j
						}
						bars.push(<rect key={key} x={x.toFixed(1)} y={y.toFixed(1)} width={barWidth} height={h.toFixed(1)} stroke="none" fill={yColor} fillOpacity={yOpacity}/>)
					}
				}
			}
		} else {
			// draw y values as line-strip
			for (let i = 0; i < numYPoints; i += xStep) {
				const x = this.props.x[i]
				const y = this.props.y[i * yValuesPerX]
				if (Number.isFinite(x) && Number.isFinite(y)) {
					yPoints += `${transformX(x).toFixed(1)},${transformY(y).toFixed(1)} `
				}
			}
			if (xStep > 1) {
				// if we are stepping over values, make sure to add the last one
				const i = numYPoints - 1
				const x = this.props.x[i]
				const y = this.props.y[i * yValuesPerX]
				if (Number.isFinite(x) && Number.isFinite(y)) {
					yPoints += `${transformX(x).toFixed(1)},${transformY(y).toFixed(1)} `
				}
			}
		}

		let selectedMarker = null
		const hasSelectedMarker = !!this.props.selectedMarkerSize && selectedIndex >= 0 && selectedIndex < numYPoints
		if (hasSelectedMarker) {
			const i = selectedIndex
			const x = this.props.x[i]
			const y = this.props.y[i * yValuesPerX]
			if (Number.isFinite(x) && Number.isFinite(y)) {
				selectedMarker = (
					<circle
						cx={transformX(x).toFixed(1)}
						cy={transformY(y).toFixed(1)}
						r={this.props.selectedMarkerSize * 0.5}
						stroke="none"
						fill={this.props.selectedMarkerColor}
						onClick={this.props.onClickMarker ? this.onClickMarker : null}
						data-index={i}
						data-x={x}
						data-y={y}
						data-selected
					/>
				)
			}
		}

		////////////////////////////////////////////////////////////////////////////////
		// y2 data series graphics:

		let numY2Points = 0
		let y2Points = ""
		if (this.props.y2) {
			numY2Points = Math.min(this.props.x.length, this.props.y2.length / y2ValuesPerX)
			if (y2Bars) {
				const barWidth = y2Bars / y2ValuesPerX;
				const y2Zero = transformY2(0)
				let moveLeft
				if (yBars && !y3Bars) {
					moveLeft = 0
				} else if (!yBars && y3Bars) {
					moveLeft = y2Bars
				} else {
					moveLeft = y2Bars * 0.5
				}
				for (let i = 0; i < numY2Points; i += xStep) {
					for (let j = 0; j < y2ValuesPerX; j++) {
						let x = this.props.x[i]
						let y2 = this.props.y2[i * y2ValuesPerX + j]
						if (Number.isFinite(x) && Number.isFinite(y2)) {
							x = transformX(x) - moveLeft + (j * barWidth)
							y2 = transformY2(y2)
							let h = y2 - y2Zero
							if (h < 0) {
								h = -h
							} else {
								y2 = y2Zero
							}
							let key = "y2Bar" + i
							if (j > 0) {
								key += "_" + j
							}
							bars.push(<rect key={key} x={x.toFixed(1)} y={y2.toFixed(1)} width={barWidth} height={h.toFixed(1)} stroke="none" fill={y2Color} fillOpacity={y2Opacity}/>)
						}
					}
				}
			} else {
				for (let i = 0; i < numY2Points; i += xStep) {
					const x = this.props.x[i]
					const y2 = this.props.y2[i * y2ValuesPerX]
					if (Number.isFinite(x) && Number.isFinite(y2)) {
						y2Points += ` ${transformX(x).toFixed(1)},${transformY2(y2).toFixed(1)}`
					}
				}
				if (xStep > 1) {
					const i = numY2Points - 1
					const x = this.props.x[i]
					const y2 = this.props.y2[i * y2ValuesPerX]
					if (Number.isFinite(x) && Number.isFinite(y2)) {
						y2Points += ` ${transformX(x).toFixed(1)},${transformY2(y2).toFixed(1)}`
					}
				}
			}
		}

		////////////////////////////////////////////////////////////////////////////////
		// y3 data series graphics:

		let numY3Points = 0
		let y3Points = ""
		if (this.props.y3) {
			numY3Points = Math.min(this.props.x.length, this.props.y3.length / y3ValuesPerX)
			if (y3Bars) {
				const barWidth = y3Bars / y3ValuesPerX;
				const y3Zero = transformY3(0)
				let moveLeft
				if (!yBars && !y3Bars) {
					moveLeft = y3Bars * 0.5
				} else if (yBars && y3Bars) {
					moveLeft = y2Bars * -0.5
				} else {
					moveLeft = 0
				}
				for (let i = 0; i < numY3Points; i += xStep) {
					for (let j = 0; j < y3ValuesPerX; j++) {
						let x = this.props.x[i]
						let y3 = this.props.y3[i * y3ValuesPerX + j]
						if (Number.isFinite(x) && Number.isFinite(y3)) {
							x = transformX(x) - moveLeft + (j * barWidth)
							y3 = transformY3(y3)
							let h = y3 - y3Zero
							if (h < 0) {
								h = -h
							} else {
								y3 = y3Zero
							}
							let key = "y3Bar" + i
							if (j > 0) {
								key += "_" + j
							}
							bars.push(<rect key={key} x={x.toFixed(1)} y={y3.toFixed(1)} width={barWidth} height={h.toFixed(1)} stroke="none" fill={y3Color} fillOpacity={y3Opacity}/>)
						}
					}
				}
			} else {
				for (let i = 0; i < numY3Points; i += xStep) {
					const x = this.props.x[i]
					const y3 = this.props.y3[i * y3ValuesPerX]
					if (Number.isFinite(x) && Number.isFinite(y3)) {
						y3Points += ` ${transformX(x).toFixed(1)},${transformY3(y3).toFixed(1)}`
					}
				}
				if (xStep > 1) {
					const i = numY3Points - 1
					const x = this.props.x[i]
					const y3 = this.props.y3[i * y3ValuesPerX]
					if (Number.isFinite(x) && Number.isFinite(y3)) {
						y3Points += ` ${transformX(x).toFixed(1)},${transformY3(y3).toFixed(1)}`
					}
				}
			}
		}

		////////////////////////////////////////////////////////////////////////////////
		// y4 data series graphics:

		let numY4Points = 0
		let y4Points = ""
		if (this.props.y4) {
			numY4Points = Math.min(this.props.x.length, this.props.y4.length)
			for (let i = 0; i < numY4Points; i += xStep) {
				const x = this.props.x[i]
				const y4 = this.props.y4[i]
				if (Number.isFinite(x) && Number.isFinite(y4)) {
					y4Points += ` ${transformX(x).toFixed(1)},${transformY4(y4).toFixed(1)}`
				}
			}
			if (xStep > 1) {
				const i = numY4Points - 1
				const x = this.props.x[i]
				const y4 = this.props.y4[i]
				if (Number.isFinite(x) && Number.isFinite(y4)) {
					y4Points += ` ${transformX(x).toFixed(1)},${transformY4(y4).toFixed(1)}`
				}
			}
		}

		////////////////////////////////////////////////////////////////////////////////
		// Markers for data series points:

		const markers = []
		if (markerSize > 0) {
			const r = markerSize * 0.5
			const onClick = this.props.onClickMarker ? this.onClickMarker : null
			for (let i = 0; i < numYPoints; i += xStep) {
				const x = this.props.x[i]
				const y = this.props.y[i * yValuesPerX]
				if (Number.isFinite(x) && Number.isFinite(y) && !(hasSelectedMarker && i === selectedIndex)) {
					markers.push(
						<circle
							key={"marker_" + i}
							cx={transformX(x).toFixed(1)}
							cy={transformY(y).toFixed(1)}
							r={r}
							stroke="none"
							fill={yColor}
							onClick={onClick}
							data-index={i}
							data-x={x}
							data-y={y}
						/>
					)
				}
			}
		}
		if (markerSize2 > 0) {
			const r = markerSize2 * 0.5
			for (let i = 0; i < numY2Points; i += xStep) {
				const x = this.props.x[i]
				const y = this.props.y2[i * y2ValuesPerX]
				if (Number.isFinite(x) && Number.isFinite(y)) {
					markers.push(
						<circle
							key={"marker2_" + i}
							cx={transformX(x).toFixed(1)}
							cy={transformY2(y).toFixed(1)}
							r={r}
							stroke="none"
							fill={y2Color}
						/>
					)
				}
			}
		}
		if (markerSize3 > 0) {
			const r = markerSize3 * 0.5
			for (let i = 0; i < numY3Points; i += xStep) {
				const x = this.props.x[i]
				const y = this.props.y3[i * y3ValuesPerX]
				if (Number.isFinite(x) && Number.isFinite(y)) {
					markers.push(
						<circle
							key={"marker3_" + i}
							cx={transformX(x).toFixed(1)}
							cy={transformY3(y).toFixed(1)}
							r={r}
							stroke="none"
							fill={y3Color}
						/>
					)
				}
			}
		}
		if (markerSize4 > 0) {
			const r = markerSize4 * 0.5
			for (let i = 0; i < numY4Points; i += xStep) {
				const x = this.props.x[i]
				const y = this.props.y4[i]
				if (Number.isFinite(x) && Number.isFinite(y)) {
					markers.push(
						<circle
							key={"marker4_" + i}
							cx={transformX(x).toFixed(1)}
							cy={transformY4(y).toFixed(1)}
							r={r}
							stroke="none"
							fill={y4Color}
						/>
					)
				}
			}
		}
		const { extraPointsX, extraPointsY, extraPointsSize, extraPointsColor } = this.props
		if (extraPointsX && extraPointsY && extraPointsSize > 0) {
			const r = extraPointsSize * 0.5
			const count = Math.min(extraPointsX.length, extraPointsY.length)
			for (let i = 0; i < count; i++) {
				const x = extraPointsX[i]
				const y = extraPointsY[i]
				if (Number.isFinite(x) && Number.isFinite(y)) {
					markers.push(
						<circle
							key={"extraPoints_" + i}
							cx={transformX(x).toFixed(1)}
							cy={transformY(y).toFixed(1)}
							r={r}
							stroke="none"
							fill={extraPointsColor}
						/>
					)
				}
			}
		}

		////////////////////////////////////////////////////////////////////////////////
		// Draw background color based on data series:

		const bg = []
		if (this.props.bgValues && this.props.bgValues.length > 0 && this.props.bgColorFunc) {
			const numPoints = Math.min(this.props.x.length, this.props.bgValues.length)
			if (numPoints >= 2) {
				let lastX = transformX(this.props.x[0])
				let lastB = this.props.bgValues[0]
				for (let i = 1; i < numPoints; i += xStep) {
					const b = this.props.bgValues[i]
					if (b !== lastB) {
						const x = (transformX(this.props.x[i-1]) + transformX(this.props.x[i])) * 0.5
						const width = x - lastX
						bg.push(<rect key={"bg" + (i-1)} stroke="none" fill={this.props.bgColorFunc(lastB)} x={lastX.toFixed(1)} y={axisYOffsetFixed} width={width.toFixed(1)} height={rangeHeight.toFixed(1)}/>)
						lastX = x
						lastB = b
					}
				}
				const i = numPoints - 1
				const x = transformX(this.props.x[i])
				const width = x - lastX
				bg.push(<rect key={"bg" + i} stroke="none" fill={this.props.bgColorFunc(lastB)} x={lastX.toFixed(1)} y={axisYOffsetFixed} width={width.toFixed(1)} height={rangeHeight.toFixed(1)}/>)
			}
		}

		////////////////////////////////////////////////////////////////////////////////
		// X range markers left and right:

		// TODO draw markers only when active,
		// but initialize drag interactions when activated after component was mounted

		let leftMarkerX = 0
		let leftMarkerHeight = 0
		if (leftMarkerVisible) {
			leftMarkerX = transformX(this.props.leftMarkerX)
			leftMarkerHeight = rangeHeight
		}

		let rightMarkerX = 0
		let rightMarkerHeight = 0
		if (rightMarkerVisible) {
			rightMarkerX = transformX(this.props.rightMarkerX)
			rightMarkerHeight = rangeHeight
		}

		////////////////////////////////////////////////////////////////////////////////
		// Text in diagram center:

		const centerText = this.props.centerText.length === 0 ? null : (
			<text
				x={width * 0.5}
				y={height * 0.5}
				textAnchor="middle"
				fontFamily={this.props.centerTextFont}
				fontSize={this.props.centerTextSize}
				fill={this.props.centerTextColor}
				stroke="none"
			>
				{this.props.centerText}
			</text>
		)

		return (
			<svg ref="parent" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				<defs>
					<linearGradient id="leftMarkerGradient" x1="0%" x2="100%">
						<stop offset="0%" style={{stopColor: this.props.leftMarkerColor, stopOpacity: 0}}/>
						<stop offset="100%" style={{stopColor: this.props.leftMarkerColor, stopOpacity: 1}}/>
					</linearGradient>
					<linearGradient id="rightMarkerGradient" x1="0%" x2="100%">
						<stop offset="0%" style={{stopColor: this.props.rightMarkerColor, stopOpacity: 1}}/>
						<stop offset="100%" style={{stopColor: this.props.rightMarkerColor, stopOpacity: 0}}/>
					</linearGradient>
				</defs>
				{backgroundColor ? <rect fill={backgroundColor} width="100%" height="100%"/> : null}
				{centerText}
				<g transform={`scale(1,-1) translate(0,-${height})`} fontFamily={labelFont} fontSize={labelSize}>
					{bg}
					{gridLines}
					<polyline stroke={this.props.axisColor} strokeWidth="1" fill="none" points={axisPoints}/>
					{labels}
					{bars}
					{y4Points.length > 0 ? <polyline stroke={y4Color} strokeOpacity={y4Opacity} strokeWidth={this.props.y4LineWidth} strokeDasharray={this.props.y4LineDashes} fill="none" points={y4Points}/> : null}
					{y3Points.length > 0 ? <polyline stroke={y3Color} strokeOpacity={y3Opacity} strokeWidth={this.props.y3LineWidth} strokeDasharray={this.props.y3LineDashes} fill="none" points={y3Points}/> : null}
					{y2Points.length > 0 ? <polyline stroke={y2Color} strokeOpacity={y2Opacity} strokeWidth={this.props.y2LineWidth} strokeDasharray={this.props.y2LineDashes} fill="none" points={y2Points}/> : null}
					{yPoints.length > 0 ? <polyline stroke={yColor} strokeOpacity={yOpacity} strokeWidth={this.props.yLineWidth} strokeDasharray={this.props.yLineDashes} fill="none" points={yPoints}/> : null}
					{markers}
					{selectedMarker}
					<g ref="leftMarkerGroup">
						<rect
							ref="leftMarkerCover"
							x={axisXOffsetFixed}
							y={axisYOffsetFixed}
							width={(leftMarkerX - axisXOffset).toFixed(1)}
							height={leftMarkerHeight.toFixed(1)}
							stroke="none"
							fill={this.props.leftRightMarkerCoverColor}
							fillOpacity={this.props.leftRightMarkerCoverOpacity}
						/>
						<rect
							ref="leftMarker"
							x={leftMarkerX-this.props.leftRightMarkerWidth}
							y={axisYOffset}
							width={this.props.leftRightMarkerWidth}
							height={leftMarkerHeight.toFixed(1)}
							stroke="none"
							fill="url(#leftMarkerGradient)"
							style={{touchAction: "none"}}
						/>
					</g>
					<g ref="rightMarkerGroup">
						<rect
							ref="rightMarkerCover"
							x={rightMarkerX.toFixed(1)}
							y={axisYOffset.toFixed(1)}
							width={(rightAxisX - rightMarkerX).toFixed(1)}
							height={rightMarkerHeight.toFixed(1)}
							stroke="none"
							fill={this.props.leftRightMarkerCoverColor}
							fillOpacity={this.props.leftRightMarkerCoverOpacity}
						/>
						<rect
							ref="rightMarker"
							x={rightMarkerX.toFixed(1)}
							y={axisYOffset.toFixed(1)}
							width={this.props.leftRightMarkerWidth}
							height={rightMarkerHeight.toFixed(1)}
							stroke="none"
							fill="url(#rightMarkerGradient)"
							style={{touchAction: "none"}}
						/>
					</g>
				</g>
			</svg>
		)
	}
}
