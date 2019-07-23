//friendship generatpr
  var clickCount=0;
(function() {
  var svgFx1 = document.querySelector('.letters--effect-1'),
    phrase1 = new Phrase(svgFx1, {
      pathOpacityAnim : true,
      pathAnimation: {
        duration: 2000,
        easing: 'easeOutSine',
        delay: 200
      }
    }),
    phrase2 = new Phrase(svgFx1, {
      pathOpacityAnim: true,
      outAnimation: {
        scale: 0,
        opacity: [1, 0],
        duration: 250,
        easing: 'easeInOutQuad'
      },
      inAnimation: {
        delay: 150,
        properties: {
          scale: {
            value: function() {
              return [0, 1];
            },
            duration: 900,
            elasticity: 600,
            easing: 'easeOutElastic'
          },
          opacity: {
            value: [0, 1],
            duration: 50,
            easing: 'linear'
          },
        }
      },
      pathAnimation: {
        duration: 700,
        easing: 'easeOutSine',
        delay: 200
      }
    }),
    phrase3 = new Phrase(svgFx1, {
      outAnimation: {
        translateX: -25,
        rotateZ: 20,
        opacity: [1, 0],
        duration: 250,
        easing: 'easeInBack'
      },
      inAnimation: {
        delay: 100,
        properties: {
          translateY: {
            value: function() {
              return [-80, 0];
            },
            duration: 1200,
            elasticity: 500,
            easing: 'easeOutElastic'
          },
          translateX: {
            value: function() {
              return [50, 0];
            },
            duration: 1200,
            elasticity: 500,
            easing: 'easeOutElastic'
          },
          rotateZ: {
            value: [-70, 0],
            duration: 1200,
            elasticity: 500,
            easing: 'easeOutElastic'
          },
          opacity: {
            value: [0, 1],
            duration: 750,
            easing: 'linear'
          },
        }
      },
      pathAnimation: {
        duration: 1400,
        easing: 'easeOutQuint',
        delay: 300
      }
    }),
    phrase4 = new Phrase(svgFx1, {
      outAnimation: {
        translateY: [0, 15],
        opacity: [1, 0],
        duration: 350,
        easing: 'easeInBack'
      },
      inAnimation: {
        delay: 130,
        properties: {
          rotateZ: {
            value: function() {
              return [70, 0];
            },
            duration: 1200,
            //elasticity: 500,
            easing: 'easeOutElastic'
          },
          opacity: {
            value: [0, 1],
            duration: 400,
            easing: 'linear'
          },
        }
      },
      pathAnimation: {
        duration: 1000,
        easing: 'easeOutCubic',
        delay: 400
      }
    }); 
  // Trigger the animations.
  phrase3.animate();
//change the theme  
  document.querySelector('#anni').addEventListener('click', function() { 
    clickCount++;
    let n=clickCount%4;
    switch(n){
      case 0:
        change(0);
        phrase3.animate();
        break;
      case 1:
        change(1);
        phrase4.animate(); 
        break;
      case 2:
        change(2);
        phrase1.animate(); 
        break; 
      case 3:change(3);phrase3.animate(); break;     
      default: return;
    }
  });
})();
//wave generator
  var wave1 = $('#feel-the-wave').wavify({
    height: 80,
    bones: 4,
    amplitude: 60,
    speed: .15
  });

  var wave2 = $('#feel-the-wave-two').wavify({
    height: 60,
    bones: 3,
    amplitude: 40,
    speed: .25
  });
//boat wave in y underwater
TweenMax.to(".boat", 3, {
  y: -30,
  repeat:-1,
  yoyo: true,
  ease: Linear.easeNone, 
},0.2);
//boat wave in x
var vWid=document.documentElement.clientWidth;
var vHei=document.documentElement.clientHeight;
TweenMax.to(".boat", 4, {
  x: function(index, target) {
    return (index -1) * vWid*0.95 // adjust  travel length according to width
  }
});

