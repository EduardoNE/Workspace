var OrdenedItem = [];
function startLS(item,value){
  OrdenedItem[item] = [];
  if(window.localStorage.getItem(item) == null)
    window.localStorage.setItem(item, JSON.stringify(OrdenedItem[item]));

  var tmp = JSON.parse(window.localStorage.getItem(item));
  var x = 0; 
  for (index = 0; index < tmp.length; index++) {
    if(tmp[index] != undefined && tmp[index] != null){
      OrdenedItem[item][x] = tmp[index];
      x++;
    }
  }
  //console.log(OrdenedItem[item]);

  if(OrdenedItem[item].indexOf(value)>-1)
    return true;
  else
    return false;

}

function saveLS(item,value){
  var next = OrdenedItem[item].length;
  OrdenedItem[item][next] = value;

  window.localStorage.setItem(item, JSON.stringify(OrdenedItem[item]));

  //console.log(OrdenedItem[item]);
}

function removeLS(item,value){
  var index = OrdenedItem[item].indexOf(value);

  if (index > -1) {
    OrdenedItem[item].splice(index, 1);
  }

  window.localStorage.setItem(item, JSON.stringify(OrdenedItem[item]));

  //console.log(index + " - " + value);
  //console.log(OrdenedItem[item]);
}

function limpaLS(item){
  
  OrdenedItem[item] = [];
  window.localStorage.setItem(item, JSON.stringify(OrdenedItem[item]));
  //console.log(OrdenedItem[item]);

}

function getLS(item){

  return OrdenedItem[item];
  

}
