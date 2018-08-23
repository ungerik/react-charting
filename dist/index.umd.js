(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "react", "react-dom", "interact.js"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("react"), require("react-dom"), require("interact.js"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.react, global.reactDom, global.interact);
		global.XYDiagram = mod.exports;
	}
})(this, function (exports, _react, _reactDom, _interact) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _interact2 = _interopRequireDefault(_interact);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	function defaultLabelFunc(value) {
		return "" + value;
	}

	var XYDiagram = function (_React$PureComponent) {
		_inherits(XYDiagram, _React$PureComponent);

		_createClass(XYDiagram, null, [{
			key: "shiftArray",
			value: function shiftArray(a, val) {
				a.copyWithin(0, 1);
				a[a.length - 1] = val;
			}
		}, {
			key: "rotateArray",
			value: function rotateArray(a) {
				XYDiagram.shiftArray(a, a[0]);
			}
		}, {
			key: "calcTextWidth",
			value: function calcTextWidth(text, labelSize) {
				return text.length * labelSize * 0.6;
			}
		}, {
			key: "calcLeftAxisXOffset",
			value: function calcLeftAxisXOffset(yMin, yMax) {
				var yAxisTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var yLabelFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultLabelFunc;
				var labelSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : XYDiagram.defaultProps.labelSize;

				var textHeight = labelSize * 1.2;
				var minLabel = yLabelFunc(yMin, yMin, yMax);
				var maxLabel = yLabelFunc(yMax, yMin, yMax);
				var textWidth = Math.max(XYDiagram.calcTextWidth(minLabel, labelSize), XYDiagram.calcTextWidth(maxLabel, labelSize));
				if (yAxisTitle) {
					textWidth = Math.max(textWidth, XYDiagram.calcTextWidth(yAxisTitle, labelSize) * 0.5);
				}
				return textHeight * 0.2 + textWidth;
			}
		}, {
			key: "calcRightAxisXOffset",
			value: function calcRightAxisXOffset(y2Min, y2Max) {
				var y2AxisTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var y2LabelFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultLabelFunc;
				var labelSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : XYDiagram.defaultProps.labelSize;

				var textHeight = labelSize * 1.2;
				var minLabel = y2LabelFunc(y2Min, y2Min, y2Max);
				var maxLabel = y2LabelFunc(y2Max, y2Min, y2Max);
				var textWidth = Math.max(XYDiagram.calcTextWidth(minLabel, labelSize), XYDiagram.calcTextWidth(maxLabel, labelSize));
				if (y2AxisTitle) {
					textWidth = Math.max(textWidth, XYDiagram.calcTextWidth(y2AxisTitle, labelSize) * 0.5);
				}
				return textHeight * 0.2 + textWidth;
			}
		}]);

		function XYDiagram() {
			var _ref;

			_classCallCheck(this, XYDiagram);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (_ref = XYDiagram.__proto__ || Object.getPrototypeOf(XYDiagram)).call.apply(_ref, [this].concat(args)));

			_this.onClickMarker = _this.onClickMarker.bind(_this);
			return _this;
		}

		_createClass(XYDiagram, [{
			key: "axisXOffset",
			value: function axisXOffset() {
				if (this.props.leftAxisXOffset) {
					return this.props.leftAxisXOffset;
				}
				if (!this.hasLeftYLabels()) {
					return 0;
				}
				var _props = this.props,
				    yMin = _props.yMin,
				    yMax = _props.yMax,
				    yAxisTitle = _props.yAxisTitle,
				    yLabelFunc = _props.yLabelFunc,
				    labelSize = _props.labelSize;

				return XYDiagram.calcLeftAxisXOffset(yMin, yMax, yAxisTitle, yLabelFunc, labelSize);
			}
		}, {
			key: "rightAxisXOffset",
			value: function rightAxisXOffset() {
				if (this.props.rightAxisXOffset) {
					return this.props.rightAxisXOffset;
				}
				if (!this.hasRightYLabels()) {
					return 0;
				}
				var _props2 = this.props,
				    y2Min = _props2.y2Min,
				    y2Max = _props2.y2Max,
				    y2AxisTitle = _props2.y2AxisTitle,
				    y2LabelFunc = _props2.y2LabelFunc,
				    labelSize = _props2.labelSize;

				return XYDiagram.calcRightAxisXOffset(y2Min, y2Max, y2AxisTitle, y2LabelFunc, labelSize);
			}
		}, {
			key: "onClickMarker",
			value: function onClickMarker(event) {
				if (this.props.onClickMarker) {
					var index = parseInt(event.target.getAttribute("data-index"));
					var x = parseFloat(event.target.getAttribute("data-x"));
					var y = parseFloat(event.target.getAttribute("data-y"));
					var selected = event.target.hasAttribute("data-selected");
					this.props.onClickMarker(index, x, y, selected);
				}
			}
		}, {
			key: "makeDraggable",
			value: function makeDraggable(group, marker, onDragged) {
				var _this2 = this;

				var parent = _reactDom2.default.findDOMNode(this.refs.parent);
				group = _reactDom2.default.findDOMNode(group);
				marker = _reactDom2.default.findDOMNode(marker);
				(0, _interact2.default)(marker).draggable({
					startAxis: "x",
					lockAxis: "x",
					preventDefault: "always",
					restrict: {
						restriction: parent,
						elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
					}
				}).on("dragstart", function (event) {
					event.preventDefault();
					// Only way to change the class of an SVG element:
					marker.setAttribute("class", "dragging");
				}).on("dragmove", function (event) {
					var dx = event.clientX - event.clientX0;
					group.setAttribute("transform", "translate(" + dx + ")");
				}).on("dragend", function (event) {
					// Only way to change the class of an SVG element:
					marker.removeAttribute("class");
					group.removeAttribute("transform");
					if (onDragged) {
						var clientX = event.clientX - parent.getBoundingClientRect().left;

						var xFactor = _this2.props.xFactor;

						var xMin = _this2.xMin();
						var xMax = _this2.xMax();
						var leftMarkerVisible = _this2.isLeftMarkerVisible();
						var xOffset = leftMarkerVisible ? _this2.props.leftRightMarkerWidth : 0;
						var axisXOffset = _this2.axisXOffset();
						var rangeWidth = _this2.rangeWidth();
						var xRange = xMax - xMin;
						var xScale = rangeWidth / xRange;
						// axisXOffset + xOffset + (x*xFactor - xMin) * xScale = clientX
						// (x*xFactor - xMin) * xScale = clientX - axisXOffset - xOffset
						// x*xFactor - xMin = (clientX - axisXOffset - xOffset) / xScale
						// x*xFactor = (clientX - axisXOffset - xOffset) / xScale + xMin
						var x = ((clientX - axisXOffset - xOffset) / xScale + xMin) / xFactor;
						onDragged(x, clientX);
					}
				});
			}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {
				this.makeDraggable(this.refs.leftMarkerGroup, this.refs.leftMarker, this.props.leftMarkerDragged);
				this.makeDraggable(this.refs.rightMarkerGroup, this.refs.rightMarker, this.props.rightMarkerDragged);
			}
		}, {
			key: "isLeftMarkerVisible",
			value: function isLeftMarkerVisible() {
				return !isNaN(this.props.leftMarkerX) && this.props.leftMarkerX !== this.props.rightMarkerX;
			}
		}, {
			key: "isRightMarkerVisible",
			value: function isRightMarkerVisible() {
				return !isNaN(this.props.rightMarkerX) && this.props.leftMarkerX !== this.props.rightMarkerX;
			}
		}, {
			key: "hasXLabels",
			value: function hasXLabels() {
				return !!this.props.xLabelSpacing || this.props.xLabelAtPoint;
			}
		}, {
			key: "hasLeftYLabels",
			value: function hasLeftYLabels() {
				return !!this.props.yLabelSpacing && !this.props.y2OnRightAxis;
			}
		}, {
			key: "hasRightYLabels",
			value: function hasRightYLabels() {
				return !!this.props.y2LabelSpacing || !!this.props.yLabelSpacing && this.props.y2OnRightAxis;
			}
		}, {
			key: "rangeWidth",
			value: function rangeWidth() {
				var rangeWidth = this.props.width - this.axisXOffset() - this.rightAxisXOffset();
				rangeWidth -= this.isLeftMarkerVisible() ? this.props.leftRightMarkerWidth : 0;
				rangeWidth -= this.isRightMarkerVisible() ? this.props.leftRightMarkerWidth : 0;
				return rangeWidth;
			}
		}, {
			key: "xMin",
			value: function xMin() {
				var xMin = this.props.xMin;

				return typeof xMin === "function" ? xMin(this.axisXOffset()) : xMin;
			}
		}, {
			key: "xMax",
			value: function xMax() {
				var xMax = this.props.xMax;

				return typeof xMax === "function" ? xMax(this.rightAxisXOffset()) : xMax;
			}
		}, {
			key: "textWidth",
			value: function textWidth(text) {
				return text.length * this.props.labelSize * 0.6;
			}
		}, {
			key: "render",
			value: function render() {
				var _this3 = this;

				////////////////////////////////////////////////////////////////////////////////
				// Set constants to work with:

				var leftMarkerVisible = this.isLeftMarkerVisible();
				var rightMarkerVisible = this.isRightMarkerVisible();

				var _props3 = this.props,
				    labelFont = _props3.labelFont,
				    labelSize = _props3.labelSize,
				    labelColor = _props3.labelColor,
				    xLabelOrigin = _props3.xLabelOrigin,
				    xLabelSpacing = _props3.xLabelSpacing,
				    xLabelAtPoint = _props3.xLabelAtPoint,
				    yLabelAtPoint = _props3.yLabelAtPoint,
				    xLabelFunc = _props3.xLabelFunc,
				    xLabelNoOverlapCheck = _props3.xLabelNoOverlapCheck,
				    xStep = _props3.xStep;
				var _props4 = this.props,
				    yLabelOrigin = _props4.yLabelOrigin,
				    yLabelSpacing = _props4.yLabelSpacing,
				    yLabelFunc = _props4.yLabelFunc,
				    yColor = _props4.yColor,
				    yOpacity = _props4.yOpacity,
				    markerSize = _props4.markerSize,
				    yAxisTitle = _props4.yAxisTitle;
				var _props5 = this.props,
				    y2LabelOrigin = _props5.y2LabelOrigin,
				    y2LabelSpacing = _props5.y2LabelSpacing,
				    y2LabelFunc = _props5.y2LabelFunc,
				    y2LabelAtPoint = _props5.y2LabelAtPoint,
				    y2Color = _props5.y2Color,
				    y2Opacity = _props5.y2Opacity,
				    markerSize2 = _props5.markerSize2,
				    y2AxisTitle = _props5.y2AxisTitle;
				var _props6 = this.props,
				    y3Color = _props6.y3Color,
				    y3Opacity = _props6.y3Opacity,
				    markerSize3 = _props6.markerSize3;
				var _props7 = this.props,
				    y4Color = _props7.y4Color,
				    y4Opacity = _props7.y4Opacity,
				    markerSize4 = _props7.markerSize4;


				var yLabelColor = this.props.yLabelColor || yColor;
				var y2LabelColor = this.props.y2LabelColor || y2Color;

				var textHeight = labelSize * 1.2;
				var hasXLabels = this.hasXLabels();
				var hasLeftYLabels = this.hasLeftYLabels();
				var hasRightYLabels = this.hasRightYLabels();
				var hasYLabels = hasLeftYLabels || hasRightYLabels;

				var _props8 = this.props,
				    xFactor = _props8.xFactor,
				    width = _props8.width,
				    height = _props8.height,
				    selectedIndex = _props8.selectedIndex;
				var _props9 = this.props,
				    yMin = _props9.yMin,
				    yMax = _props9.yMax,
				    yFactor = _props9.yFactor,
				    yBars = _props9.yBars;
				var _props10 = this.props,
				    y2Min = _props10.y2Min,
				    y2Max = _props10.y2Max,
				    y2Factor = _props10.y2Factor,
				    y2Bars = _props10.y2Bars;
				var _props11 = this.props,
				    y3Min = _props11.y3Min,
				    y3Max = _props11.y3Max,
				    y3Factor = _props11.y3Factor,
				    y3Bars = _props11.y3Bars;
				var _props12 = this.props,
				    y4Min = _props12.y4Min,
				    y4Max = _props12.y4Max,
				    y4Factor = _props12.y4Factor;
				var _props13 = this.props,
				    xGridOrigin = _props13.xGridOrigin,
				    xGridSpacing = _props13.xGridSpacing,
				    xGridAtPoint = _props13.xGridAtPoint,
				    xGridColor = _props13.xGridColor,
				    yGridOrigin = _props13.yGridOrigin,
				    yGridSpacing = _props13.yGridSpacing,
				    yGridColor = _props13.yGridColor,
				    backgroundColor = _props13.backgroundColor;
				var _props14 = this.props,
				    yValuesPerX = _props14.yValuesPerX,
				    y2ValuesPerX = _props14.y2ValuesPerX,
				    y3ValuesPerX = _props14.y3ValuesPerX;


				var xOffset = leftMarkerVisible ? this.props.leftRightMarkerWidth : 0;
				var axisXOffset = this.axisXOffset();
				var axisXOffsetFixed = axisXOffset.toFixed();
				var rightAxisXOffset = this.rightAxisXOffset();
				var rightAxisX = width - rightAxisXOffset;
				var rightAxisXFixed = rightAxisX.toFixed(1);
				var axisYOffset = hasXLabels ? textHeight : hasYLabels ? textHeight * 0.5 : 0;
				var axisYOffsetFixed = axisYOffset.toFixed(1);

				var rangeWidth = this.rangeWidth();
				var rangeTop = height - textHeight * 0.5;
				var rangeHeight = height - axisYOffset - textHeight * 0.5;
				if (yAxisTitle || y2AxisTitle) {
					rangeTop -= textHeight;
					rangeHeight -= textHeight;
				}

				var xMin = this.xMin();
				var xMax = this.xMax();

				var xRange = xMax - xMin;
				var yRange = yMax - yMin;
				var y2Range = y2Max - y2Min;
				var y3Range = y3Max - y3Min;
				var y4Range = y4Max - y4Min;

				var xScale = rangeWidth / xRange;
				var yScale = rangeHeight / yRange;
				var y2Scale = rangeHeight / y2Range;
				var y3Scale = rangeHeight / y3Range;
				var y4Scale = rangeHeight / y4Range;

				////////////////////////////////////////////////////////////////////////////////
				// Transform x/y values to graphics coordinates:

				function transformX(x) {
					return axisXOffset + xOffset + (x * xFactor - xMin) * xScale;
				}

				function transformY(y) {
					return axisYOffset + (y * yFactor - yMin) * yScale;
				}

				function transformY2(y2) {
					return axisYOffset + (y2 * y2Factor - y2Min) * y2Scale;
				}

				function transformY3(y3) {
					return axisYOffset + (y3 * y3Factor - y3Min) * y3Scale;
				}

				function transformY4(y4) {
					return axisYOffset + (y4 * y4Factor - y4Min) * y4Scale;
				}

				////////////////////////////////////////////////////////////////////////////////
				// Axis lines:

				var axisPoints = axisXOffsetFixed + "," + rangeTop + " " + axisXOffsetFixed + "," + axisYOffsetFixed + " " + rightAxisX + "," + axisYOffsetFixed;
				if (hasRightYLabels) {
					axisPoints += " " + rightAxisXFixed + "," + rangeTop;
				}

				////////////////////////////////////////////////////////////////////////////////
				// Grid lines:

				var xGridLinesD = "";
				var yGridLinesD = "";
				if (xGridAtPoint) {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = this.props.x[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var x = _step.value;

							if (x >= xMin && x <= xMax) {
								var tx = transformX(x).toFixed(1);
								xGridLinesD += "M" + tx + " " + axisYOffsetFixed + "V" + rangeTop;
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				} else if (xGridSpacing) {
					var start = xGridOrigin !== 0 ? xGridOrigin : Math.ceil(xMin / xGridSpacing) * xGridSpacing;
					for (var _x7 = start; _x7 <= xMax; _x7 += xGridSpacing) {
						if (_x7 >= xMin) {
							var _tx = transformX(_x7).toFixed(1);
							xGridLinesD += "M" + _tx + " " + axisYOffsetFixed + "V" + rangeTop;
						}
					}
				}
				if (yGridSpacing) {
					var _start = yGridOrigin !== 0 ? yGridOrigin : Math.ceil(yMin / yGridSpacing) * yGridSpacing;
					for (var y = _start; y <= yMax; y += yGridSpacing) {
						if (y >= yMin) {
							var ty = transformY(y).toFixed(1);
							yGridLinesD += "M" + axisXOffsetFixed + " " + ty + "H" + rightAxisXFixed;
						}
					}
				}
				var gridLines = null;
				if (xGridLinesD.length > 0 || yGridLinesD.length > 0) {
					if (xGridColor === yGridColor) {
						gridLines = _react2.default.createElement("path", { d: xGridLinesD + yGridLinesD, stroke: xGridColor, strokeWidth: "1" });
					} else {
						gridLines = [_react2.default.createElement("path", { key: "xGrid", d: xGridLinesD, stroke: xGridColor, strokeWidth: "1" }), _react2.default.createElement("path", { key: "yGrid", d: yGridLinesD, stroke: yGridColor, strokeWidth: "1" })];
					}
				}

				////////////////////////////////////////////////////////////////////////////////
				// Labels:

				var numYPoints = Math.min(this.props.x.length, this.props.y.length / yValuesPerX);

				var labels = [];
				if (hasXLabels) {
					var ticksD = "";
					var lastTextRightX = -Number.MAX_VALUE;

					var addXLabel = function addXLabel(x) {
						if (x < xMin || x > xMax) {
							return;
						}

						var tx = transformX(x);
						var txFixed = tx.toFixed(1);
						ticksD += "M" + txFixed + " " + (axisYOffset - textHeight * 0.2).toFixed(1) + "V" + axisYOffset;
						var text = xLabelFunc(x, xMin, xMax);
						var halfWidth = _this3.textWidth(text) * 0.5;
						if (xLabelNoOverlapCheck || tx - halfWidth > lastTextRightX) {
							lastTextRightX = tx + halfWidth;
							labels.push(_react2.default.createElement(
								"text",
								{
									key: "xlt" + x,
									x: txFixed,
									y: (-textHeight * 0.1).toFixed(1),
									transform: "scale(1,-1)",
									textAnchor: "middle",
									fill: labelColor
								},
								text
							));
						}
					};

					if (xLabelAtPoint) {
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							for (var _iterator2 = this.props.x[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var _x8 = _step2.value;

								addXLabel(_x8);
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2.return) {
									_iterator2.return();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}
					} else {
						for (var _x9 = xLabelOrigin !== 0 ? xLabelOrigin : Math.ceil(xMin / xLabelSpacing) * xLabelSpacing; _x9 <= xMax; _x9 += xLabelSpacing) {
							addXLabel(_x9);
						}
					}

					labels.push(_react2.default.createElement("path", { key: "xll", d: ticksD, stroke: labelColor, strokeWidth: "1" }));
				}

				if (yLabelAtPoint) {
					var labelYOffset = labelSize * -0.5;

					for (var i = 0; i < numYPoints; i += xStep) {
						var _x10 = this.props.x[i];
						var _y = this.props.y[i * yValuesPerX];
						if (!Number.isFinite(_x10) || !Number.isFinite(_y) || _x10 < xMin || _x10 > xMax) {
							continue;
						}

						var _tx2 = transformX(_x10);
						var txFixed = _tx2.toFixed(1);
						var _ty = transformY(_y);

						var text = yLabelFunc(_y, yMin, yMax);
						labels.push(_react2.default.createElement(
							"text",
							{
								key: "ylap" + i,
								x: txFixed,
								y: (labelYOffset - _ty).toFixed(1),
								transform: "scale(1,-1)",
								textAnchor: "middle",
								fill: yColor
							},
							text
						));
					}
				}

				if (y2LabelAtPoint) {
					var _labelYOffset = labelSize * -0.5;

					for (var _i = 0; _i < numYPoints; _i += xStep) {
						var _x11 = this.props.x[_i];
						var y2 = this.props.y2[_i * y2ValuesPerX];
						if (!Number.isFinite(_x11) || !Number.isFinite(y2) || _x11 < xMin || _x11 > xMax) {
							continue;
						}

						var _tx3 = transformX(_x11);
						var _txFixed = _tx3.toFixed(1);
						var ty2 = transformY2(y2);

						var _text = y2LabelFunc(y2, y2Min, y2Max);
						labels.push(_react2.default.createElement(
							"text",
							{
								key: "y2lap" + _i,
								x: _txFixed,
								y: (_labelYOffset - ty2).toFixed(1),
								transform: "scale(1,-1)",
								textAnchor: "middle",
								fill: y2Color
							},
							_text
						));
					}
				}

				if (hasLeftYLabels) {
					var _ticksD = "";
					var tickX = (axisXOffset - textHeight * 0.2).toFixed(1);
					var _labelYOffset2 = labelSize * 0.3;
					var _start2 = yLabelOrigin !== 0 ? yLabelOrigin : Math.ceil(yMin / yLabelSpacing) * yLabelSpacing;
					for (var _y2 = _start2; _y2 <= yMax; _y2 += yLabelSpacing) {
						if (_y2 >= yMin) {
							var _ty2 = transformY(_y2);
							_ticksD += "M" + tickX + " " + _ty2.toFixed(1) + "H" + axisXOffsetFixed;
							labels.push(_react2.default.createElement(
								"text",
								{
									key: "ylt" + _y2,
									x: tickX,
									y: (_labelYOffset2 - _ty2).toFixed(1),
									transform: "scale(1,-1)",
									textAnchor: "end",
									fill: yLabelColor
								},
								yLabelFunc(_y2, yMin, yMax)
							));
						}
					}

					labels.push(_react2.default.createElement("path", { key: "yll", d: _ticksD, stroke: yLabelColor, strokeWidth: "1" }));
				}
				if (hasRightYLabels) {
					var _ticksD2 = "";
					var _tickX = (rightAxisX + textHeight * 0.2).toFixed(1);
					var _labelYOffset3 = labelSize * 0.3;
					var _start3 = y2LabelOrigin !== 0 ? y2LabelOrigin : Math.ceil(y2Min / y2LabelSpacing) * y2LabelSpacing;
					for (var _y3 = _start3; _y3 <= y2Max; _y3 += y2LabelSpacing) {
						if (_y3 >= y2Min) {
							var _ty3 = transformY2(_y3);
							_ticksD2 += "M" + rightAxisXFixed + " " + _ty3.toFixed(1) + "H" + _tickX;
							labels.push(_react2.default.createElement(
								"text",
								{
									key: "y2lt" + _y3,
									x: _tickX,
									y: (_labelYOffset3 - _ty3).toFixed(1),
									transform: "scale(1,-1)",
									fill: y2LabelColor
								},
								y2LabelFunc(_y3, y2Min, y2Max)
							));
						}
					}

					labels.push(_react2.default.createElement("path", { key: "y2ll", d: _ticksD2, stroke: y2LabelColor, strokeWidth: "1" }));
				}

				if (yAxisTitle) {
					labels.push(_react2.default.createElement(
						"text",
						{
							key: "yAxisTitle",
							x: axisXOffset.toFixed(1),
							y: (-rangeTop - labelSize).toFixed(1),
							textAnchor: "middle",
							transform: "scale(1,-1)",
							fill: yColor
						},
						yAxisTitle
					));
				}

				if (y2AxisTitle) {
					labels.push(_react2.default.createElement(
						"text",
						{
							key: "y2AxisTitle",
							x: rightAxisX.toFixed(1),
							y: (-rangeTop - labelSize).toFixed(1),
							textAnchor: "middle",
							transform: "scale(1,-1)",
							fill: y2LabelColor
						},
						y2AxisTitle
					));
				}

				////////////////////////////////////////////////////////////////////////////////
				// y data series graphics:

				var bars = [];

				var yPoints = "";
				if (yBars) {
					// draw y values as bars
					var barWidth = yBars / yValuesPerX;
					var yZero = transformY(0);
					var moveLeft = void 0;
					if (!y2Bars && !y3Bars) {
						moveLeft = yBars * 0.5;
					} else if (y2Bars && y3Bars) {
						moveLeft = yBars + y2Bars * 0.5;
					} else {
						moveLeft = yBars;
					}
					for (var _i2 = 0; _i2 < numYPoints; _i2 += xStep) {
						for (var j = 0; j < yValuesPerX; j++) {
							var _x12 = this.props.x[_i2];
							var _y4 = this.props.y[_i2 * yValuesPerX + j];
							if (Number.isFinite(_x12) && Number.isFinite(_y4)) {
								_x12 = transformX(_x12) - moveLeft + j * barWidth;
								_y4 = transformY(_y4);
								var h = _y4 - yZero;
								if (h < 0) {
									h = -h;
								} else {
									_y4 = yZero;
								}
								var key = "yBar" + _i2;
								if (j > 0) {
									key += "_" + j;
								}
								bars.push(_react2.default.createElement("rect", { key: key, x: _x12.toFixed(1), y: _y4.toFixed(1), width: barWidth, height: h.toFixed(1), stroke: "none", fill: yColor, fillOpacity: yOpacity }));
							}
						}
					}
				} else {
					// draw y values as line-strip
					for (var _i3 = 0; _i3 < numYPoints; _i3 += xStep) {
						var _x13 = this.props.x[_i3];
						var _y5 = this.props.y[_i3 * yValuesPerX];
						if (Number.isFinite(_x13) && Number.isFinite(_y5)) {
							yPoints += transformX(_x13).toFixed(1) + "," + transformY(_y5).toFixed(1) + " ";
						}
					}
					if (xStep > 1) {
						// if we are stepping over values, make sure to add the last one
						var _i4 = numYPoints - 1;
						var _x14 = this.props.x[_i4];
						var _y6 = this.props.y[_i4 * yValuesPerX];
						if (Number.isFinite(_x14) && Number.isFinite(_y6)) {
							yPoints += transformX(_x14).toFixed(1) + "," + transformY(_y6).toFixed(1) + " ";
						}
					}
				}

				var selectedMarker = null;
				var hasSelectedMarker = !!this.props.selectedMarkerSize && selectedIndex >= 0 && selectedIndex < numYPoints;
				if (hasSelectedMarker) {
					var _i5 = selectedIndex;
					var _x15 = this.props.x[_i5];
					var _y7 = this.props.y[_i5 * yValuesPerX];
					if (Number.isFinite(_x15) && Number.isFinite(_y7)) {
						selectedMarker = _react2.default.createElement("circle", {
							cx: transformX(_x15).toFixed(1),
							cy: transformY(_y7).toFixed(1),
							r: this.props.selectedMarkerSize * 0.5,
							stroke: "none",
							fill: this.props.selectedMarkerColor,
							onClick: this.props.onClickMarker ? this.onClickMarker : null,
							"data-index": _i5,
							"data-x": _x15,
							"data-y": _y7,
							"data-selected": true
						});
					}
				}

				////////////////////////////////////////////////////////////////////////////////
				// y2 data series graphics:

				var numY2Points = 0;
				var y2Points = "";
				if (this.props.y2) {
					numY2Points = Math.min(this.props.x.length, this.props.y2.length / y2ValuesPerX);
					if (y2Bars) {
						var _barWidth = y2Bars / y2ValuesPerX;
						var y2Zero = transformY2(0);
						var _moveLeft = void 0;
						if (yBars && !y3Bars) {
							_moveLeft = 0;
						} else if (!yBars && y3Bars) {
							_moveLeft = y2Bars;
						} else {
							_moveLeft = y2Bars * 0.5;
						}
						for (var _i6 = 0; _i6 < numY2Points; _i6 += xStep) {
							for (var _j = 0; _j < y2ValuesPerX; _j++) {
								var _x16 = this.props.x[_i6];
								var _y8 = this.props.y2[_i6 * y2ValuesPerX + _j];
								if (Number.isFinite(_x16) && Number.isFinite(_y8)) {
									_x16 = transformX(_x16) - _moveLeft + _j * _barWidth;
									_y8 = transformY2(_y8);
									var _h = _y8 - y2Zero;
									if (_h < 0) {
										_h = -_h;
									} else {
										_y8 = y2Zero;
									}
									var _key2 = "y2Bar" + _i6;
									if (_j > 0) {
										_key2 += "_" + _j;
									}
									bars.push(_react2.default.createElement("rect", { key: _key2, x: _x16.toFixed(1), y: _y8.toFixed(1), width: _barWidth, height: _h.toFixed(1), stroke: "none", fill: y2Color, fillOpacity: y2Opacity }));
								}
							}
						}
					} else {
						for (var _i7 = 0; _i7 < numY2Points; _i7 += xStep) {
							var _x17 = this.props.x[_i7];
							var _y9 = this.props.y2[_i7 * y2ValuesPerX];
							if (Number.isFinite(_x17) && Number.isFinite(_y9)) {
								y2Points += " " + transformX(_x17).toFixed(1) + "," + transformY2(_y9).toFixed(1);
							}
						}
						if (xStep > 1) {
							var _i8 = numY2Points - 1;
							var _x18 = this.props.x[_i8];
							var _y10 = this.props.y2[_i8 * y2ValuesPerX];
							if (Number.isFinite(_x18) && Number.isFinite(_y10)) {
								y2Points += " " + transformX(_x18).toFixed(1) + "," + transformY2(_y10).toFixed(1);
							}
						}
					}
				}

				////////////////////////////////////////////////////////////////////////////////
				// y3 data series graphics:

				var numY3Points = 0;
				var y3Points = "";
				if (this.props.y3) {
					numY3Points = Math.min(this.props.x.length, this.props.y3.length / y3ValuesPerX);
					if (y3Bars) {
						var _barWidth2 = y3Bars / y3ValuesPerX;
						var y3Zero = transformY3(0);
						var _moveLeft2 = void 0;
						if (!yBars && !y3Bars) {
							_moveLeft2 = y3Bars * 0.5;
						} else if (yBars && y3Bars) {
							_moveLeft2 = y2Bars * -0.5;
						} else {
							_moveLeft2 = 0;
						}
						for (var _i9 = 0; _i9 < numY3Points; _i9 += xStep) {
							for (var _j2 = 0; _j2 < y3ValuesPerX; _j2++) {
								var _x19 = this.props.x[_i9];
								var y3 = this.props.y3[_i9 * y3ValuesPerX + _j2];
								if (Number.isFinite(_x19) && Number.isFinite(y3)) {
									_x19 = transformX(_x19) - _moveLeft2 + _j2 * _barWidth2;
									y3 = transformY3(y3);
									var _h2 = y3 - y3Zero;
									if (_h2 < 0) {
										_h2 = -_h2;
									} else {
										y3 = y3Zero;
									}
									var _key3 = "y3Bar" + _i9;
									if (_j2 > 0) {
										_key3 += "_" + _j2;
									}
									bars.push(_react2.default.createElement("rect", { key: _key3, x: _x19.toFixed(1), y: y3.toFixed(1), width: _barWidth2, height: _h2.toFixed(1), stroke: "none", fill: y3Color, fillOpacity: y3Opacity }));
								}
							}
						}
					} else {
						for (var _i10 = 0; _i10 < numY3Points; _i10 += xStep) {
							var _x20 = this.props.x[_i10];
							var _y11 = this.props.y3[_i10 * y3ValuesPerX];
							if (Number.isFinite(_x20) && Number.isFinite(_y11)) {
								y3Points += " " + transformX(_x20).toFixed(1) + "," + transformY3(_y11).toFixed(1);
							}
						}
						if (xStep > 1) {
							var _i11 = numY3Points - 1;
							var _x21 = this.props.x[_i11];
							var _y12 = this.props.y3[_i11 * y3ValuesPerX];
							if (Number.isFinite(_x21) && Number.isFinite(_y12)) {
								y3Points += " " + transformX(_x21).toFixed(1) + "," + transformY3(_y12).toFixed(1);
							}
						}
					}
				}

				////////////////////////////////////////////////////////////////////////////////
				// y4 data series graphics:

				var numY4Points = 0;
				var y4Points = "";
				if (this.props.y4) {
					numY4Points = Math.min(this.props.x.length, this.props.y4.length);
					for (var _i12 = 0; _i12 < numY4Points; _i12 += xStep) {
						var _x22 = this.props.x[_i12];
						var y4 = this.props.y4[_i12];
						if (Number.isFinite(_x22) && Number.isFinite(y4)) {
							y4Points += " " + transformX(_x22).toFixed(1) + "," + transformY4(y4).toFixed(1);
						}
					}
					if (xStep > 1) {
						var _i13 = numY4Points - 1;
						var _x23 = this.props.x[_i13];
						var _y13 = this.props.y4[_i13];
						if (Number.isFinite(_x23) && Number.isFinite(_y13)) {
							y4Points += " " + transformX(_x23).toFixed(1) + "," + transformY4(_y13).toFixed(1);
						}
					}
				}

				////////////////////////////////////////////////////////////////////////////////
				// Markers for data series points:

				var markers = [];
				if (markerSize > 0) {
					var r = markerSize * 0.5;
					var onClick = this.props.onClickMarker ? this.onClickMarker : null;
					for (var _i14 = 0; _i14 < numYPoints; _i14 += xStep) {
						var _x24 = this.props.x[_i14];
						var _y14 = this.props.y[_i14 * yValuesPerX];
						if (Number.isFinite(_x24) && Number.isFinite(_y14) && !(hasSelectedMarker && _i14 === selectedIndex)) {
							markers.push(_react2.default.createElement("circle", {
								key: "marker_" + _i14,
								cx: transformX(_x24).toFixed(1),
								cy: transformY(_y14).toFixed(1),
								r: r,
								stroke: "none",
								fill: yColor,
								onClick: onClick,
								"data-index": _i14,
								"data-x": _x24,
								"data-y": _y14
							}));
						}
					}
				}
				if (markerSize2 > 0) {
					var _r = markerSize2 * 0.5;
					for (var _i15 = 0; _i15 < numY2Points; _i15 += xStep) {
						var _x25 = this.props.x[_i15];
						var _y15 = this.props.y2[_i15 * y2ValuesPerX];
						if (Number.isFinite(_x25) && Number.isFinite(_y15)) {
							markers.push(_react2.default.createElement("circle", {
								key: "marker2_" + _i15,
								cx: transformX(_x25).toFixed(1),
								cy: transformY2(_y15).toFixed(1),
								r: _r,
								stroke: "none",
								fill: y2Color
							}));
						}
					}
				}
				if (markerSize3 > 0) {
					var _r2 = markerSize3 * 0.5;
					for (var _i16 = 0; _i16 < numY3Points; _i16 += xStep) {
						var _x26 = this.props.x[_i16];
						var _y16 = this.props.y3[_i16 * y3ValuesPerX];
						if (Number.isFinite(_x26) && Number.isFinite(_y16)) {
							markers.push(_react2.default.createElement("circle", {
								key: "marker3_" + _i16,
								cx: transformX(_x26).toFixed(1),
								cy: transformY3(_y16).toFixed(1),
								r: _r2,
								stroke: "none",
								fill: y3Color
							}));
						}
					}
				}
				if (markerSize4 > 0) {
					var _r3 = markerSize4 * 0.5;
					for (var _i17 = 0; _i17 < numY4Points; _i17 += xStep) {
						var _x27 = this.props.x[_i17];
						var _y17 = this.props.y4[_i17];
						if (Number.isFinite(_x27) && Number.isFinite(_y17)) {
							markers.push(_react2.default.createElement("circle", {
								key: "marker4_" + _i17,
								cx: transformX(_x27).toFixed(1),
								cy: transformY4(_y17).toFixed(1),
								r: _r3,
								stroke: "none",
								fill: y4Color
							}));
						}
					}
				}
				var _props15 = this.props,
				    extraPointsX = _props15.extraPointsX,
				    extraPointsY = _props15.extraPointsY,
				    extraPointsSize = _props15.extraPointsSize,
				    extraPointsColor = _props15.extraPointsColor;

				if (extraPointsX && extraPointsY && extraPointsSize > 0) {
					var _r4 = extraPointsSize * 0.5;
					var count = Math.min(extraPointsX.length, extraPointsY.length);
					for (var _i18 = 0; _i18 < count; _i18++) {
						var _x28 = extraPointsX[_i18];
						var _y18 = extraPointsY[_i18];
						if (Number.isFinite(_x28) && Number.isFinite(_y18)) {
							markers.push(_react2.default.createElement("circle", {
								key: "extraPoints_" + _i18,
								cx: transformX(_x28).toFixed(1),
								cy: transformY(_y18).toFixed(1),
								r: _r4,
								stroke: "none",
								fill: extraPointsColor
							}));
						}
					}
				}

				////////////////////////////////////////////////////////////////////////////////
				// Draw background color based on data series:

				var bg = [];
				if (this.props.bgValues && this.props.bgValues.length > 0 && this.props.bgColorFunc) {
					var numPoints = Math.min(this.props.x.length, this.props.bgValues.length);
					if (numPoints >= 2) {
						var lastX = transformX(this.props.x[0]);
						var lastB = this.props.bgValues[0];
						for (var _i20 = 1; _i20 < numPoints; _i20 += xStep) {
							var b = this.props.bgValues[_i20];
							if (b !== lastB) {
								var _x30 = (transformX(this.props.x[_i20 - 1]) + transformX(this.props.x[_i20])) * 0.5;
								var _width2 = _x30 - lastX;
								bg.push(_react2.default.createElement("rect", { key: "bg" + (_i20 - 1), stroke: "none", fill: this.props.bgColorFunc(lastB), x: lastX.toFixed(1), y: axisYOffsetFixed, width: _width2.toFixed(1), height: rangeHeight.toFixed(1) }));
								lastX = _x30;
								lastB = b;
							}
						}
						var _i19 = numPoints - 1;
						var _x29 = transformX(this.props.x[_i19]);
						var _width = _x29 - lastX;
						bg.push(_react2.default.createElement("rect", { key: "bg" + _i19, stroke: "none", fill: this.props.bgColorFunc(lastB), x: lastX.toFixed(1), y: axisYOffsetFixed, width: _width.toFixed(1), height: rangeHeight.toFixed(1) }));
					}
				}

				////////////////////////////////////////////////////////////////////////////////
				// X range markers left and right:

				// TODO draw markers only when active,
				// but initialize drag interactions when activated after component was mounted

				var leftMarkerX = 0;
				var leftMarkerHeight = 0;
				if (leftMarkerVisible) {
					leftMarkerX = transformX(this.props.leftMarkerX);
					leftMarkerHeight = rangeHeight;
				}

				var rightMarkerX = 0;
				var rightMarkerHeight = 0;
				if (rightMarkerVisible) {
					rightMarkerX = transformX(this.props.rightMarkerX);
					rightMarkerHeight = rangeHeight;
				}

				////////////////////////////////////////////////////////////////////////////////
				// Text in diagram center:

				var centerText = this.props.centerText.length === 0 ? null : _react2.default.createElement(
					"text",
					{
						x: width * 0.5,
						y: height * 0.5,
						textAnchor: "middle",
						fontFamily: this.props.centerTextFont,
						fontSize: this.props.centerTextSize,
						fill: this.props.centerTextColor,
						stroke: "none"
					},
					this.props.centerText
				);

				return _react2.default.createElement(
					"svg",
					{ ref: "parent", width: width, height: height, viewBox: "0 0 " + width + " " + height },
					_react2.default.createElement(
						"defs",
						null,
						_react2.default.createElement(
							"linearGradient",
							{ id: "leftMarkerGradient", x1: "0%", x2: "100%" },
							_react2.default.createElement("stop", { offset: "0%", style: { stopColor: this.props.leftMarkerColor, stopOpacity: 0 } }),
							_react2.default.createElement("stop", { offset: "100%", style: { stopColor: this.props.leftMarkerColor, stopOpacity: 1 } })
						),
						_react2.default.createElement(
							"linearGradient",
							{ id: "rightMarkerGradient", x1: "0%", x2: "100%" },
							_react2.default.createElement("stop", { offset: "0%", style: { stopColor: this.props.rightMarkerColor, stopOpacity: 1 } }),
							_react2.default.createElement("stop", { offset: "100%", style: { stopColor: this.props.rightMarkerColor, stopOpacity: 0 } })
						)
					),
					backgroundColor ? _react2.default.createElement("rect", { fill: backgroundColor, width: "100%", height: "100%" }) : null,
					centerText,
					_react2.default.createElement(
						"g",
						{ transform: "scale(1,-1) translate(0,-" + height + ")", fontFamily: labelFont, fontSize: labelSize },
						bg,
						gridLines,
						_react2.default.createElement("polyline", { stroke: this.props.axisColor, strokeWidth: "1", fill: "none", points: axisPoints }),
						labels,
						bars,
						y4Points.length > 0 ? _react2.default.createElement("polyline", { stroke: y4Color, strokeOpacity: y4Opacity, strokeWidth: this.props.y4LineWidth, strokeDasharray: this.props.y4LineDashes, fill: "none", points: y4Points }) : null,
						y3Points.length > 0 ? _react2.default.createElement("polyline", { stroke: y3Color, strokeOpacity: y3Opacity, strokeWidth: this.props.y3LineWidth, strokeDasharray: this.props.y3LineDashes, fill: "none", points: y3Points }) : null,
						y2Points.length > 0 ? _react2.default.createElement("polyline", { stroke: y2Color, strokeOpacity: y2Opacity, strokeWidth: this.props.y2LineWidth, strokeDasharray: this.props.y2LineDashes, fill: "none", points: y2Points }) : null,
						yPoints.length > 0 ? _react2.default.createElement("polyline", { stroke: yColor, strokeOpacity: yOpacity, strokeWidth: this.props.yLineWidth, strokeDasharray: this.props.yLineDashes, fill: "none", points: yPoints }) : null,
						markers,
						selectedMarker,
						_react2.default.createElement(
							"g",
							{ ref: "leftMarkerGroup" },
							_react2.default.createElement("rect", {
								ref: "leftMarkerCover",
								x: axisXOffsetFixed,
								y: axisYOffsetFixed,
								width: (leftMarkerX - axisXOffset).toFixed(1),
								height: leftMarkerHeight.toFixed(1),
								stroke: "none",
								fill: this.props.leftRightMarkerCoverColor,
								fillOpacity: this.props.leftRightMarkerCoverOpacity
							}),
							_react2.default.createElement("rect", {
								ref: "leftMarker",
								x: leftMarkerX - this.props.leftRightMarkerWidth,
								y: axisYOffset,
								width: this.props.leftRightMarkerWidth,
								height: leftMarkerHeight.toFixed(1),
								stroke: "none",
								fill: "url(#leftMarkerGradient)",
								style: { touchAction: "none" }
							})
						),
						_react2.default.createElement(
							"g",
							{ ref: "rightMarkerGroup" },
							_react2.default.createElement("rect", {
								ref: "rightMarkerCover",
								x: rightMarkerX.toFixed(1),
								y: axisYOffset.toFixed(1),
								width: (rightAxisX - rightMarkerX).toFixed(1),
								height: rightMarkerHeight.toFixed(1),
								stroke: "none",
								fill: this.props.leftRightMarkerCoverColor,
								fillOpacity: this.props.leftRightMarkerCoverOpacity
							}),
							_react2.default.createElement("rect", {
								ref: "rightMarker",
								x: rightMarkerX.toFixed(1),
								y: axisYOffset.toFixed(1),
								width: this.props.leftRightMarkerWidth,
								height: rightMarkerHeight.toFixed(1),
								stroke: "none",
								fill: "url(#rightMarkerGradient)",
								style: { touchAction: "none" }
							})
						)
					)
				);
			}
		}]);

		return XYDiagram;
	}(_react2.default.PureComponent);

	XYDiagram.displayName = "XYDiagram";
	XYDiagram.propTypes = {
		width: _react2.default.PropTypes.number.isRequired,
		height: _react2.default.PropTypes.number.isRequired,
		labelFont: _react2.default.PropTypes.string,
		labelSize: _react2.default.PropTypes.number,
		labelColor: _react2.default.PropTypes.string,
		centerText: _react2.default.PropTypes.string,
		centerTextFont: _react2.default.PropTypes.string,
		centerTextSize: _react2.default.PropTypes.number,
		centerTextColor: _react2.default.PropTypes.string,

		axisColor: _react2.default.PropTypes.string,
		backgroundColor: _react2.default.PropTypes.string,

		leftAxisXOffset: _react2.default.PropTypes.number,
		rightAxisXOffset: _react2.default.PropTypes.number,

		x: _react2.default.PropTypes.array.isRequired,
		xStep: _react2.default.PropTypes.number,
		xMin: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.func]),
		xMax: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.func]),
		xFactor: _react2.default.PropTypes.number,
		xGridOrigin: _react2.default.PropTypes.number,
		xGridSpacing: _react2.default.PropTypes.number,
		xGridAtPoint: _react2.default.PropTypes.bool,
		xGridColor: _react2.default.PropTypes.string,
		xLabelOrigin: _react2.default.PropTypes.number,
		xLabelSpacing: _react2.default.PropTypes.number,
		xLabelAtPoint: _react2.default.PropTypes.bool,
		xLabelFunc: _react2.default.PropTypes.func,
		xLabelNoOverlapCheck: _react2.default.PropTypes.bool, // overlap checks only work from left to right, disable if points are right to left

		y: _react2.default.PropTypes.array.isRequired,
		yMin: _react2.default.PropTypes.number,
		yMax: _react2.default.PropTypes.number,
		yFactor: _react2.default.PropTypes.number,
		yValuesPerX: _react2.default.PropTypes.number, // show that number of bars per point, y.length == x.length * yValuesPerX
		yColor: _react2.default.PropTypes.string,
		yOpacity: _react2.default.PropTypes.number,
		yLabelColor: _react2.default.PropTypes.string,
		yGridOrigin: _react2.default.PropTypes.number,
		yGridSpacing: _react2.default.PropTypes.number,
		yGridColor: _react2.default.PropTypes.string,
		yLabelOrigin: _react2.default.PropTypes.number,
		yLabelSpacing: _react2.default.PropTypes.number,
		yLabelFunc: _react2.default.PropTypes.func,
		yLabelAtPoint: _react2.default.PropTypes.bool,
		yLineWidth: _react2.default.PropTypes.number,
		yLineDashes: _react2.default.PropTypes.string,
		markerSize: _react2.default.PropTypes.number,
		yBars: _react2.default.PropTypes.number,
		yAxisTitle: _react2.default.PropTypes.string,

		y2: _react2.default.PropTypes.array,
		y2Min: _react2.default.PropTypes.number,
		y2Max: _react2.default.PropTypes.number,
		y2Factor: _react2.default.PropTypes.number,
		y2ValuesPerX: _react2.default.PropTypes.number, // show that number of bars per point, y2.length == x.length * y2ValuesPerX
		y2Color: _react2.default.PropTypes.string,
		y2Opacity: _react2.default.PropTypes.number,
		y2LabelColor: _react2.default.PropTypes.string,
		y2LabelOrigin: _react2.default.PropTypes.number,
		y2LabelSpacing: _react2.default.PropTypes.number,
		y2LabelFunc: _react2.default.PropTypes.func,
		y2LabelAtPoint: _react2.default.PropTypes.bool,
		y2LineWidth: _react2.default.PropTypes.number,
		y2LineDashes: _react2.default.PropTypes.string,
		markerSize2: _react2.default.PropTypes.number,
		y2OnRightAxis: _react2.default.PropTypes.bool,
		y2Bars: _react2.default.PropTypes.number,
		y2AxisTitle: _react2.default.PropTypes.string,

		y3: _react2.default.PropTypes.array,
		y3Min: _react2.default.PropTypes.number,
		y3Max: _react2.default.PropTypes.number,
		y3Factor: _react2.default.PropTypes.number,
		y3ValuesPerX: _react2.default.PropTypes.number, // show that number of bars per point, y3.length == x.length * y3ValuesPerX
		y3Color: _react2.default.PropTypes.string,
		y3Opacity: _react2.default.PropTypes.number,
		y3LabelOrigin: _react2.default.PropTypes.number,
		y3LabelSpacing: _react2.default.PropTypes.number,
		y3LabelFunc: _react2.default.PropTypes.func,
		y3LineWidth: _react2.default.PropTypes.number,
		y3LineDashes: _react2.default.PropTypes.string,
		markerSize3: _react2.default.PropTypes.number,
		y3Bars: _react2.default.PropTypes.number,

		y4: _react2.default.PropTypes.array,
		y4Min: _react2.default.PropTypes.number,
		y4Max: _react2.default.PropTypes.number,
		y4Factor: _react2.default.PropTypes.number,
		y4Color: _react2.default.PropTypes.string,
		y4Opacity: _react2.default.PropTypes.number,
		y4LabelOrigin: _react2.default.PropTypes.number,
		y4LabelSpacing: _react2.default.PropTypes.number,
		y4LabelFunc: _react2.default.PropTypes.func,
		y4LineWidth: _react2.default.PropTypes.number,
		y4LineDashes: _react2.default.PropTypes.string,
		markerSize4: _react2.default.PropTypes.number,

		bgValues: _react2.default.PropTypes.array,
		bgColorFunc: _react2.default.PropTypes.func,

		onClickMarker: _react2.default.PropTypes.func,
		selectedIndex: _react2.default.PropTypes.number,
		selectedMarkerSize: _react2.default.PropTypes.number,
		selectedMarkerColor: _react2.default.PropTypes.string,
		leftMarkerX: _react2.default.PropTypes.number,
		leftMarkerColor: _react2.default.PropTypes.string,
		leftMarkerDragged: _react2.default.PropTypes.func,
		rightMarkerX: _react2.default.PropTypes.number,
		rightMarkerColor: _react2.default.PropTypes.string,
		rightMarkerDragged: _react2.default.PropTypes.func,
		leftRightMarkerCoverColor: _react2.default.PropTypes.string,
		leftRightMarkerCoverOpacity: _react2.default.PropTypes.number,
		leftRightMarkerWidth: _react2.default.PropTypes.number,

		extraPointsX: _react2.default.PropTypes.array,
		extraPointsY: _react2.default.PropTypes.array,
		extraPointsSize: _react2.default.PropTypes.number,
		extraPointsColor: _react2.default.PropTypes.string
	};
	XYDiagram.defaultProps = {
		labelFont: "\"Lucida Console\", Monaco, monospace",
		labelSize: 16,
		labelColor: "#000",
		centerText: "",
		centerTextFont: "\"Lucida Console\", Monaco, monospace",
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
		extraPointsColor: "#F00"
	};
	exports.default = XYDiagram;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./XYDiagram"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./XYDiagram"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.XYDiagram);
    global.index = mod.exports;
  }
})(this, function (exports, _XYDiagram) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "XYDiagram", {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_XYDiagram).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});

//# sourceMappingURL=index.umd.js.map