//star Animetion
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var starDensity = .216;
var speedCoeff = .05;
var width;
var height;
var starCount;
var circleRadius;
var circleCenter;
var first = true;
var giantColor = '180,184,240';
var starColor = '226,225,142';
var cometColor = '226,225,224';
var canva = document.getElementById('universe');
var stars = [];

windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

createUniverse();

function createUniverse() {
  universe = canva.getContext('2d');

  for (var i = 0; i < starCount; i++) {
    stars[i] = new Star();
    stars[i].reset();
  }

  draw();
}

function draw() {
  universe.clearRect(0, 0, width, height);

  var starsLength = stars.length;

  for (var i = 0; i < starsLength; i++) {
    var star = stars[i];
    star.move();
    star.fadeIn();
    star.fadeOut();
    star.draw();
  }

  window.requestAnimationFrame(draw);
}

function Star() {

  this.reset = function() {
    this.giant = getProbability(3);
    this.comet = this.giant || first ? false : getProbability(10);
    this.x = getRandInterval(0, width - 10);
    this.y = getRandInterval(0, height);
    this.r = getRandInterval(1.1, 2.6);
    this.dx = getRandInterval(speedCoeff, 6 * speedCoeff) + (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120) + speedCoeff * 2;
    this.dy = -getRandInterval(speedCoeff, 6 * speedCoeff) - (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120);
    this.fadingOut = null;
    this.fadingIn = true;
    this.opacity = 0;
    this.opacityTresh = getRandInterval(.2, 1 - (this.comet + 1 - 1) * .4);
    this.do = getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * .001;
  };

  this.fadeIn = function() {
    if (this.fadingIn) {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true;
      this.opacity += this.do;
    }
  };

  this.fadeOut = function() {
    if (this.fadingOut) {
      this.fadingOut = this.opacity < 0 ? false : true;
      this.opacity -= this.do / 2;
      if (this.x > width || this.y < 0) {
        this.fadingOut = false;
        this.reset();
      }
    }
  };

  this.draw = function() {
    universe.beginPath();

    if (this.giant) {
      universe.fillStyle = 'rgba(' + giantColor + ',' + this.opacity + ')';
      universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    } else if (this.comet) {
      universe.fillStyle = 'rgba(' + cometColor + ',' + this.opacity + ')';
      universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

      //comet tail
      for (var i = 0; i < 30; i++) {
        universe.fillStyle = 'rgba(' + cometColor + ',' + (this.opacity - (this.opacity / 20) * i) + ')';
        universe.rect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2);
        universe.fill();
      }
    } else {
      universe.fillStyle = 'rgba(' + starColor + ',' + this.opacity + ')';
      universe.rect(this.x, this.y, this.r, this.r);
    }

    universe.closePath();
    universe.fill();
  };

  this.move = function() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.fadingOut === false) {
      this.reset();
    }
    if (this.x > width - (width / 4) || this.y < 0) {
      this.fadingOut = true;
    }
  };

  (function() {
    setTimeout(function() {
      first = false;
    }, 50)
  })()
}

function getProbability(percents) {
  return ((Math.floor(Math.random() * 1000) + 1) < percents * 10);
}

function getRandInterval(min, max) {
  return (Math.random() * (max - min) + min);
}

function windowResizeHandler() {
  width = window.innerWidth;
  height = window.innerHeight;
  starCount = width * starDensity;
  circleRadius = (width > height ? height / 2 : width / 2);
  circleCenter = {
    x: width / 2,
    y: height / 2
  }

  canva.setAttribute('width', width);
  canva.setAttribute('height', height);
}

  /* gallery and fs incon transition anime*/
        $(function(){
        $("#start").click(
            function(){
                 if($("#im_wrapper").css("display")=='none'){
                    document.getElementById("fsIcon").style.display="none";
                    $("#im_wrapper").slideDown();
                    disperse();
                    document.getElementById("start").innerHTML="Welcome";
                 }else{
                    $("#im_wrapper").slideUp();
                    removeNavigation();
                    document.getElementById("fsIcon").style.display="block";
                    document.getElementById("start").innerHTML="Gallery";
                 }
            });
        });
