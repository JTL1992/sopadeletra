
var table = "";
var array = [];
Template.sopa.events({
  'click .generate': function(event, instance) {
    // increment the counter when button is clicked
      event.preventDefault();
      cleanMap();
      var s = $("#origin").val();
        table = s.split("\n");
    setMap();
  },
  "click .search": function(e){
      e.preventDefault();
      var search = $("#search").val();
      findLetras(search);
    console.log("search: "+search+ " soap: "+array)
  }
});

function pintColor(point){
    if(Array.isArray(point))
      point.forEach(function(num){
          var cell = document.getElementById("cell"+num);
          cell.setAttribute("bgcolor","red");
      });
}
function cleanMap(){
    $("#div").remove();
}
function setMap(){
  var mybody = document.getElementsByTagName("body").item(0);
  var div = document.createElement("DIV");
    div.id = "div";
  // 创建一个TABLE的元素
  var mytable = document.createElement("TABLE");
  mytable.id = "mytable";
  // 创建一个TBODY的元素
  var mytablebody = document.createElement("TBODY");
  for (var i = 0; i <= table.length-1; i++){
    // 创建一个TR元素
    var mycurrent_row = document.createElement("TR");
    mycurrent_row.id = "row"+i;
    for(var j = 0; j <= table[i].length-1; j++){
      // 创建一个TD元素
      var mycurrent_cell = document.createElement("TD");
      mycurrent_cell.id = "cell"+i+j;
      // 创建一个文本（text）节点
      var currenttext = document.createTextNode(table[i][j]);
      // 将我们创建的这个文本节点添加在TD元素里
      mycurrent_cell.appendChild(currenttext);
      // 将TD元素添加在TR里
      mycurrent_row.appendChild(mycurrent_cell);
    }
    // 将TR元素添加在TBODY里
    mytablebody.appendChild(mycurrent_row);
  }
  mytable.appendChild(mytablebody);
  div.appendChild(mytable);
  // 将TABLE元素添加在BODY里
  mybody.appendChild(div);
  // 设置mytable的边界属性border为2
  div.className = "sopa";

    array = [];
    var i = 0;
    table.forEach(function(t){
        t = t.split("");
        array[i++] = t;
    });
}

function findLetras(s){
      for (var i = 0; i < array.length; i++) {
          for (var j = 0; j < array[i].length; j++) {
              if (s[0] == array[i][j]){
                  if(1 == s.length)
                     pintColor([""+i+j]);
                  else
                     second(s,i,j)
              }
          }
      }

}
function second(s,i,j){
    if((i-1)>=0 && (j-1)>=0)
        if(s[1] == array[i-1][j-1])
            if(s.length == 2)
                pintColor([""+i+j,""+(i-1)+(j-1)]);
            else
                bBackFromLeftToRight(s,i,j);
    if(i-1 >= 0)
        if(s[1] == array[i-1][j])
            if(s.length == 2)
                pintColor([""+i+j,""+(i-1)+(j)]);
            else
                vBack(s,i,j);
    if(i-1 >= 0 && j+1 < array[0].length)
        if(s[1] == array[i-1][j+1])
            if(s.length == 2)
                pintColor([""+i+j,""+(i-1)+(j+1)]);
            else
                bBackFromRightToLeft(s,i,j);
    if(j+1 < array[0].length)
        if(s[1] == array[i][j+1])
            if(s.length == 2)
                pintColor([""+i+j,""+(i)+(j+1)]);
            else
                hFront(s,i,j);
    if(j+1 < array[0].length && i+1 < array.length)
        if(s[1] == array[i+1][j+1])
            if(s.length == 2)
                pintColor([""+i+j,""+(i+1)+(j+1)]);
            else
                bFrontFromLeftToRight(s,i,j);
    if(i+1 < array.length)
        if(s[1] == array[i+1][j])
            if(s.length == 2)
                pintColor([""+i+j,""+(i+1)+(j)]);
            else
                vFront(s,i,j);
    if(i+1 < array.length && j-1 >= 0)
        if(s[1] == array[i+1][j-1])
            if(s.length == 2)
                pintColor([""+i+j,""+(i+1)+(j-1)]);
            else
                bFrontFromRightToLeft(s,i,j);
    if(j-1 >= 0)
        if(s[1] == array[i][j-1])
            if(s.length == 2)
                pintColor([""+i+j,""+(i)+(j-1)]);
            else
                hBack(s,i,j);

}
function vFront(s,i,j){
    var a = true;
    var result = [];
    if((i+s.length) <= array.length){
        for(var k = 0;k < s.length; i++,k++){
           if (s[k] != array[i][j]){
               a = false;
               break;
           }else{
               result.push(""+i+j)
           }
        }
    }else {
        a = false;
    }
    if(a){
        pintColor(result);
    }
}
function vBack(s,i,j){
    var a = true;
    var result = [];
    if((i - s.length+1)>=0){
        for (var k = 0; k < s.length; k++,i--){
            if (s[k] != array[i][j]){
                a = false;
                break;
            }else{
                result.push(""+i+j)
            }
        }
    }else {
        a = false;
    }
    if(a){
        pintColor(result);
    }
}
function hFront(s,i,j){
    var a = true;
    var result = [];
    if(j + s.length <= array[0].length){
        for(var k = 0; k < s.length; k++, j++)
            if(s[k] != array[i][j]){
                a = false;
                break;
             }else {
                result.push("" + i + j)
            }
    }else {
        a = false;
    }
    if(a){
        pintColor(result);
    }
}
function hBack(s,i,j){
    var a = true;
    var result = [];
    if(j - s.length+1 >= 0){
        for(var k = 0; k < s.length; k++, j--)
            if(s[k] != array[i][j]){
                a = false;
                break;
            }else {
                result.push("" + i + j)
            }
    }else {
        a = false;
    }
    if(a){
        pintColor(result);
    }
}
function bFrontFromLeftToRight(s,i,j){
    var a = true;
    var result = [];
    if(j + s.length <= array[0].length && i + s.length <= array.length){
        for(var k = 0; k < s.length; k++, j++,i++)
            if(s[k] != array[i][j]){
                a = false;
                break;
            }else {
                result.push("" + i + j)
            }
    }else {
        a = false;
    }
    if(a){
        pintColor(result);
    }
}
function bBackFromLeftToRight(s,i,j){
    var a = true;
    var result = [];
    if(j - s.length + 1 >= 0 && i - s.length + 1 >= 0){
        for(var k = 0; k < s.length; k++, j--,i--)
            if(s[k] != array[i][j]){
                a = false;
                break;
            }else {
                result.push("" + i + j)
            }
    }else {
        a = false;
    }
    if(a){
        pintColor(result);
    }
}
function bFrontFromRightToLeft(s,i,j){
    var a = true;
    var result = [];
    if(j - s.length+1 >= 0 && i + s.length <= array.length){
        for(var k = 0; k < s.length; k++, j--,i++)
            if(s[k] != array[i][j]){
                a = false;
                break;
            }else {
                result.push("" + i + j)
            }
    }else {
        a = false;
    }
    if(a){
        pintColor(result);
    }
}
function bBackFromRightToLeft(s,i,j){
    var a = true;
    var result = [];
    if(j + s.length <= array[0].length && i - s.length +1 >= 0){
        for(var k = 0; k < s.length; k++, j++,i--)
            if(s[k] != array[i][j]){
                a = false;
                break;
            }else {
                result.push("" + i + j)
            }
    }else {
        a = false;
    }
    if(a){
        pintColor(result);
    }
}