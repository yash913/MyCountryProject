function search() {
  let CName = document.getElementById("searchCountry").value;
  console.log(CName)
  fetchCountry(CName).then(text => {
    text;
  });

}

function EnterClicked(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    //document.getElementById("searchbtn").click();
    search();

  }
}

function searchAbout() {
  Resize();
}


function searchLoad() {
Resize();
  console.log("Page loaded and India searched")
  fetchCountry('Republic of India').then(text => {
    text;
  });

}

 function explore(count) {

  console.log(count);

  let Cname = document.getElementById(count).innerText;
  console.log(Cname);
  fetchCountry(Cname).then(text => {
    text;
  });

}

async function fetchCountry(Country_Name) {
  document.getElementById("searchCountry").innerText = "";

  const response = await fetch("https://restcountries.com/v3.1/name/" + Country_Name);


  let found = response.ok;     // => true/false
  let status = response.status;
  let text;
  if (found) {
    text = await response.json();
    console.log(found)
    console.log(status)
    console.log(text)
    console.log(text[0].name.official)


    let url = "url(" + text[0].flags.png + ")";
    document.getElementById("flagArea").style.backgroundImage = url;


    document.getElementById("CName").innerText = text[0].name.common;
    if('capital' in text[0]){
    document.getElementById("CCapital").innerText = text[0].capital[0];
  }else{
    document.getElementById("CCapital").innerText = "";
  }
    document.getElementById("COficialName").innerText = text[0].name.official;

    document.getElementById("MArea").innerText = text[0].area;
    document.getElementById("MPopulation").innerText = text[0].population;
    document.getElementById("MRegion").innerText = text[0].region;
    document.getElementById("MContinent").innerText = text[0].continents[0];


    document.getElementById("nationalSign").style.backgroundImage = "url(" + text[0].coatOfArms.png + ")";
    let i = 0;


    const list = document.getElementById("LocalInfo2");
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }




    let count = 0;
    
    Object.values(text[0].languages).forEach((val) => {
      console.log(val)
      LocalInfo2 = document.getElementById("LocalInfo2");
      LocalInfo2.innerHTML += `
      <div id="infoContainer${count}" class="infoContainer">
                <div id="Lang${count}" class="Languages">${val}</div>

            </div>
            
      `


      console.log("in Languages" + count);

      count++;


    });



    let count2 = 0;
    Object.values(text[0].name.nativeName).forEach(val => {
      console.log(count2);
      var infoCont = document.getElementById("infoContainer" + count2);
      infoCont.innerHTML +=

        `<div id="names${count2}" class="Languages LangSpecName">${val.common}</div>
      <div id="Offnames${count2}" class="Languages LangSpecOffName">${val.official}</div> `

      count2++;
    });







    const AllCards = Array.from(document.getElementsByClassName('card'));

    AllCards.forEach(EachCard => {
      EachCard.remove();
    });




   
    const len = text[0].borders.length;
    for (let s = 0; s < len; s++) {
      console.log(s);
      getNeighbours(text[0].borders[s], s)
    }





  }
  else {
    console.log(Country_Name)
    console.log("Hello")
    console.log(found)
    console.log(status)

  }
  return text;
}


async function getNeighbours(params, i) {
  const response = await fetch("https://restcountries.com/v3.1/alpha/" + params);
  obj = await response.json();
  var cardContiner = document.getElementById("cardcontainer");
  cardContiner.innerHTML += `
   <a href="#"   onclick="explore('OfficialNameValue${i}'); return false;">
      <div class="card">
               
                <div class="cardFlag" style="background-image: url(${obj[0].flags.png});">
                    <div class="Profile " style="background-image: url(${obj[0].coatOfArms.png});" ></div>
                </div>
                <div   class="neighbour"  >${obj[0].name.common}</div>
                <div  class="capital" >${obj[0].capital[0]}</div>
                
                
                <div id="OfficialNameValue${i}"  class="OfficialNameValue">${obj[0].name.official}</div>
                <div class="OfficialName">Officially named as </div>
                

                <div class="display">
                    <div  class="populationValue">${obj[0].population}</div>
                    <div  class="AreaValue">${obj[0].area}</div>
                </div>
                <div class="display">
                    <div class="population ">Population</div>
                    <div class="Area">Area</div>
                </div>
      `


}

function OpensearchInput() {
  var input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  input.classList.add('ResponseSearchInput')
  document.getElementById("searchArea").appendChild(input);
//  let input=document.getElementById("searchCountry");

  if( input.style.display==='block'){
    input.style.display='none';
  }else{
  input.style.display='block';
  }
  alert(input.style.display)
}

function Resize() {
  var w = window.innerWidth;
  if(w<=598){
    console.log("Buttons")
   // document.getElementById("searchArea").innerHTML=`<i class="fa-solid fa-magnifying-glass-location"></i>`;
  //  document.getElementById("srchbtn").classList.add('Responsivebtn')
  // document.getElementById("searchbtn").onclick= function(){

  // };
  // document.getElementById("srchbtn").addEventListener("click", myFunction);

  // function myFunction() {
  //  OpensearchInput();
  // }
  //   document.getElementById("searchCountry").style.display='none';
  let SearchArea=document.getElementById("searchArea");
  if(SearchArea!=null){
    SearchArea.innerHTML=`  <div class="search-box">
  <button class="btn-search"><i id="srchbtn" class="fas fa-search"></i></button>
  <input type="text" class="input-search" id="searchCountry" onkeypress="return EnterClicked(event)" placeholder="Search...">
</div>`
  }
    document.getElementById("homeNav").innerHTML=`<i class="fa-solid fa-house"></i>`;
    document.getElementById("AboutNav").innerHTML=`<i class="fa-solid fa-address-card"></i>`;
    
  }else{
    let SearchArea=document.getElementById("searchArea");
    if(SearchArea!=null){
      SearchArea.innerHTML=` 
    <input type="text" id="searchCountry" onkeypress="return EnterClicked(event)" placeholder="Search...">
    <i id="srchbtn" class="fa-solid fa-magnifying-glass-location fa-2xl search-btn" ></i>`
    }
        console.log("Home and About")
    //     document.getElementById("srchbtn").addEventListener("click", myFunction);

    //     function myFunction() {
    //      search();
    //     }
    // document.getElementById("searchCountry").style.display='block';
    document.getElementById("homeNav").innerHTML=`Home`;
    document.getElementById("AboutNav").innerHTML=`About Us`;
  }
}

