export default function(part) {
  let {
    Point,
    points,
    Path,
    paths,
    complete,
    sa,
    paperless,
    measurements,
    options,
    macro
  } = part.shorthand()
  // Design pattern here
  let tweak = 1
  let target = (measurements.head * options.neckRatio) /4
  let delta
  do {
  	points.right = new Point(tweak * measurements.head / 10, 0)
  	points.bottom = new Point(0, tweak * measurements.head / 12)

  	points.rightCp1 = points.right.shift(90, points.bottom.dy(points.right)/2)
  	points.bottomCp2 = points.bottom.shift(0, points.bottom.dx(points.right)/2)

    points.rightCp2 = points.rightCp1.flipY()
    points.bottomCp1 = points.bottomCp2.flipX()

    points.left = points.right.flipX()
    points.leftCp1 = points.rightCp2.flipX()
    points.leftCp2 = points.rightCp1.flipX()

    points.top = points.bottom.flipY()
    points.topCp1 = points.bottomCp2.flipY()
    points.topCp2 = points.bottomCp1.flipY()

    let width = measurements.head * options.widthRatio
    let length = measurements.head * options.lengthRatio

    points.topLeft = new Point(
      width / -2,
      points.top.y - (width / 2 - points.right.x)
    );
    points.topRight = points.topLeft.shift(0, width)
    points.bottomLeft = points.topLeft.shift(-90, length)
    points.bottomRight = points.topRight.shift(-90, length)

    points.edgeLeft = new Point(points.topLeft.x, points.left.y)
    points.edgeRight = new Point(points.topRight.x, points.right.y)
    points.edgeTop = new Point(0, points.topLeft.y)

    points.edgeLeftCp = points.edgeLeft.shiftFractionTowards(points.topLeft, 0.5)
    points.edgeRightCp = points.edgeLeftCp.flipX()
    points.edgeTopLeftCp = points.edgeTop.shiftFractionTowards(
      points.topLeft,
      0.5
    )

    paths.seam = new Path()
      .move(points.edgeLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.edgeRight)
      .curve(
        points.edgeRightCp,
        points.edgeTopRightCp,
        points.tipLeftTopStart
      )
      .curve(
        points.tipLeftTopCp1,
        points.tipLeftTopCp2,
        points.tipLeftTopEnd
      )
      .curve(
        points.tipLeftBottomCp1,
        points.tipLeftBottomCp2,
        points.tipLeftBottomEnd
      )
      .curve(
        points.topCp1,
        points.rightCp2,
        points.right
      )
      .curve(
        points.rightCp1,
        points.bottomCp2,
        points.bottom
      )
      .curve(
        points.bottomCp1,
        points.leftCp2,
        points.left
      )
      .curve(
        points.leftCp1,
        points.topCp2,
        points.tipRightBottomEnd
      )
      .curve(
        points.tipRightBottomCp2,
        points.tipRightBottomCp1,
        points.tipRightBottomStart
      )
      .curve(
        points.tipRightTopCp2,
        points.tipRightTopCp1,
        points.tipRightTopStart
      )
      .curve(
        points.edgeTopLeftCp,
        points.edgeLeftCp,
        points.edgeLeft
      )
      .close()
      .attr("class", "fabric")

    let strap = points.edgeTop.dy(points.top)

    points.tipRight = points.edgeTop.translate(strap / 2, strap / 2)
    points.tipRightTop = new Point(points.tipRight.x, points.edgeTop.y)
    points.tipRightBottom = new Point(points.tipRight.x, points.top.y)

    macro("round", {
      from: points.edgeTop,
      to: points.tipRight,
      via: points.tipRightTop,
      prefix: "tipRightTop",
      render: false
    })
    macro("round", {
      from: points.tipRight,
      to: points.top,
      via: points.tipRightBottom,
      prefix: "tipRightBottom",
      render: false
    })



    points.snapLeft = points.top.shiftFractionTowards(points.edgeTop, 0.5)

    points.edgeTopRightCp = points.edgeTopLeftCp.flipX()
    points.topCp1 = points.topCp2.flipX()
    points.tipLeftTopStart = points.tipRightTopStart.flipX()
    points.tipLeftTopCp1 = points.tipRightTopCp1.flipX()
    points.tipLeftTopCp2 = points.tipRightTopCp2.flipX()
    points.tipLeftTopEnd = points.tipRightTopEnd.flipX()
    points.tipLeftBottomStart = points.tipRightBottomStart.flipX()
    points.tipLeftBottomCp1 = points.tipRightBottomCp1.flipX()
    points.tipLeftBottomCp2 = points.tipRightBottomCp2.flipX()
    points.tipLeftBottomEnd = points.tipRightBottomEnd.flipX()
    points.snapRight = points.snapLeft.flipX()

    let rotateThese = [
      "edgeTopLeftCp",
      "edgeTop",
      "tipRight",
      "tipRightTop",
      "tipRightTopStart",
      "tipRightTopCp1",
      "tipRightTopCp2",
      "tipRightTopEnd",
      "tipRightBottomStart",
      "tipRightBottomCp1",
      "tipRightBottomCp2",
      "tipRightBottomEnd",
      "tipRightBottom",
      "top",
      "topCp2"
    ]

    while (points.tipRightBottomStart.x > -1) {
      for (let p of rotateThese) points[p] = points[p].rotate(1, points.edgeLeft)
    }

  	delta = paths.neck.length() - target
    if (delta > 0) tweak = tweak * 0.99
    else tweak = tweak * 1.02
  } while (Math.abs(delta) > 1)


  // Complete?
  if (complete) {
    if (sa) {
    }
    // Paperless?
    if (paperless) {
    }
  }
  return part
}
