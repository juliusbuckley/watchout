var gameOptions = {
	height: 450,
	width: 700,
	nEnemies: 30,
	padding: 20
};

var gameStats = {
	score: 0,
	bestScore: 0,
  collisions: 0
  apples:0
};

var enemyNum = 10;

var data = d3.range(enemyNum).map(function() {
  return {x:createRandomCoord(20, 940), y:createRandomCoord(20, 460)};
});

var board = d3.select('.board')
	.append('svg:svg')
	.attr('height', 600) //480
	.attr('width', 1000) //960
	.style('border', '1px solid black')
	.style('margin', 'auto 15%')
	.style('background-image','url(space.jpg)');

var currentScore = d3.select('.current-score');
var highscore = d3.select('.current-highscore');
var collision = d3.select('.current-collision');
var horchata = d3.select('.current-collision');

function createRandomCoord(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateScore() {
	currentScore
		.text(gameStats.score.toString());
		gameStats.score++;
}

function updateScore2() {
  currentScore
    .text(gameStats.score.toString());
    gameStats.score++;
}

function updateBestScore() {
	gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
	highscore
		.text(gameStats.bestScore.toString());
}

function enemyRandomAttack() {
	var coordData = [];
  for ( var i = 0; i < enemyNum; i++ ) {
    coordData.push({
      x: createRandomCoord(50, 950),
      y: createRandomCoord(50, 550)
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
}

function collison() {
	enemy
		.each(function(d) {
			var a = Math.abs(hero.attr('x') - d.x);
	    var b = Math.abs(hero.attr('y') - d.y);
	    var distanceSquared = Math.sqrt(a) + Math.sqrt(b);
	    var distance = Math.round(Math.sqrt(distanceSquared));
	    if (distance <= 4) {
	    	gameStats.score = 0;
        gameStats.collisions++;
        collision
          .text(gameStats.collisions.toString());

	    }
		});
}

var enemy = board.selectAll('image enemy')
	.data(data)
	.enter()
	.append('image')
	.attr('xlink:href', 'kryptonite.gif')
	.attr('x', function(d) {return d.x;})
	.attr('y', function(d) {return d.y;})
	.attr('height', 50)
	.attr('width', 50);

var drag = d3.behavior.drag()
  .on('drag', function(d) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d3.select(this).attr('x', function(d) {
      return d.x;
    })
    .attr('y', function(d) {
      return d.y;
    });
  });

var hero = board.selectAll('image hero')
	.data([{x: 150, y: 150}])
	.enter()
	.append('image')
	.attr('x', function(d) {return d.x;})
	.attr('y', function(d) {return d.y;})
	.attr('xlink:href', 'hero.png')
	.attr('height', 75)
	.attr('width', 75)
	.call(drag);

enemyRandomAttack();
setInterval(enemyRandomAttack, 1000);
setInterval(collison, 500);
setInterval(updateScore);
setInterval(updateBestScore);









