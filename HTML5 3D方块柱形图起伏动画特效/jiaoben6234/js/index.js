function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}var pillar = void 0,c = void 0;
var w = 50;
var w_half = w * 0.5;
var h = 150;

var count = 9;
var points = [];
var contourShading = false;

function setup() {
	pillar = document.createElement('canvas');
	Object.assign(pillar, { width: w, height: h });
	c = pillar.getContext('2d');

	var index = 0;
	for (var y = 0; y < count; y++) {
		for (var x = 0; x < count; x++) {
			var pos = createVector(x, y).add(0.5).div(count).sub(0.5).mult(2);
			pos.z = pos.y;
			var i = index++;
			var hueOffset = i * 2;
			points.push({ pos: pos, i: i, hueOffset: hueOffset });
		}
	}

	window.addEventListener('click', function (_) {return contourShading ^= 1;});
}

function drawPillarAtRot(e) {
	var time = e % HALF_PI;
	var rot = time + QUARTER_PI;
	var size = w * 0.9;
	var sizeHalf = size * 0.5;

	c.clearRect(0, 0, w, pillar.height);

	c.save();

	c.filter = 'saturate(200%)';

	c.translate((w - size) * 0.5, (w - size) * 0.5);
	var topPoints = [];
	var count = 4;
	var rotP = 1 / count * TAU;
	for (var i = 0; i < count; i++) {
		var vector = createVector(1, 0).rotate(i * rotP + rot).mult(sizeHalf).add(sizeHalf);
		topPoints.push(vector);
	}
	var leftMost = topPoints.reduce(function (p, n) {return p.x < n.x ? p : n;});
	var rightMost = topPoints.reduce(function (p, n) {return p.x > n.x ? p : n;});
	var bottomMost = topPoints.reduce(function (p, n) {return p.y > n.y ? p : n;});

	c.beginPath();
	c.moveTo(leftMost.x, leftMost.y);
	c.lineTo(leftMost.x, leftMost.y + size * 2);
	c.lineTo(bottomMost.x + 0.5, bottomMost.y + size * 2);
	c.lineTo(bottomMost.x + 0.5, bottomMost.y);
	c.lineTo(sizeHalf, sizeHalf);
	c.fillStyle = hsl(0, 100, 85);
	c.fill();

	if (rot > QUARTER_PI) {
		c.beginPath();
		c.moveTo(rightMost.x, rightMost.y);
		c.lineTo(rightMost.x, rightMost.y + size * 2);
		c.lineTo(bottomMost.x, bottomMost.y + size * 2);
		c.lineTo(bottomMost.x, bottomMost.y);
		c.lineTo(sizeHalf, sizeHalf);
		var l = time / HALF_PI * 15 + 70;
		// let l = ease.cubic.inOut(e_ % HALF_PI / HALF_PI, 75, 10, 1);
		c.fillStyle = hsl(0, 100, l);
		c.fill();
	}

	c.beginPath();
	topPoints.forEach(function (p, i) {var _c, _c2;return i ? (_c = c).lineTo.apply(_c, _toConsumableArray(p.xy)) : (_c2 = c).moveTo.apply(_c2, _toConsumableArray(p.xy));});
	c.fillStyle = hsl(0, 40, 90);
	c.fill();

	if (contourShading) {var _c3, _c4, _c5, _c6, _c7, _c8;
		var topMost = topPoints.reduce(function (p, n) {return p.y < n.y ? p : n;});
		c.beginPath();
		(_c3 = c).moveTo.apply(_c3, _toConsumableArray(topMost.xy));
		(_c4 = c).lineTo.apply(_c4, _toConsumableArray(rightMost.xy));
		(_c5 = c).lineTo.apply(_c5, _toConsumableArray(rightMost.copy().add(0, size * 2).xy));
		(_c6 = c).lineTo.apply(_c6, _toConsumableArray(bottomMost.copy().add(0, size * 2).xy));
		(_c7 = c).lineTo.apply(_c7, _toConsumableArray(leftMost.copy().add(0, size * 2).xy));
		(_c8 = c).lineTo.apply(_c8, _toConsumableArray(leftMost.xy));
		c.closePath();
		c.strokeStyle = 'black';
		c.lineWidth = 4;
		c.stroke();
	}

	c.restore();
}

function draw(e) {
	var time = e * 0.001;
	var time1 = time * PHI / 1.6;
	var time2 = time * 2 * PI / 3.1;
	var time4 = time * 4 * E / 2.7;
	drawPillarAtRot(-(time % TAU) + TAU);
	points.forEach(function (p) {return p.view = p.pos.copy().rotateZX(time);});
	var m = w * map(sin(time * 1.5), -1, 1, 0.425, 0.23) * SQRT2 * count;
	var hueTime = time * 80;
	var maxO = (h - w * 2) * 0.5;
	var d = PI * 1.1;
	translate(0, -h * 0.375);
	points.sort(function (a, b) {return a.view.z - b.view.z;}).
	forEach(function (p) {
		var pos = createVector(p.view.x, p.view.z).mult(m);
		filter('hue-rotate(' + (p.hueOffset + hueTime) + 'deg)');
		var posX = pos.x - w_half;
		var posY = pos.y - w_half;
		var offset = maxO * (1 + sin(time4 + d * (cos(p.pos.x + time2) + sin(p.pos.y + time1))));
		// drawImage(pillar, posX, posY); // Boring
		var topSize = w;
		var bottomHeight = h - topSize - offset;
		var topY = posY + offset;
		var bottomY = posY + topSize + offset;
		drawImage(
		pillar,
		0, 0, topSize, topSize,
		posX, topY, topSize, topSize);

		drawImage(
		pillar,
		0, topSize + offset, topSize, bottomHeight,
		posX, bottomY, topSize, bottomHeight);

	});
}