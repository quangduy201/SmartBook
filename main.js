window.onload=function(){
    var img = document.getElementById("inp").files;
    if (img.length > 0) {
    var fileReader = new FileReader();
    
    fileReader.onload = function(event) {
        console.log(fileReader.result);
    };
    fileReader.readAsDataURL(img[0]);
}
}