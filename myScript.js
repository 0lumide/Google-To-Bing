function gup(name){
hashornot = window.location.search;
if(document.URL.indexOf("#")!==-1){hashornot=window.location.hash.replace("#","#hold=1&");}
name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
var regexS = "[\\?&]"+name+"=([^&#]*)";
var regex = new RegExp( regexS );
var results = regex.exec(hashornot);
if( results == null )
  return "";
else
  return results[1];
}

function whichsite() {
sEngine=0;
if (document.URL.indexOf(".google.")!==-1){sEngine="google";}
else if (document.URL.indexOf(".bing.com")!==-1){sEngine="bing";}
return(sEngine)
}

function issearchorimage(){
site=whichsite();
if(((document.URL.indexOf("search") !== -1)||(document.URL.indexOf("/#") !== -1)||(document.URL.indexOf("#newwindow") !== -1)) && (gup("q")!==""))
{
  if ((site=="bing")&&(document.URL.indexOf("/images/")!==-1)){s_type = "bingimage"}
  else if ((site=="bing")&&(document.URL.indexOf(".com/search")!==-1)){s_type = "bingweb"}
  else {s_type=0;}
  if ((site=="google")&&(gup("tbm")=="isch")){s_type = "googleimage"}
  else if ((site=="google")&&(gup("tbm")=="")){s_type = "googleweb"}
  else if ((site=="google")&&(gup("tbm")!=="")){s_type = 0}
}
else {s_type=0;}
return(s_type)
}

function start_script(){
  data = issearchorimage();
  if (data !== 0){
    site_name = whichsite();
    if(site_name == "google"){site_name2 = "bing";}
    else {site_name2 = "google";}
    if (site_name=="google"){img_link = chrome.extension.getURL("g2b.png");}
    else if (site_name=="bing"){img_link = chrome.extension.getURL("b2g.png");}
    //var localestuff = whatcc();
    if(data.indexOf("web")!==-1){link = "http://www."+site_name2+".com/search?q="+gup("q");}
    else if(data =="googleimage"){link = "http://www."+site_name2+".com/images/search?q="+gup("q");}
    else if(data == "bingimage"){link = "http://www."+site_name2+".com/search?q="+gup("q")+"&tbm=isch";}
    return(link);
  }else{return(0);}
}

function create_button(){
  site_name = whichsite();
  if(site_name == "google"){site_name2 = "bing";}
  else {site_name2 = "google";}
  if (site_name=="google"){img_link = chrome.extension.getURL("g2b.png");}
  else if (site_name=="bing"){img_link = chrome.extension.getURL("b2g.png");}
  var mydiv = document.createElement('div');
  mydiv.setAttribute('style', 'background-image:url("'+img_link+'");'+'-webkit-box-shadow: 0px -1px 7px rgba(50, 50, 50, 0.75); box-shadow: 0px -1px 7px rgba(50, 50, 50, 0.75); background-size:100%; width:45px; height:45px; position:fixed; right:2px; bottom:2px; z-index:999999999; cursor:pointer;');
  mydiv.setAttribute('id', 'bingtogoogle');
  var mylink = document.createElement('a');
  mylink.appendChild(mydiv);
  mylink.setAttribute("id", "clickme");
  document.body.appendChild(mylink);
  var clickedme = document.getElementById("clickme");
  clickedme.addEventListener("click", function() {
    //alert(link2go);
    location.href=link2go;
  }, false);
}

function whatcc()
{
//cookie stuff for bing
//remmeber language and locale are different things

}

var link2go = start_script();
if (link2go != 0){
  if (document.getElementById("bingtogoogle")){
    var de = "fre";
  }else{
    create_button();
  }
}


window.onhashchange = function(){
  link2go = start_script();
  if (link2go != 0){
    if (document.getElementById("bingtogoogle")){
      var de = "fre";
    }else{
      create_button();
    }
  }
}