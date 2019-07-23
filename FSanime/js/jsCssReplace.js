function change(a){
$im_loading.show();
var css=document.getElementById("dynamicCss");
var txt=document.getElementById("gallery-title");

switch(a){
	case 0: 
			$thumb_imgs.each(function(){                     
                        this.src=this.src.replace('holiday','world');
				});
			css.setAttribute("href","FSanime/css/spring.css");
			txt.innerHTML="Hello World";
			break;		
	case 1: 
			$thumb_imgs.each(function(){
					this.src=this.src.replace('world','daily');
			});
			
			css.setAttribute("href","FSanime/css/summer.css");
			txt.innerHTML="Live For Tomorrow";
			break;
		case 2: $thumb_imgs.each(function(){
					this.src=this.src.replace('daily','family');
				});
			css.setAttribute("href","FSanime/css/autumn.css");
			txt.innerHTML="We Are Family";break;
		case 3: $thumb_imgs.each(function(){
					this.src=this.src.replace('family','holiday');
				});
			css.setAttribute("href","FSanime/css/winter.css");
			txt.innerHTML="Happy Anniversary";break;
	default: return;
}
removeNavigation();
start();
}
