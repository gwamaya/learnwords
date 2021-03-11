OdpowiedziDoPrawej = ['pomidor','marchewka','groszek','kapusta','sałata','pietruszka','burak','fasola','ziemniak','kalafior','papryka','brokuła'];
NazwaP = 'warzywa';

OdpowiedziDoLewej = ['malina','gruszka','śliwka','truskawka','jagoda','wiśnia','czereśnia','pomarańcza','mandarynka','porzeczka'];
NazwaL = 'owoce';
	
nouns = OdpowiedziDoPrawej.concat(OdpowiedziDoLewej);


$('#dobre').html(NazwaP);
$('#zle').html(NazwaL);

locForGood = new Array;
locForBad = new Array;

/* calculate all possible positions on the screen --> array: positions */
positions = new Array;
for(i=0;i<=3;++i){
	for(j=0;j<10;++j){

		/* scater those positions a bit by adding random shift*/
		randomize = Math.floor(26*Math.random())-15;

	positions.push([360+i*180+randomize,220+j*55+randomize]);
	}

}

/* calculate destinations after an object is clicked: bad and good destinations*/
for (i=1;i<=14;++i){
	xGoodRandom = Math.floor(10*Math.random())+18;
	yGood = 130+i*40;
	locForGood.push([xGoodRandom+165,yGood]);
	locForBad.push([xGoodRandom-255,yGood]);
}

/* this is an address of where the rectangle goes after being clicked */
meta = new Array;

function cos(nazwa,typ,x,y,wzor){
	this.nazwa=nazwa
	this.typ=typ
	this.x=x
	this.y=y
	this.wzor=wzor

	$('body').append("<button id="+nazwa+">"+nazwa+"</button>");
	$('#'+nazwa).offset({top:y,left:x});

	$('#'+nazwa).click(function(){
				
		if (typ==wzor){
			meta = locForGood.pop();
			$('#'+nazwa).css('font-size','20px').css('background', 'rgb(255, 255, 255)');
			$('#'+nazwa).animate({top:meta[1]+'px',left:meta[0]+'px'},'slow','swing');
		} else {
			meta = locForBad.pop();
			$('#'+nazwa).css('font-size','20px').css('background', 'rgb(255, 255, 255)');
			$('#'+nazwa).animate({top:meta[1]+'px',left:meta[0]+1310+'px'},'slow','swing');
		}
	})

	this.dobrze = function(){
		$(this).css('background', 'lightgreen').animate({top:'650px'},'slow','linear',disapear);
	}

	this.zle = function(){
		$(this).css('background', 'red');
	}
	
	function juja(){
		$('#'+nazwa).remove();
	}
}

cosik = new Array;
losowaPozyc = new Array;
selectedPositions = new Array;

cosikIndex = 1;




/* pick randomly n-locations from all possible positions, where n- is the number of elements in nouns array   */
for (i=1;i<=nouns.length;++i){
	losowyIndex = Math.floor(Math.random()*positions.length);	
	losowaPozyc = positions[losowyIndex];
		
	selectedPositions.push(losowaPozyc);
	positions.splice(losowyIndex,1);
	
	if(positions.length==0){break}
}

/* Now, create and display objects for each selected position*/
 nouns.forEach(klik);

 function klik(element,index,array)
 {
	if (OdpowiedziDoPrawej.indexOf(element)>-1){
		typ=NazwaP
	} else {
		typ=NazwaL
	}
	cosik[element]=new cos(element,typ,selectedPositions[0][0],selectedPositions[0][1],NazwaP)
	selectedPositions.shift();
 }

 

