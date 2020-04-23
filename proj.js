
//Declaration
var player1 = prompt("Enter player 1's name:")
var player2 = prompt("Enter player 2's name:")
var playerNum = $("#playerNum")
var player = player1
var dimensions = []
var elements = []
var current_color
var blue = 'rgb(86, 151, 255)'
var red = 'rgb(237, 45, 73)'
var color_map = {'rgb(86, 151, 255)':'blue', 'rgb(237, 45, 73)':'red'}
function reset_game(){
  playerNum.text(player1+" it's your turn. Please pick a column to drop your blue chip")
  current_color = red
  player = player2
  var temp = '.d'
  dimensions = []
  elements = []
  for(var i=1; i<8; i++){
    dimensions.push($(temp+i))
    elements.push(dimensions[dimensions.length-1].length)
  }
  for (var i = 1; i < 6; i++) {
    for (var j = 1; j < 8; j++) {
      $("#i"+i+j).css("background-color","#f0eded")
    }
  }
}


function returnColor(){
  playerNum.text(player+" it's your turn. Please pick a column to drop your "+color_map[current_color]+" chip")
  if(current_color == blue){
    current_color = red
    player = player2
  }
  else{
    current_color = blue
    player = player1
  }
  return current_color
}

function checkWon(current_chip){
  console.log(current_chip[0].id)
  var id = current_chip[0].id
  var color = $("#"+id).css("background-color")
  var row = id[1]
  var col = id[2]
  var counter = 0
  for(var i=1;i<8;i++){
    var cu = $("#i"+row+i).css("background-color")
    if(cu == color){
      counter++
    }
    else{
      counter = 0
    }
    if(counter>=4){
      return true
    }
  }
  counter = 0
  for(var i=1;i<6;i++){
    var cu = $("#i"+i+col).css("background-color")
    if(cu == color){
      counter++
    }
    else{
      counter = 0
    }
    if(counter>=4){
      return true
    }
  }
}



//Main Execution starts here
console.log("Player1:"+player1)
console.log("Player2:"+player2)
reset_game()

for(var i=0;i < dimensions.length; i++){
  dimensions[i].on("click",function(){
    var ind = this.className[1] - 1
    if(elements[ind] > 0){
      dimensions[ind].eq(elements[ind]-1).css("background-color",returnColor())
      elements[ind]-=1
      if(checkWon(dimensions[ind].eq(elements[ind]))){
        console.log(player+" WON!!!!!!")
        alert(player+" WON!!!!!!")
        var c = prompt("Do you want to play a new game (Please enter Y or N):")
        if(c=="Y"){
          reset_game()
        }
        else{
            alert("Quitting")
        }
      }
    }
  })
}
