var gameOptions = {
	height: 450,
	width: 700,
	nEnemies: 30,
	padding: 20
};

// var axes = {
// 	x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
// 	y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
// };

var enemyNum = 10;

var board = d3.select('.board')
	.append('svg:svg')
	.attr('height', 480)
	.attr('width', 960)
	.style('border', '1px solid black')
	.style('margin', 'auto 15%');


var createRandomCoord = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var data = d3.range(enemyNum).map(function() {
  return {x:createRandomCoord(20, 940), y:createRandomCoord(20, 460)};
});

var enemy = board.selectAll('image')
	.data(data)
	.enter()
	.append('image')
	.attr('xlink:href', 'asteroid.png')
	.attr('x', function(d) {return d.x;})
	.attr('y', function(d) {return d.y;})
	.attr('height', 20)
	.attr('width', 20);


var enemyRandomAttack = function() {
  var coordData = [];
  for ( var i = 0; i < enemyNum; i++ ) {
    coordData.push({
      x: createRandomCoord(20, 940),
      y: createRandomCoord(20, 460)
    });
   }

	enemy
  .data(coordData)
	  .transition()
	  .duration(1000)
		.attr('x', function(d) {
			return d.x;
		})
		.attr('y', function(d) {
		  return d.y;
		});
};

enemyRandomAttack();
setInterval(enemyRandomAttack, 1000);


var drag = d3.behavior.drag()
  .on('drag', function(d) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d3.select(this).attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    });
  });

var hero = board.selectAll('circle')
	.data([{x: 150, y: 150, r:20, ry:20}])
	.enter()
	.append('circle')
	.attr('cx', function(d) {return d.x;})
	.attr('cy', function(d) {return d.y;})
	.attr('r', function(d) {return d.r;})
	.attr('style', 'fill: green')
	.call(drag);





// var currentScore = d3.select('.current');
// var highscore = d3.select('.highscore');

// var gameStats = {
// 	score: 0,
// 	bestScore: 0
// };

// var updateScore = function() {
// 	currentScore
// 		.text(gameStats.score.toString());
// };

// var updateBestScore = function() {
// 	gameStats.bestScore = Math.max(gameStats, gameStats.score);
// 	highscore
// 		.text(gameStats.bestScore.toString());
// };

// var Player = function() {
// 	this.path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';
// 	this.fill = '#ff6600';
// 	this.x = 0;
// 	this.y = 0;
// 	this.r = 5;
// };








