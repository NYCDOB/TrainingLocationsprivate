(function() {
this.Element && function(ElementPrototype) {
    ElementPrototype.matches = ElementPrototype.matches ||
    ElementPrototype.matchesSelector ||
    ElementPrototype.webkitMatchesSelector ||
    ElementPrototype.msMatchesSelector ||
    function(selector) {
        var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
        while (nodes[++i] && nodes[i] != node);
        return !!nodes[i];
    }
}(Element.prototype);

// closest polyfill
this.Element && function(ElementPrototype) {
    ElementPrototype.closest = ElementPrototype.closest ||
    function(selector) {
        var el = this;
        while (el.matches && !el.matches(selector)) el = el.parentNode;
        return el.matches ? el : null;
    }
}(Element.prototype);



	function convertDate(theDate) {
		return (((theDate.split('/')[0] < 10) ? '0'+theDate.split('/')[0] : theDate.split('/')[0] )+((theDate.split('/')[1] < 10 )? '0'+theDate.split('/')[1] : theDate.split('/')[1])+ theDate.split('/')[2] );}

	function convertTime(theTime) {
		 return (theTime == "" ? "0000":theTime.split(' ')[1][0]=="P" && theTime.split(' ')[0].split(':')[0]!=12)
		 ? "" +
		 (parseInt(theTime.split(' ')[0].split(':')[0])+12) + "" + theTime.split(' ')[0].split(':')[1] : ""+ theTime.split(' ')[0].split(':')[0] < 10 ? '0' +
		 theTime.split(' ')[0].split(':')[0] + theTime.split(' ')[0].split(':')[1] : theTime.split(' ')[0].split(':')[0] + "" + theTime.split(' ')[0].split(':')[1]
		}
		
	function manualExpand( theLocation,vZoomedFromSearch) { 
		var locationParent=document.querySelector("[id*="+theLocation +"]").getAttribute("parent-id");
		var qqq=document.querySelector("tr[row-id='"+locationParent+"']" );
		$(qqq).removeClass("tbltree-collapsed").addClass("tbltree-expanded");
		document.querySelector("tr[row-id='"+locationParent+"']" ).setAttribute("tree-state","shown");
		qqq=document.querySelector("tr[row-id='"+locationParent+"'] .tbltree-expander" )
		$(qqq).removeClass("tbltree-expander-collapsed").addClass("tbltree-expander-expanded");
		$('#locationTable').tbltree('expand', locationParent);
		var thisLocation=document.querySelector("[id*="+theLocation +"]").getAttribute("row-id");
		qqq=document.querySelector("tr[row-id='"+thisLocation+"']" );
		$(qqq).removeClass("tbltree-collapsed").addClass("tbltree-expanded");
		document.querySelector("tr[row-id='"+thisLocation+"']" ).setAttribute("tree-state","shown")	;
		qqq=document.querySelector("tr[row-id='"+thisLocation+"'] .tbltree-expander" );
		$(qqq).removeClass("tbltree-expander-collapsed").addClass("tbltree-expander-expanded");
		$('#locationTable').tbltree('expand', thisLocation);
		//document.querySelector("tr[row-id='"+thisLocation+"']" ).scrollIntoView(true,{behavior: "smooth", block: "start", inline: "nearest"});
		( document.querySelector(".zoomed") ) ?  $(".zoomed").removeClass("zoomed") : 0;
		qqq=document.querySelector("tr[row-id='"+thisLocation+"']" );
		$(qqq).addClass("zoomed");
	}		
	function rowExpand (vTargetRowElement) {
		vTargetRowElement.setAttribute("tree-state","shown");
		$( vTargetRowElement ).removeClass( "tbltree-collapsed" ).addClass( "tbltree-expanded" );
		$(vTargetRowElement[0]+".tbltree-expander" ).removeClass( "tbltree-expander-collapsed" ).addClass( "tbltree-expander-expanded" );
		( vTargetRowElement.nextSibling.style.display="table-row" ) || 0; 
		$('#locationTable').tbltree('expand', vTargetRowElement.getAttribute("row-id"));
	}
	function rowCollapse (vTargetRowElement) {
		vTargetRowElement.setAttribute("tree-state","hidden");
		$( vTargetRowElement ).removeClass( "tbltree-expanded" ).addClass( "tbltree-collapsed" );		
		//vTargetRowElement.querySelector('.tbltree-expander').classList.replace("tbltree-expander-expanded","tbltree-expander-collapsed");
		$( vTargetRowElement[0]+".tbltree-expander" ).removeClass( "tbltree-expander-expanded" ).addClass( "tbltree-expander-collapsed" );
		( vTargetRowElement.nextSibling.style.display="none" ) || 0; 
		$('#locationTable').tbltree('collapse', vTargetRowElement.getAttribute("row-id")); 
	}
	function collapseAll() {
		var expandedRows = document.querySelectorAll(".tbltree-expanded") ;   
		for (i=0; i<expandedRows.length; i++){  
				var theRow = expandedRows[i].getAttribute("row-id"); 
				$('#locationTable').tbltree('collapse', theRow);
				$(expandedRows[i]).removeClass( "tbltree-expanded" ).addClass( "tbltree-collapsed" );
				expandedRows[i].setAttribute("tree-state","hidden");
				//expandedRows[i].getElementsByTagName("span")[1].classList.replace("tbltree-expander-expanded","tbltree-expander-collapsed"); }}
				var qqq=expandedRows[i].getElementsByTagName("span")[1];
				$(qqq).removeClass( "tbltree-expander-expanded" ).addClass( "tbltree-expander-collapsed" ); }
	}
	function manualCollapse(removeZoomed) {
		(removeZoomed) ? removeZoomedClass() : null;
		var expandedRows = document.querySelectorAll("tr[class='tbltree-expanded'][is-leaf='false']");  //get the tbl tree rows
		for (i=0; i<expandedRows.length; i++){  
			var theRow = expandedRows[i].getAttribute("row-id"); 
			$('#locationTable').tbltree('collapse', theRow);
			$(expandedRows[i]).removeClass("tbltree-expanded").addClass("tbltree-collapsed")	;
			expandedRows[i].setAttribute("tree-state","hidden");
			var qqq=expandedRows[i].getElementsByTagName("span")[1];
			$(qqq).removeClass("tbltree-expander-expanded").addClass("tbltree-expander-collapsed");} 
	}
	function resetDropdowns() {
		$("#dropdownCourses").val('allCourses');
		$("#dropdownSST").val('sstAll');
		$("#dropdownLanguages").val('all');
		//document.querySelector("#onlinecheck").checked=false;//onlinecheck=false;
		selectedCourse = "allCourses";
		selectedSST = "sstAll";
		selectedLanguage = "all";
	}
	function removeZoomedClass() {
		var vZoomed=document.querySelector("tr[level='1'].zoomed");
		var vSearchZoomed=document.querySelector("tr[level='1'].searchZoomed");
		//if (vZoomed) { vZoomed.classList.remove("zoomed") }	;	
		if (vZoomed) { $(vZoomed).removeClass("zoomed") }	;	
		//(vSearchZoomed) ? vSearchZoomed.classList.remove("searchZoomed"):0;
		(vSearchZoomed) ? $(vSearchZoomed).removeClass("searchZoomed"):0;
		if (vZoomed || vSearchZoomed) {
		   map.setView(defaultLatLng, 10); 
		}
	}
	function zoomTo(latlong){
			if (latlong[0]==0 && latlong[1]==0){return;}
			map.setView(latlong,15);  //requested by John D.  Need to see other points around location
			qqq=document.querySelectorAll('svg g circle[latlng="'+latlong[0]+ ','+latlong[1]+'"]');
			for (var i=0;i<qqq.length;i++){
				temp=qqq[i].className.baseVal;
				$(temp).attr("class", temp + " clickedPoint");
			}			
	}			
var defaultLatLng = [40.791384, -73.883770];
var map = L.map('map').setView(defaultLatLng, 10);
var options = {
    key: '9277c3027dc546989ea28d048ffa9ee7', // your OpenCage API key
    limit: 5,
    position: 'topright',
	proximity: '40.791384, -73.883770',	
    placeholder: 'e.g. 280 Broadway NYC', // the text in the empty search box
    errorMessage: 'Nothing found.',
    showResultIcons: false,
    collapsed: true,
    expand: 'click',
    addResultToMap: true   //, 
}; 
var control = L.Control.openCageSearch(options).addTo(map);

control.markGeocode = function (result) {
            L.Control.OpenCageSearch.instance = this;
            if (result.bounds) {
                this._map.fitBounds(result.bounds);
            } else {
                this._map.panTo(result.center);
            }
            if (this._geocodeMarker) {
                this._map.removeLayer(this._geocodeMarker);
            }			
			var popupDiv=document.createElement("div");
			var locationText = document.createElement("h5");
			locationText.innerText = result.name;
			var closeMarkerDiv = document.createElement("div")
			closeMarkerDiv.style.textAlign = "center";
			var closeMarkerDivButton = document.createElement("button");
			closeMarkerDivButton.innerText="Remove";
			closeMarkerDivButton.setAttribute("title","Remove marker from map");		
			closeMarkerDivButton.setAttribute("type","button");
			//closeMarkerDivButton.classList.add("btn","removemarkerbutton");
			$(closeMarkerDivButton).addClass("btn","removemarkerbutton");
			
			closeMarkerDivButton.addEventListener("click",function(e){L.Control.OpenCageSearch.instance._map.removeLayer(L.Control.OpenCageSearch.instance._geocodeMarker)});
			closeMarkerDiv.appendChild(closeMarkerDivButton);
			popupDiv.appendChild(locationText);
			popupDiv.appendChild(closeMarkerDiv);
            this._geocodeMarker = new L.Marker(result.center)
                .bindPopup(popupDiv)
                .addTo(this._map)
                .openPopup();
            return this;
        };

function selectOpenCageSearchResult() {
true;
}

function removeSearchMarkers () {
	markerElements=["leaflet-shadow-pane","leaflet-marker-pane","leaflet-popup-pane"]
	for(var i=0; i<markerElements.length; i++) {
			var markerElement=document.querySelector("."+markerElements[i]+" :first-child");
			(markerElement) ? markerElement.remove(): null;
	}
}

	L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png',    {attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

	var tooltip = d3.select('body').append('div')
		.on('mouseover', function(d, i){
			tooltip.transition().duration(0);
		})
		.on('mouseout', function(d, i){
			tooltip.transition().delay(500).style('visibility', 'hidden');
		})
		.attr('class', 'tooltip');

	var width = $("#map").width(),
		height = $("#map").height(),
		points = [],
		//points = new Set(),
		filteredData,	
		latLngs = [],
		selectedCourse="allCourses",
		selectedSST="sstAll",
		selectedLanguage="all",
		//onlinecheck=false,
		selectedRecord,
		selectedCourse_cpID,
		selectedSST_cpID;
	var pointsOverlay = L.d3SvgOverlay(function(sel,proj){
		var pointsUpd = sel.selectAll('circle').data(points);
		pointsUpd.enter()
			.append('circle')
			.attr('cx',function(d){return proj.latLngToLayerPoint(d.latLng).x;})  
			.attr('cy',function(d){return proj.latLngToLayerPoint(d.latLng).y;})
			.attr('latlng',function(d){return   d.latLng} )
			.attr('class', function(d){	return "point";	})
			.on('click', function(d){
					var vClickedPoints = document.querySelectorAll('.clickedPoint');					
					for (var ctr=0,thelength=vClickedPoints.length; ctr < thelength;ctr++) {
						//vClickedPoints[ctr].classList.remove("clickedPoint");
						vClickedPoints[ctr].className.baseVal="point";						
					}
					//this.classList.add("clickedPoint")	
					var qqq=this;
					qqq.setAttribute("class",qqq.getAttribute("class")+" clickedPoint");
					var vLocationCourses=document.querySelectorAll("tr[parent-id$='"+ d.locID    +"']");
					var vToolTipCourses='';					
					for (var i=0; i < vLocationCourses.length;i++) {
						vToolTipCourses += "<br><span>&emsp;&bull; "+vLocationCourses[i].innerText+"</span>";
					}
					vToolTipCourses=
					"<span>"+document.querySelector("tr[row-id*='"+ d.locID +"'][id*='provider'] .detailHead + span").innerText + "</span><br>" + 
					"<span>"+d.full_Address + "</span><br>" + 
					vToolTipCourses;
					tooltip.html(
						vToolTipCourses
					)
					//if (! L.Browser.touch && ! L.Browser.android) {
					if (! L.Browser.android) {
							tooltip.style("visibility", "visible");
					}
					
					if (d3.event.pageX > (width - 200)) {
					   tooltip.style("left", (d3.event.pageX - 350) + "px");
					} else {
					   tooltip.style("left", (d3.event.pageX + 20) + "px")
							.style("top", (d3.event.pageY -30) + "px");
					}
					if (d3.event.pageY > (height - 150)) {
					   tooltip.style("top", (d3.event.pageY -100) + "px");
					} else {
					   tooltip.style("top", (d3.event.pageY -30) + "px");
					}
					manualExpand(d.locID[0], false);  
			})
			.on("mouseover", function(d){				
				//if (!this.classList.contains(".clickedPoint")  ) {
				var temp=this.className.baseVal;
				if (temp.indexOf(".clickedPoint") <0  ) {
						$(this).attr("style", "cursor: pointer; fill: #eef442; fill-opacity: 1;");
				}
				tooltip.transition().duration(0); 
			})
			.on("mouseout", function(d){	
				//if (!this.classList.contains(".clickedPoint")  ) {
				var temp=this.className.baseVal;
				if (temp.indexOf(".clickedPoint") <0 ) {
						$(this).attr("style", "stroke-width: 0px; fill-opacity: .7;");
				}	
				return tooltip.transition().delay(500).style("visibility", "hidden"); 
			});
	;

			pointsUpd.attr('r', 7 / proj.scale);  //POINT RADIUS
	});  //end pointsOverlay definition
							
d3.csv("https://raw.githubusercontent.com/NYCDOB/TrainingLocationsprivate/master/data/CourseTrainingLocations20201202.csv", function(data) {
	if (!data) {  //when there is a problem with the returned data
			var element = document.createElement("h3");
			element.appendChild(document.createTextNode("No Data Available"))
			element.style.textAlign="center";
			document.querySelector("#locationTable").appendChild(element);
	} else {
		
		var boros=["Bronx","Brooklyn", "Manhattan","Queens","Staten Island","Outside NYC","WEB",]
		var justKeys = data.map( function(d){ 
						var latlngArr=	 (  !isNaN(parseInt(d.Lat)) &&  !isNaN(parseInt(d.Long)) ) ?  [+d.Lat,+d.Long] : [+0,+0] ;
						d.latLng =latlngArr   //[+d.Lat,+d.Long];;						
						var newStartDate=convertDate(d["Start Date"]);
						var newStartTime = convertTime(d["Start Time"]);
						d.Borough = ( !d.Borough ) ? "Unknown" : d.Borough.trim();//account for empty boro
						d.newBoro=( d.Borough) ? boros.indexOf(d.Borough)+1 : 99; //99=unknown boro
						d.key=	d.newBoro + d.TrainingLocationID +d.CourseID  +	newStartDate + newStartTime +d.Instructor +d.Entry;
						latLngs.push(latlngArr);
									obj={};
									obj["latLng"] = latlngArr   //[+d.Lat,+d.Long];
									obj["full_Address"] = d.Location;
									obj["locID"] = [d.TrainingLocationID];
									points.push(obj);
						return d.key; 					
		}) ;
		pointsOverlay.addTo(map);
		justKeys.sort();
		var languages = ["Arabic","Bengali","Chinese","English","Hatian Creole",
			"Georgian","Hindi","Italian","Korean","Polish","Punjabi","Russian","Spanish","Urdu"];
		buildTblTreeElements(data, justKeys, languages);  
		$("#locationTable").tbltree(  
						{initState: "collapsed"});
		$("#locationTable").on("click", "tr[level='0']", function(event){ 
					if ( event.target.className.indexOf("tbltree-expander") < 0  ) {
						//  uses polyfill just in case						
						var vTargetRow=document.querySelector("[row-id='"+   this.closest("tr").getAttribute("row-id") +  "']");
						if ( vTargetRow.className.indexOf("tbltree-collapsed") >= 0 ) {
								rowExpand(vTargetRow); 
						} else {
								rowCollapse(vTargetRow);
						}
						
/*
						var vTargetRow=$("[row-id='"+   this.closest("tr").getAttribute("row-id") +  "']");
						if ( vTargetRow[0].classList.contains("tbltree-collapsed")  ) {
								rowExpand(vTargetRow[0]); 
						} else {
								rowCollapse(vTargetRow[0]);
						}
*/
					}			
		})		
		$("#locationTable").on("click", "tr", function(event){   //per John request, when select entire BORO line, expand it
			if (this.className.indexOf("tbltree-expanded") >=0 && this.nextSibling ) {
				//5/21/2020  
				//$('body').scrollTop(0);
				this.nextSibling.scrollIntoView();
				true;
			}
		})		
		$("#locationTable").on("click", "tr[level='1'] span:nth-child(3)", function(event){
			vClickedPoints = document.querySelectorAll('.clickedPoint');
			for (var ctr=0,thelength=vClickedPoints.length; ctr < thelength;ctr++) {
				$(vClickedPoints[ctr]).removeClass("clickedPoint");
			}
			var vParentRow = event.target.closest("tr[level='1']");
			if ( vParentRow.className.indexOf("zoomed") <0 ) { 
				( document.querySelector(".zoomed") ) ?  $(".zoomed").removeClass("zoomed") : 0; 
				$(vParentRow).addClass("zoomed") 
				var vLocationID =  vParentRow.getAttribute("id")
				var vTargetLatLng=null;
				for ( var ctr=0;ctr<data.length;ctr++) { 
						if (     data[ctr].TrainingLocationID== vLocationID.substring( vLocationID.indexOf('__')+2 )) {
								vTargetLatLng=data[ctr].latLng;
								break;
				}}
				zoomTo(vTargetLatLng);
			} 
		}) 
			d3.select("#dropdownCourses").on('change', function(){
				selectedCourse = d3.select(this).property('value');
			});
			d3.select("#dropdownSST").on('change', function(){
				selectedSST = d3.select(this).property('value');
			});
			d3.select("#dropdownLanguages").on('change', function(){
				selectedLanguage = d3.select(this).property('value');
			});			
			var filterClick = document.querySelector('.fltr_btn');
			filterClick.onclick = function(){
					event.preventDefault();
					$(".notFoundRow").css("display","none") ;
					document.querySelector(".textSearchResults").style.display="none";
					//( document.querySelector(".zoomed") ) ?  document.querySelector(".zoomed").classList.remove("zoomed") : 0;
					( document.querySelector(".zoomed") ) ?  $(".zoomed").removeClass("zoomed") : 0;					
					selectedCourse = $( "#dropdownCourses option:selected" ).val();
					selectedSST = $( "#dropdownSST option:selected" ).val();
					selectedLanguage = $( "#dropdownLanguages option:selected" ).val();
					filterQry(selectedCourse, selectedSST, selectedLanguage);
			};

			$('.resetall').click( function(e){   //reset everything!
					e.preventDefault();
					document.querySelector("#ood").style.display="none";
					resetDropdowns();
					map.removeLayer(pointsOverlay);		
					removeSearchMarkers();
					resetMapArrays(	data) ;
					document.querySelector(".textSearchResults").style.display="none";
					var qqq=document.querySelectorAll(".notMatched");for(i=0;i<qqq.length;i++) {$(qqq[i]).removeClass("notMatched")}
					qqq=document.querySelectorAll(".clickedPoint");for(i=0;i<qqq.length;i++) {$(qqq[i]).removeClass("clickedPoint")}
					qqq=document.querySelectorAll(".zoomed");for(i=0;i<qqq.length;i++) {$(qqq[i]).removeClass("zoomed")}
					pointsOverlay.addTo(map);
					map.setView(defaultLatLng, 10);
					$(this).attr("title","Reset All");					
					//manualCollapse(removeZoomed=true)
					manualCollapse(true)
					$(".notFoundRow").css("display","none") ;
					$(".searchZoomed").removeClass("searchZoomed");
					$(".zoomed").removeClass("zoomed");
					var zoomedLocation=document.querySelectorAll("tr[level='1'].zoomed");
					( document.querySelector(".leaflet-popup-pane").firstChild != null   ) 
					&& L.Control.OpenCageSearch.instance._map.removeLayer(L.Control.OpenCageSearch.instance._geocodeMarker);  });  //end clear map+table event
			
			function filterQry(selectedCourse, selectedSST, selectedLanguage){
					var selectedCourse_cpID = data.filter(function(d, index, arrayName){
									return (	(d.CourseID == selectedCourse^selectedCourse=="allCourses") &&
												((selectedSST=="sstYes" && d.SST=="Y"?1:0) + (selectedSST=="sstNo" && d.SST=="N"?1:0)+(selectedSST=="sstAll" ? 1:0)==1)  &&
												( selectedLanguage == "all" || d.Language.indexOf(selectedLanguage) > -1 )
											)}); 
				points=[];	
				//document.querySelectorAll(".notMatched").forEach( function(item){item.classList.remove("notMatched")});				
				var qqq=document.querySelectorAll(".notMatched");
				for(i=0;i<qqq.length;i++){ 
				   $(qqq[i]).removeClass("notMatched") 
				}
				
							resetMapArrays(	selectedCourse_cpID) ;  
							map.removeLayer(pointsOverlay); 
							pointsOverlay.addTo(map);	
							collapseAll(); 
							var allCoursesFiltered = selectedCourse_cpID.length == data.length ?  true: false;
							if ( allCoursesFiltered )  {
								map.setView(defaultLatLng, 10);
								$(".searchZoomed").removeClass("searchZoomed");	
							}  else  {
								if ( data.length != selectedCourse_cpID.length) { 
											document.querySelector(".textSearchResults").textContent = selectedCourse_cpID.length+" Courses Found" ;
											document.querySelector(".textSearchResults").style.display="block" //"inline" ;
								}			
								zoom(latLngs);
								var vBoros=new Set();
								var vLocations=new Set();
								var vCourses=new Set();	
								var fullkey=new Set();
								selectedCourse_cpID.map ( function (item, index) {
										vBoros.add(item.Borough); 
										vLocations.add(item.TrainingLocationID);
										vCourses.add(item.TrainingLocationID+'__'+item.CourseID);
										var newStartDate=convertDate(item["Start Date"]);
										var newStartTime = convertTime(item["Start Time"]);
										var boros=["Bronx","Brooklyn", "Manhattan","Queens","Staten Island","Outside NYC",]	
										newBoro=( item.Borough ) ? boros.indexOf(item.Borough)+1 : 99;  //99=unknown boro
										fullkey.add(newBoro + item.TrainingLocationID +item.CourseID  +	newStartDate + newStartTime +item.Instructor +	item.Entry);
								})
								var vCoursesTable = document.querySelector("#locationTable");						
								var theparent='', loc='zzz';
								for (var i=0, totRows=vCoursesTable.rows.length; i < totRows; i++ ) {
										theparent="";
										if ( vCoursesTable.rows[i].getAttribute("level")=="0" &&  !vBoros.has(vCoursesTable.rows[i].getAttribute("id")) ) {
											//vCoursesTable.rows[i].classList.add("notMatched") ;
											$(vCoursesTable.rows[i]).addClass("notMatched") ;
										}													
										if (  vCoursesTable.rows[i].getAttribute("level")=="1" && !vLocations.has(vCoursesTable.rows[i].getAttribute("id").substring(vCoursesTable.rows[i].getAttribute("id").indexOf('__')+2))){											
											//vCoursesTable.rows[i].classList.add("notMatched") ; 
											$(vCoursesTable.rows[i]).addClass("notMatched") ; 
										}
										if (vCoursesTable.rows[i].getAttribute("level")=="2" ){
													loc =vCoursesTable.rows[i].getAttribute("id").substring(vCoursesTable.rows[i].getAttribute("id").indexOf('__')+2);
													if ( !vCourses.has(loc)  )	{
														//vCoursesTable.rows[i].classList.add("notMatched"); 
														$(vCoursesTable.rows[i]).addClass("notMatched"); 
													}
										}
										if ( vCoursesTable.rows[i].getAttribute("level")=="3" ) {	
											whereunderscore = vCoursesTable.rows[i].getAttribute("id").indexOf('__');
											coursesection= ( whereunderscore == -1 ) ? 											
															vCoursesTable.rows[i].getAttribute("id") : 
															vCoursesTable.rows[i].getAttribute("id").substring(0, whereunderscore)

											if (vCourses.has(vCoursesTable.rows[i].getAttribute("parent-id").substring( vCoursesTable.rows[i].getAttribute("parent-id").indexOf("__"))) >-1 
												&&  vCoursesTable.rows[i].getAttribute("row-id").indexOf('__') >= 0 ) {
														true; 
												} else if (fullkey.has(coursesection)){
														true; 
												}  else {
														//vCoursesTable.rows[i].classList.add("notMatched");
														$(vCoursesTable.rows[i]).addClass("notMatched");
											}													
													
//													if ( vCoursesTable.rows[i].getAttribute("parent-id").indexOf(loc) >=0  && vCoursesTable.rows[i].getAttribute("row_id").indexOf('__') >= 0 ) {
//														true;
//													} else {
//														vCoursesTable.rows[i].classList.add("notMatched");
//													}
//														
//													if (!fullkey.has(coursesection)                          ) {
															//vCoursesTable.rows[i].classList.add("notMatched");
//													}
										}										
									}
								
								}
			}
	}	
	$("#loadpage").hide();
	document.querySelector("#locationTable").style.visibility="visible";	
	})  //end d3 csv data

	function resetMapArrays(sourceArray) { 
		latLngs = sourceArray.map(function(d){				
						var obj={};
						obj["latLng"] = [+d.Lat,+d.Long];
						obj["full_Address"] = d.Location.toUpperCase();
						obj["locID"] = [d.TrainingLocationID];
						points.push( obj );
						return [+d.Lat,+d.Long];
		});
	}

	function zoom(latLngs){
		if (latLngs === undefined || latLngs == 0){  //no courses match
			var category = $("#dropdownCourses option:selected").prevAll(".courseHeading").html();
			$(".notFoundCourse").empty().append($("#dropdownCourses option:selected").text());
				(document.querySelector("#dropdownCourses").selectedIndex > 0  ) ? $(".notFoundCourse").append( " in ",  $("#dropdownCourses option:selected").prevAll(".courseHeading").html()   ) :null;
				$(".notFoundSST").empty().append($("#dropdownSST option:selected").text());
				$(".notFoundLanguage").empty().append($("#dropdownLanguages option:selected").text());
				$('.notFoundRow').show();
				document.querySelector("#ood").style.display="none";
				map.setView(defaultLatLng, 10);
			}
		else {  // matching courses
			$(".notFoundRow").css("display","none") ;				
			polyline = L.polyline(latLngs,{opacity:0}).addTo(map);
			map.fitBounds(polyline.getBounds().pad(0.3));				
			map.removeLayer(polyline);
		}}  //end of zoom()
	$(".notFoundRow button").click( function() {
		$(".notFoundRow").css("display","none"); })
	map.on('resize', function(){ 
		map.invalidateSize();	});  //end of map resize event	
	function buildTblTreeElements(data, keyArray, languages) {			
			var doTitleCase = function (theString) {  
				theString = theString.replace(/\W\S/g, function(t) 
							{return t.toUpperCase() }); 
				return theString.replace("\&","and" )};
			var tableRef = document.querySelector("#locationTable")
			var boroughsset = new Set();
			var boroughlocationset = new Set();
			var boroughlocationcourseset = new Set();
			var boroughlocationcoursedatetimestartentryset = new Set();
			var firstlocationcourse=true;
			var providerInfo='';
			var vglobe=document.createElement("i");
			//vglobe.classList.add("fa","fa-globe");
			$(vglobe).addClass("fa","fa-globe");
			vglobe.setAttribute("title","Online");
			vglobe.style.fontSize="1.2em"
			vglobe.style.color="blue"
			var alldata2 = keyArray.map(function(q, indexNum, array) {  //q=current element in array of keys
				var indexNumber=null;				
				for (var ctr = 0, sizer=data.length; ctr<sizer; ctr++) {
					if ( data[ctr].key == q    ) {
						indexNumber = ctr;
						break;}}
				var d = data[indexNumber];	
				var trimBorough = d.Borough.trim();
				var trimLocationID=d.TrainingLocationID.trim();
				var trimCourseID=d.CourseID.trim();
				if ( !boroughsset.has(d.Borough) ) {  
						boroughsset.add(d.Borough);
						var newRow =tableRef.insertRow(-1);var newCell = newRow.insertCell(0);var newB = document.createElement('b');var newText = document.createTextNode(d.Borough);
						newCell.appendChild(newB);newB.appendChild(newText);newRow.setAttribute("row-id",d.Borough);newRow.id=d.Borough;} 
				if ( !boroughlocationset.has(d.Borough+"__"+d.TrainingLocationID)    ) { 
					boroughlocationset.add(d.Borough+"__"+d.TrainingLocationID);	
					var newRow =tableRef.insertRow(-1);	var newCell = newRow.insertCell(0);var newText = document.createTextNode(d.Street +( (d.newBoro == 6 ) ? " ("+d.City+ ", " + d.State +")": "" ));
					var newSpan=document.createElement("span");newCell.appendChild(newSpan);newSpan.appendChild(newText);newRow.setAttribute("row-id",d.Borough+"__"+d.TrainingLocationID);newRow.setAttribute("parent-id",d.Borough);
					newRow.id=d.Borough+"__"+d.TrainingLocationID;}  
				if ( !boroughlocationcourseset.has(d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID)) { 
								myID = d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID;
								boroughlocationcourseset.add(myID);myParent = d.Borough+"__"+d.TrainingLocationID;firstlocationcourse=true; // ************************************
								boroughlocationcourseset.add(d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);	
								var newRow =tableRef.insertRow(-1);var newCell = newRow.insertCell(0);	var newText = document.createTextNode(d.Course);var newSpan=document.createElement("span");
								newCell.appendChild(newSpan);newSpan.appendChild(newText);newRow.setAttribute("row-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID);
								newRow.id=d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID;} 
				if ( !boroughlocationcoursedatetimestartentryset.has(q )){  
							myID=q;	boroughlocationcoursedatetimestartentryset.add(q); 
							myParent = d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID;
							var rowDateTimeInsructor=d["Start Date"]+" " + d["Start Time"] + ((d["End Time"] ) ? " - "+d["End Time"]:" ")+  //end time is sometimes missing
							" (" + ((d.Instructor)? d.Instructor:"(tbd)") + ")";var newRow =tableRef.insertRow(-1);var newCell = newRow.insertCell(0);
							var newSpan1 = document.createElement("span");var newText1 = document.createTextNode("Date/Time:");
							//newSpan1.appendChild(newText1);newSpan1.classList.add("detailHead");var newSpan2 = document.createElement("span");							
							newSpan1.appendChild(newText1);$(newSpan1).addClass("detailHead");var newSpan2 = document.createElement("span");
							var newText2 = document.createTextNode(d["Start Date"]+" " +d["Start Time"] +((d["End Time"] ) ? " - "+d["End Time"]:" ") + " (" +((d.Instructor)? d.Instructor:"(tbd)") +") "); 
							newSpan2.appendChild(newText2);	newCell.appendChild(newSpan1);newCell.appendChild(newSpan2);							
							newRow.setAttribute("row-id",q);newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);newRow.id=q;firstlocationcourse=false;
							if  ( indexNum == array.length-1 || (q.substr(0,9) !=  array[indexNum+1].substr(0,9))  ) {
								var newRow =tableRef.insertRow(-1);var newCell = newRow.insertCell(0);var newSpan1 = document.createElement("span");
							  //var newText1 = document.createTextNode("Provider:");newSpan1.appendChild(newText1);newSpan1.classList.add("detailHead");
								var newText1 = document.createTextNode("Provider:");newSpan1.appendChild(newText1);$(newSpan1).addClass("detailHead");
								var newSpan2 = document.createElement("span");var newText2 = document.createTextNode(d["Course Provider"]);
								newSpan2.appendChild(newText2);newCell.appendChild(newSpan1);newCell.appendChild(newSpan2);newRow.setAttribute("row-id",q+"__provider");
								newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);
								newRow.className="providerInfo";newRow.id=q+"__provider";
								newRow =tableRef.insertRow(-1);newCell = newRow.insertCell(0);
								newSpan1 = document.createElement("span");newText1 = document.createTextNode("Web:");
								//newSpan1.appendChild(newText1);	newSpan1.classList.add("detailHead");newSpan2 = document.createElement("span");
								newSpan1.appendChild(newText1);	$(newSpan1).addClass("detailHead");newSpan2 = document.createElement("span");
								var newA = document.createElement("a");newText2 = document.createTextNode(d["CPwebsite"]);
								newA.target="_blank";newA.href=d["CPwebsite"];newA.appendChild(newText2);newSpan2.appendChild(newA);
								newCell.appendChild(newSpan1);newCell.appendChild(newSpan2);newRow.setAttribute("row-id",q+"__website");
								newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);
								newRow.className="providerInfo";newRow.id=q+"__website";newRow =tableRef.insertRow(-1);newCell = newRow.insertCell(0);
								newSpan1 = document.createElement("span");newText1 = document.createTextNode("Phone:");newSpan1.appendChild(newText1);
								//newSpan1.classList.add("detailHead");newSpan2 = document.createElement("span");newText2 = document.createTextNode(d["CPphone"]);
								$(newSpan1).addClass("detailHead");newSpan2 = document.createElement("span");newText2 = document.createTextNode(d["CPphone"]);
								newSpan2.appendChild(newText2);newCell.appendChild(newSpan1);newCell.appendChild(newSpan2);								
								newRow.setAttribute("row-id",q+"__phone");newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);
								newRow.className="providerInfo";newRow.id=q+"__phone";newRow =tableRef.insertRow(-1);newCell = newRow.insertCell(0);
								newSpan1 = document.createElement("span");newText1 = document.createTextNode("Price:");newSpan1.appendChild(newText1);
								//newSpan1.classList.add("detailHead");newSpan2 = document.createElement("span");newText2 = document.createTextNode(d["Price"]);
								$(newSpan1).addClass("detailHead");newSpan2 = document.createElement("span");newText2 = document.createTextNode(d["Price"]);
								newSpan2.appendChild(newText2);newCell.appendChild(newSpan1);newCell.appendChild(newSpan2);newRow.setAttribute("row-id",q+"__price");
								newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);
								newRow.className="providerInfo";newRow.id=q+"__price";newRow =tableRef.insertRow(-1);newCell = newRow.insertCell(0);newSpan1 = document.createElement("span");
								newCell.appendChild(newSpan1);newRow.setAttribute("row-id",q+"__separator");newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);newRow.id=q+"__separator";
							}							
				} 
			})
		} 
})();
