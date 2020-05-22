// $(document).ready(function(){

	function convertDate(theDate) {
		return 	(theDate.split('/')[0] < 10 ? '0'+theDate.split('/')[0] : theDate.split('/')[0]) + (theDate.split('/')[1] < 10 ? '0'+theDate.split('/')[1] : theDate.split('/')[1]) + theDate.split('/')[2] ;	}
	function convertTime(theTime) {
		 return (theTime == "" ? "0000":theTime.split(' ')[1][0]=="P" && theTime.split(' ')[0].split(':')[0]!=12 ? ""+(parseInt(theTime.split(' ')[0].split(':')[0])+12) + "" + theTime.split(' ')[0].split(':')[1] : ""+theTime.split(' ')[0].split(':')[0] < 10 ? '0'+ theTime.split(' ')[0].split(':')[0] + theTime.split(' ')[0].split(':')[1] : theTime.split(' ')[0].split(':')[0]+""+theTime.split(' ')[0].split(':')[1]  )}
	function manualExpand( theLocation,vZoomedFromSearch=true) { 
	let locationParent=document.querySelector("[id*="+theLocation +"]").getAttribute("parent-id");
		document.querySelector("tr[row-id='"+locationParent+"']" ).classList.replace("tbltree-collapsed","tbltree-expanded");
		document.querySelector("tr[row-id='"+locationParent+"']" ).setAttribute("tree-state","shown");
		document.querySelector("tr[row-id='"+locationParent+"'] .tbltree-expander" ).classList.replace("tbltree-expander-collapsed","tbltree-expander-expanded");
		$('#locationTable').tbltree('expand', locationParent);
		let thisLocation=document.querySelector("[id*="+theLocation +"]").getAttribute("row-id");
		document.querySelector("tr[row-id='"+thisLocation+"']" ).classList.replace("tbltree-collapsed","tbltree-expanded");
		document.querySelector("tr[row-id='"+thisLocation+"']" ).setAttribute("tree-state","shown")	;
		document.querySelector("tr[row-id='"+thisLocation+"'] .tbltree-expander" ).classList.replace("tbltree-expander-collapsed","tbltree-expander-expanded");
		$('#locationTable').tbltree('expand', thisLocation);
		//document.querySelector("tr[row-id='"+thisLocation+"']" ).scrollIntoView(true,{behavior: "smooth", block: "start", inline: "nearest"});
		( document.querySelector(".zoomed") ) ?  document.querySelector(".zoomed").classList.remove("zoomed") : 0;
		document.querySelector("tr[row-id='"+thisLocation+"']" ).classList.add("zoomed"); } 
	function rowExpand (vTargetRowElement) {
		vTargetRowElement.setAttribute("tree-state","shown");
		vTargetRowElement.classList.replace("tbltree-collapsed","tbltree-expanded");
		vTargetRowElement.querySelector('.tbltree-expander').classList.replace("tbltree-expander-collapsed","tbltree-expander-expanded");
		( vTargetRowElement.nextSibling.style.display="table-row" ) || 0; 
		$('#locationTable').tbltree('expand', vTargetRowElement.getAttribute("row-id"));}
	function rowCollapse (vTargetRowElement) {
		vTargetRowElement.setAttribute("tree-state","hidden");
		vTargetRowElement.classList.replace("tbltree-expanded","tbltree-collapsed");
		vTargetRowElement.querySelector('.tbltree-expander').classList.replace("tbltree-expander-expanded","tbltree-expander-collapsed");
		( vTargetRowElement.nextSibling.style.display="none" ) || 0; 
		$('#locationTable').tbltree('collapse', vTargetRowElement.getAttribute("row-id")); }
	function collapseAll() {
		let expandedRows = document.querySelectorAll(".tbltree-expanded") ;   
		for (i=0; i<expandedRows.length; i++){  
				let theRow = expandedRows[i].getAttribute("row-id"); 
				$('#locationTable').tbltree('collapse', theRow);
				expandedRows[i].classList.replace("tbltree-expanded","tbltree-collapsed");	
				expandedRows[i].setAttribute("tree-state","hidden");
				expandedRows[i].getElementsByTagName("span")[1].classList.replace("tbltree-expander-expanded","tbltree-expander-collapsed"); }}
	function manualCollapse(removeZoomed=true) {
		(removeZoomed) ? removeZoomedClass() : null;
		let expandedRows = document.querySelectorAll("tr[class='tbltree-expanded'][is-leaf='false']");  //get the tbl tree rows
		for (i=0; i<expandedRows.length; i++){   //
				let theRow = expandedRows[i].getAttribute("row-id"); 
				$('#locationTable').tbltree('collapse', theRow);
				expandedRows[i].classList.replace("tbltree-expanded","tbltree-collapsed")	;
				expandedRows[i].setAttribute("tree-state","hidden");
				expandedRows[i].getElementsByTagName("span")[1].classList.replace("tbltree-expander-expanded","tbltree-expander-collapsed"); } }
	function resetDropdowns() {
		$("#dropdownCourses").val('allCourses');
		$("#dropdownSST").val('sstAll');
		$("#dropdownLanguages").val('all');
		document.querySelector("#onlinecheck").checked=false;
		selectedCourse = "allCourses";
		selectedSST = "sstAll";
		selectedLanguage = "all";
		//onlinecheck=false;
		}
	function removeZoomedClass() {
		let vZoomed=document.querySelector("tr[level='1'].zoomed");
		let vSearchZoomed=document.querySelector("tr[level='1'].searchZoomed");
		if (vZoomed) { vZoomed.classList.remove("zoomed") }	;	
		(vSearchZoomed) ? vSearchZoomed.classList.remove("searchZoomed") : 0;
		if (vZoomed || vSearchZoomed) {
		   map.setView(defaultLatLng, 10); 
		 }}
	function zoomTo(latlong){
			if (latlong[0]==0 && latlong[1]==0){
				return;
			}
			//map.setView(latlong,20);
			map.setView(latlong,15);  //requested by John D.  Need to see other points around location
			document.querySelectorAll('svg g circle[latlng="'+latlong[0]+ ','+latlong[1]+'"]').forEach( (el) => { el.classList.add("clickedPoint")}  )}
			
