window.onload = function() {
    Particles.init({
      selector: '.background',
      color: '#e4cece',
      connectParticles: true,
      minDistance: 100,
      showCube: true,
      shape: 'square',
    });
};

const options = {
    root: null,
    rootMargin: "-40% 0px",
    threshold: 0
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
    entry.target.classList.add("active");
    }
  });
}, options);

const boxElList = document.querySelectorAll(".animation");
boxElList.forEach((element) => {
    animationObserver.observe(element);
});

particlesJS("cert_kamifubuki",{
	"particles":{
		"number":{
			"value": 80,
			"density":{
				"enable":false,
				"value_area":400
			}
		},
		"color": {
        "value": ["#EA5532", "#F6AD3C", "#FFF33F", "#00A95F", "#00ADA9", "#00AFEC","#4D4398", "#E85298"]//紙吹雪の色の数を増やすことが出来る
		},
		"shape":{
			"type":"polygon",
			"stroke":{
				"width":0,
			},
			"polygon":{
				"nb_sides": 4
			}
			},
			"opacity":{
				"value":1,
				"random":false,
				"anim":{
					"enable":true,
					"speed":20,
					"opacity_min":0,
					"sync":false
				}
			},
			"size":{
				"value":5.305992965476349,
				"random": true,
				"anim":{
					"enable":true,
					"speed":1.345709068776642,
					"size_min":0.8,
					"sync":false
				}
			},
			"line_linked":{
				"enable":false,
			},
			"move":{
				"enable":true,
			"speed": 6,
			"direction":"bottom",
			"random":false,
			"straight":false,
			"out_mode":"out",
			"bounce":false,
				"attract":{
					"enable":false,
					"rotateX":600,
					"rotateY":1200
				}
			}
		},
		"interactivity":{
			"detect_on":"canvas",
			"events":{
				"onhover":{
					"enable":false,
				},
				"onclick":{
					"enable":false,
				},
				"resize":true
			},
		},
		"retina_detect":true
	});