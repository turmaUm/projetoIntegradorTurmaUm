let count=1;
document.getElementById("radio"+count).checked= true;

setInterval(function(){
    nextImage();
}, 2000)

function nextImage(){
  count++;
  if(count>3){
    count=1;
  }
  document.getElementById("radio"+count).checked = true;
}