var defaultLatLng = [40.791384, -73.883770];
var map = L.map('map').setView(defaultLatLng, 10);
var options = {
    key: '9277c3027dc546989ea28d048ffa9ee7', // your OpenCage API key
    limit: 5, // number of results to be displayed in dropdown list
    position: 'topright',
	proximity: '40.791384, -73.883770',	
    placeholder: 'e.g. 280 Broadway NYC', // the text in the empty search box
    errorMessage: 'Nothing found.',
    showResultIcons: false,
    collapsed: true,
    expand: 'click',
    addResultToMap: true   //, 
    //onResultClick: selectOpenCageSearchResult  //when user selects an item from result list	
}; 
var control = L.Control.openCageSearch(options).addTo(map);

control.markGeocode = function (result) {
            // JvdB single instance: singleton
            L.Control.OpenCageSearch.instance = this;

            if (result.bounds) {
                this._map.fitBounds(result.bounds);
            } else {
                this._map.panTo(result.center);
            }

            if (this._geocodeMarker) {
                this._map.removeLayer(this._geocodeMarker);
            }
			
            // JvdB add button in Popup to remove Marker
			let popupDiv=document.createElement("div");
			let locationText = document.createElement("h5");
			locationText.innerText = result.name;
			let closeMarkerDiv = document.createElement("div")
			closeMarkerDiv.style.textAlign = "center";
			let closeMarkerDivButton = document.createElement("button");
			closeMarkerDivButton.innerText="Remove";
			closeMarkerDivButton.setAttribute("title","Remove marker from map");		
			closeMarkerDivButton.setAttribute("type","button");
			closeMarkerDivButton.classList.add("btn","removemarkerbutton");
			closeMarkerDivButton.addEventListener("click", e => {L.Control.OpenCageSearch.instance._map.removeLayer(L.Control.OpenCageSearch.instance._geocodeMarker) });
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
	//console.log("selected one of the search results")
}

function removeSearchMarkers () {
	markerElements=["leaflet-shadow-pane","leaflet-marker-pane","leaflet-popup-pane"]
	for(let i=0; i<markerElements.length; i++) {
			let markerElement=document.querySelector("."+markerElements[i]+" :first-child");
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
			.attr('latlng',  (d) => {return   d.latLng} )
			.attr('class', function(d){	return "point";	})
			.on('click', function(d){
				
					vClickedPoints = document.querySelectorAll('.clickedPoint');
					for (let ctr=0,thelength=vClickedPoints.length; ctr < thelength;ctr++) {
						vClickedPoints[ctr].classList.remove("clickedPoint");
					}
																				
					this.classList.add("clickedPoint")	
					let vLocationCourses=document.querySelectorAll("tr[parent-id$='"+ d.locID    +"']");
					let vToolTipCourses='';					
					for (let i=0; i < vLocationCourses.length;i++) {
						vToolTipCourses += "<br><span>&emsp;&bull; "+vLocationCourses[i].innerText+"</span>";
					}
					vToolTipCourses=
					"<span>"+document.querySelector("tr[row-id*='"+ d.locID +"'][id*='provider'] .detailHead + span").innerText + "</span><br>" + 
					"<span>"+d.full_Address + "</span><br>" + 
					vToolTipCourses;
					tooltip.html(
						vToolTipCourses
					)
					
					
if (! L.Browser.touch && ! L.Browser.android) {

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
					//collapseAll() // collapse the tree;   if select point, change background of the tree row & fill point color blue
					manualExpand(d.locID[0], false);  
			})
			.on("mouseover", function(d){				
					if (!this.classList.contains(".clickedPoint")  ) {
							//tooltip.transition().duration(0); 
							$(this).attr("style", "cursor: pointer; fill: #eef442; fill-opacity: 1;");
					}
					tooltip.transition().duration(0); 
			})
			.on("mouseout", function(d){	
				if (!this.classList.contains(".clickedPoint")  ) {
							$(this).attr("style", "stroke-width: 0px; fill-opacity: .7;");
							//return tooltip.transition().delay(500).style("visibility", "hidden"); 
					}	
					return tooltip.transition().delay(500).style("visibility", "hidden"); 
			});

	;

			pointsUpd.attr('r', 7 / proj.scale);  //POINT RADIUS
	});  //end pointsOverlay definition
							
//d3.csv("data/CourseTrainingLocations.csv", function(data) {
d3.csv("data/CourseTrainingLocationsMay.csv", function(data) {
	if (!data) {  //when there is a problem with the returned data
			let element = document.createElement("h3");
			element.appendChild(document.createTextNode("No Data Available"))
			element.style.textAlign="center";
			document.querySelector("#locationTable").appendChild(element);
	} else {
		
		let boros=["Bronx","Brooklyn", "Manhattan","Queens","Staten Island","Outside NYC","WEB",]
		let justKeys = data.map( (d) => { 
						let latlngArr=	 (  !isNaN(parseInt(d.Lat)) &&  !isNaN(parseInt(d.Long)) ) ?  [+d.Lat,+d.Long] : [+0,+0] ;
						d.latLng =latlngArr   //[+d.Lat,+d.Long];;						
						let newStartDate=convertDate(d["Start Date"]);
						let newStartTime = convertTime(d["Start Time"]);
						d.Borough = ( !d.Borough ) ? "Unknown" : d.Borough.trim();	//account for empty boro
						d.newBoro=( d.Borough) ? boros.indexOf(d.Borough)+1 : 99;  //99=unknown boro
						d.key=	d.newBoro + d.TrainingLocationID +d.CourseID  +	newStartDate + newStartTime +d.Instructor +	d.Entry;
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
		let languages = ["Arabic","Bengali","Chinese (Cantonese/Mandarin)","English","Hatian Creole",
			"Georgian","Hindi","Italian","Korean","Polish","Punjabi","Russian","Spanish","Urdu"];
		buildTblTreeElements(data, justKeys, languages);  //process the data by the sorted key		
		$("#locationTable").tbltree(   //tabletree custom behaviors
						{initState: "collapsed"}
						/*
								, 
								{expand: function(e, row) {
										//qqq=document.querySelectorAll( ' tr[parent-id="' + row.attr('row-id') + '"]')
										//$("#locationTable").scrollTop(30);
										}
								}
						*/
		);
		$("#locationTable").on("click", "tr[level='0']", function(event){   //per John request, when select entire BORO line, expand it
					if (!  event.target.classList.contains("tbltree-expander")  ) {
						let vTargetRow=document.querySelector("[row-id='"+   this.closest("tr").getAttribute("row-id") +  "']");
						if ( vTargetRow.classList.contains("tbltree-collapsed")  ) {
								rowExpand(vTargetRow); 
						} else {
								rowCollapse(vTargetRow);
						}	
					}			
		})		
		$("#locationTable").on("click", "tr", function(event){   //per John request, when select entire BORO line, expand it
			if (this.classList.contains("tbltree-expanded") && this.nextSibling ) {
				//5/21/2020  
				//$('body').scrollTop(0);
				this.nextSibling.scrollIntoView();
				true;
			}

		})		
		
		$("#locationTable").on("click", "tr[level='1'] span:nth-child(3)", function(event){
			vClickedPoints = document.querySelectorAll('.clickedPoint');
			for (let ctr=0,thelength=vClickedPoints.length; ctr < thelength;ctr++) {
				vClickedPoints[ctr].classList.remove("clickedPoint");
			}
			let vParentRow = event.target.closest("tr[level='1']");
			if (! vParentRow.classList.contains("zoomed") ) { 
				( document.querySelector(".zoomed") ) ?  document.querySelector(".zoomed").classList.remove("zoomed") : 0; 
				vParentRow.classList.add("zoomed") 
				let vLocationID =  vParentRow.getAttribute("id")
				let vTargetLatLng=null;
				for ( let ctr=0;ctr<data.length;ctr++) { 
						if (     data[ctr].TrainingLocationID== vLocationID.substring( vLocationID.indexOf('__')+2 )) {
								vTargetLatLng=data[ctr].latLng;
								break;
						}							
				}
				zoomTo(vTargetLatLng);
			} 
		})   //end click event for address
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
					( document.querySelector(".zoomed") ) ?  document.querySelector(".zoomed").classList.remove("zoomed") : 0;
					selectedCourse = $( "#dropdownCourses option:selected" ).val();
					selectedSST = $( "#dropdownSST option:selected" ).val();
					selectedLanguage = $( "#dropdownLanguages option:selected" ).val();
					//onlinecheck = document.querySelector("#onlinecheck").checked;
					filterQry(selectedCourse, selectedSST, selectedLanguage);
			};

						
			//$('#clr_btn').click( function(e){   //reset everything!
			$('.resetall').click( function(e){   //reset everything!
					e.preventDefault();
					document.querySelector("#ood").style.display="none";
					resetDropdowns();
					map.removeLayer(pointsOverlay);		
					removeSearchMarkers();
					resetMapArrays(	data) ;
					document.querySelector(".textSearchResults").style.display="none";
					document.querySelectorAll(".notMatched").forEach( (item) => item.classList.remove("notMatched")  );
					document.querySelectorAll(".clickedPoint").forEach( (item) => item.classList.remove("clickedPoint"));
					( document.querySelector(".zoomed") ) ?  document.querySelector(".zoomed").classList.remove("zoomed") : 0;
					pointsOverlay.addTo(map);
					map.setView(defaultLatLng, 10);
					$(this).attr("title","Reset All");					
					manualCollapse(removeZoomed=true)
					$(".notFoundRow").css("display","none") ;
					$(".searchZoomed").removeClass("searchZoomed");
					$(".zoomed").removeClass("zoomed");
					let zoomedLocation=document.querySelectorAll("tr[level='1'].zoomed");
					( document.querySelector(".leaflet-popup-pane").firstChild != null   ) 
					&& L.Control.OpenCageSearch.instance._map.removeLayer(L.Control.OpenCageSearch.instance._geocodeMarker);  });  //end clear map+table event
			
			function filterQry(selectedCourse, selectedSST, selectedLanguage){
					let selectedCourse_cpID = data.filter(function(d, index, arrayName){
									return (	(d.CourseID == selectedCourse^selectedCourse=="allCourses") &&
												((selectedSST=="sstYes" && d.SST=="Y"?1:0) + (selectedSST=="sstNo" && d.SST=="N"?1:0)+(selectedSST=="sstAll" ? 1:0)==1)  &&
												( selectedLanguage == "all" || d.Language==selectedLanguage) &&
												((document.querySelector("#onlinecheck").checked)?d["Web Address"].trim().toLowerCase().charAt(0)=='y':true) 
											)}); 
				points=[];	
				document.querySelectorAll(".notMatched").forEach( (item) => item.classList.remove("notMatched")  );
				
							resetMapArrays(	selectedCourse_cpID) ;  
							map.removeLayer(pointsOverlay); 
							pointsOverlay.addTo(map);	
							collapseAll(); 
							let allCoursesFiltered = selectedCourse_cpID.length == data.length ?  true: false;
							if ( allCoursesFiltered )  {
								map.setView(defaultLatLng, 10);
								$(".searchZoomed").removeClass("searchZoomed");	
							}  else  {
								if ( data.length != selectedCourse_cpID.length) { 
											document.querySelector(".textSearchResults").textContent = selectedCourse_cpID.length+" Courses Found" ;
											document.querySelector(".textSearchResults").style.display="block" //"inline" ;
								}			
								zoom(latLngs);
								let vBoros=new Set();
								let vLocations=new Set();
								let vCourses=new Set();	
								let fullkey=new Set();
								selectedCourse_cpID.map ( function (item, index) {
										vBoros.add(item.Borough); 
										vLocations.add(item.TrainingLocationID);
										//vCourses.add(item.CourseID);
										vCourses.add(item.TrainingLocationID+'__'+item.CourseID);
										let newStartDate=convertDate(item["Start Date"]);
										let newStartTime = convertTime(item["Start Time"]);
										let boros=["Bronx","Brooklyn", "Manhattan","Queens","Staten Island","Outside NYC",]	
										newBoro=( item.Borough ) ? boros.indexOf(item.Borough)+1 : 99;  //99=unknown boro
										fullkey.add(newBoro + item.TrainingLocationID +item.CourseID  +	newStartDate + newStartTime +item.Instructor +	item.Entry);
								})
								let vCoursesTable = document.querySelector("#locationTable");						
								let theparent='', loc='zzz';

								for (let i=0, totRows=vCoursesTable.rows.length; i < totRows; i++ ) {
										theparent="";

										//boro
										if ( vCoursesTable.rows[i].getAttribute("level")=="0" &&  !vBoros.has(vCoursesTable.rows[i].getAttribute("id")) ) {
											vCoursesTable.rows[i].classList.add("notMatched") ;
										}													
										//location			
										if (  vCoursesTable.rows[i].getAttribute("level")=="1" && !vLocations.has(vCoursesTable.rows[i].getAttribute("id").substring(vCoursesTable.rows[i].getAttribute("id").indexOf('__')+2))){											
											vCoursesTable.rows[i].classList.add("notMatched") ; 
										}
										//course			
										//if ( vCoursesTable.rows[i].getAttribute("level")=="2" && !vCourses.has(  vCoursesTable.rows[i].getAttribute("id").substring(vCoursesTable.rows[i].getAttribute("id").indexOf('__')+2) ) ){
										if (vCoursesTable.rows[i].getAttribute("level")=="2" ){
													loc =vCoursesTable.rows[i].getAttribute("id").substring(vCoursesTable.rows[i].getAttribute("id").indexOf('__')+2);
													if ( !vCourses.has(loc)  )	{
														vCoursesTable.rows[i].classList.add("notMatched"); 
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
												} else if (fullkey.has(coursesection)  ) {
														true; 
												}  else 	 {
														
														vCoursesTable.rows[i].classList.add("notMatched");
											}





//													&&  
//													vCourses.has(vCoursesTable.rows[i].getAttribute("parent_id").substring( vCoursesTable.rows[i].getAttribute("parent_id").indexOf("__"))) ){
//														true;
//													}  else if  (!fullkey.has(coursesection) ) {
//															vCoursesTable.rows[i].classList.add("notMatched");
//													}
														
														

													
													
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
			}  //end of filterqry()
	}	
	$("#loadpage").hide();
	document.querySelector("#locationTable").style.visibility="visible";	
	})  //end d3 csv data

	function resetMapArrays(sourceArray) { //rebuild array that hold map latlngs, which in turn are used to draw points
		latLngs = sourceArray.map(function(d){				
						let obj={};
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
				document.querySelector("#ood").style.display="block";
				map.setView(defaultLatLng, 10);
			}
		else {  // matching courses
			$(".notFoundRow").css("display","none") ;	
			if(document.querySelector("#onlinecheck").checked) {
				document.querySelector("#ood").style.display="block";
				var mm=Math.floor(Math.random()*10);
				var q=(mm<4)?"All Courses Shown Are Online":(mm<8)?"Everywhere":"Anywhere";
				document.querySelector("#ood span").textContent= q+"!";
				return;
				}
			polyline = L.polyline(latLngs,{opacity:0}).addTo(map);
			map.fitBounds(polyline.getBounds().pad(0.3));				
			map.removeLayer(polyline);
			//   map.setView([40.791384, -73.883770], 10, {			  "animate": false,			  "pan": {				"duration": 10		  }	});
		}}  //end of zoom()
	$(".notFoundRow button").click( function() {
		$(".notFoundRow").css("display","none"); })

	
	map.on('resize', function(){ 
		map.invalidateSize();	});  //end of map resize event
	

	function buildTblTreeElements(data, keyArray, languages) {			

			let doTitleCase = function (theString) {  
						theString = theString.replace(/\W\S/g, function(t) 
									{return t.toUpperCase() }); 
						return theString.replace("\&","and" )
			};
			let tableRef = document.querySelector("#locationTable")
			let boroughsset = new Set();
			let boroughlocationset = new Set();
			let boroughlocationcourseset = new Set();
			let boroughlocationcoursedatetimestartentryset = new Set();
			let firstlocationcourse=true;
			let providerInfo='';

var qqq=document.createElement("i");
qqq.classList.add("fa","fa-globe");
qqq.setAttribute("title","Online");
qqq.style.fontSize="1.2em"
qqq.style.color="blue"



			let alldata2 = keyArray.map(function(q, indexNum, array) {  //q=current element in array of keys
				
				//get the matching datarow
				let indexNumber=null;				
				//find matching data row for this key value
				for (let ctr = 0, sizer=data.length; ctr<sizer; ctr++) {
					if ( data[ctr].key == q    ) {
						indexNumber = ctr;
						break;
					}}
				var d = data[indexNumber];	
				let trimBorough = d.Borough.trim();
				let trimLocationID=d.TrainingLocationID.trim();
				let trimCourseID=d.CourseID.trim();
				if ( !boroughsset.has(d.Borough) ) {  //add a new borough heading,  level 0  BOROUGH
						boroughsset.add(d.Borough);
						let newRow =tableRef.insertRow(-1);let newCell = newRow.insertCell(0);let newB = document.createElement('b');let newText = document.createTextNode(d.Borough);
						newCell.appendChild(newB);newB.appendChild(newText);newRow.setAttribute("row-id",d.Borough);newRow.id=d.Borough;
				} //end boro				
				if ( !boroughlocationset.has(d.Borough+"__"+d.TrainingLocationID)    ) {  //level 1 STREET ADDRESS
					boroughlocationset.add(d.Borough+"__"+d.TrainingLocationID);	
					let newRow =tableRef.insertRow(-1);	let newCell = newRow.insertCell(0);let newText = document.createTextNode(d.Street +( (d.newBoro == 6 ) ? " ("+d.City+ ", " + d.State +")": "" ));
					let newSpan=document.createElement("span");newCell.appendChild(newSpan);newSpan.appendChild(newText);newRow.setAttribute("row-id",d.Borough+"__"+d.TrainingLocationID);newRow.setAttribute("parent-id",d.Borough);
					newRow.id=d.Borough+"__"+d.TrainingLocationID;
				}  //end if....location			
				if ( !boroughlocationcourseset.has(d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID)) {  //level 2  COURSE NAME

								//firstlocationcourse=true;  // ************************************
								myID = d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID;
								boroughlocationcourseset.add(myID);myParent = d.Borough+"__"+d.TrainingLocationID;firstlocationcourse=true; // ************************************
								boroughlocationcourseset.add(d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);	
								let newRow =tableRef.insertRow(-1);let newCell = newRow.insertCell(0);	let newText = document.createTextNode(d.Course);let newSpan=document.createElement("span");
								newCell.appendChild(newSpan);newSpan.appendChild(newText);newRow.setAttribute("row-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID);
								newRow.id=d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID;				
				}  //end if...course
				if ( !boroughlocationcoursedatetimestartentryset.has(q )){  //level 3  COURSE DATE/TIME
							myID=q;	boroughlocationcoursedatetimestartentryset.add(q);   //myID);
							myParent = d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID;
							let rowDateTimeInsructor=d["Start Date"]+" " + d["Start Time"] + ((d["End Time"] ) ? " - "+d["End Time"]:" ")+  //end time is sometimes missing
							" (" + ((d.Instructor)? d.Instructor:"(tbd)") + ")";
							let newRow =tableRef.insertRow(-1);
							let newCell = newRow.insertCell(0);
							let newSpan1 = document.createElement("span");
							let newText1 = document.createTextNode("Date/Time:");
							newSpan1.appendChild(newText1);
							newSpan1.classList.add("detailHead");

							let newSpan2 = document.createElement("span");							
							let newText2 = document.createTextNode(d["Start Date"]+
							" " + 
							d["Start Time"] +
							((d["End Time"] ) ? " - "+d["End Time"]:" ") + 
							" (" +
							((d.Instructor)? d.Instructor:"(tbd)") +
							") ");  
//"<i class='fa fa-globe' title='online' style='font-size:1.2em;color:blue'></i>"   )
																

							
							newSpan2.appendChild(newText2);
							if(  d["Web Address"].toLowerCase().charAt(0)=="y") {
								//newSpan2.appendChild(qqq);
								true;
							}
							
							newCell.appendChild(newSpan1);
							newCell.appendChild(newSpan2);
							
							newRow.setAttribute("row-id",q);
							newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);newRow.id=q;				
							firstlocationcourse=false;
							if  ( indexNum == array.length-1 || (q.substr(0,9) !=  array[indexNum+1].substr(0,9))  ) {
								let newRow =tableRef.insertRow(-1);
								let newCell = newRow.insertCell(0);
								let newSpan1 = document.createElement("span");
								let newText1 = document.createTextNode("Provider:");
								newSpan1.appendChild(newText1);newSpan1.classList.add("detailHead");
								let newSpan2 = document.createElement("span");
								let newText2 = document.createTextNode(d["Course Provider"]);
								newSpan2.appendChild(newText2);newCell.appendChild(newSpan1);
								newCell.appendChild(newSpan2);newRow.setAttribute("row-id",q+"__provider");
								newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);
								newRow.className="providerInfo";
								newRow.id=q+"__provider";
								newRow =tableRef.insertRow(-1);newCell = newRow.insertCell(0);
								newSpan1 = document.createElement("span");
								newText1 = document.createTextNode("Web:");
								newSpan1.appendChild(newText1);
								newSpan1.classList.add("detailHead");
								newSpan2 = document.createElement("span");
								
								let newA = document.createElement("a");
								newText2 = document.createTextNode(d["CourseProviderWebsite"]);
								newA.target="_blank";
								newA.href=d["CourseProviderWebsite"];newA.appendChild(newText2);
								newSpan2.appendChild(newA);
								newCell.appendChild(newSpan1);
								newCell.appendChild(newSpan2);
								newRow.setAttribute("row-id",q+"__website");
								newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);
								newRow.className="providerInfo";
								newRow.id=q+"__website";
								newRow =tableRef.insertRow(-1);
								newCell = newRow.insertCell(0);
								newSpan1 = document.createElement("span");
								newText1 = document.createTextNode("Phone:");
								newSpan1.appendChild(newText1);
								newSpan1.classList.add("detailHead");
								newSpan2 = document.createElement("span");
								newText2 = document.createTextNode(d["CourseProviderPhone"]);
								newSpan2.appendChild(newText2);
								newCell.appendChild(newSpan1);
								newCell.appendChild(newSpan2);								
								newRow.setAttribute("row-id",q+"__phone");
								newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);
								newRow.className="providerInfo";
								newRow.id=q+"__phone";
								newRow =tableRef.insertRow(-1);
								newCell = newRow.insertCell(0);
								newSpan1 = document.createElement("span");
								newText1 = document.createTextNode("Price:");
								newSpan1.appendChild(newText1);
								newSpan1.classList.add("detailHead");
								newSpan2 = document.createElement("span");
								newText2 = document.createTextNode(d["Price"]);
								newSpan2.appendChild(newText2);	
								newCell.appendChild(newSpan1);
								newCell.appendChild(newSpan2);
								newRow.setAttribute("row-id",q+"__price");
								newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);
								newRow.className="providerInfo";newRow.id=q+"__price";newRow =tableRef.insertRow(-1);newCell = newRow.insertCell(0);newSpan1 = document.createElement("span");
								newCell.appendChild(newSpan1);newRow.setAttribute("row-id",q+"__separator");newRow.setAttribute("parent-id",d.Borough+"__"+d.TrainingLocationID+"__"+d.CourseID);newRow.id=q+"__separator";
							}							
				} 
			}) //END alldata2 var
		}  //END buildTblTreeElements()
// })
