img="";
status="";
objects=[];

function preload(){
    img=loadImage('dog_cat.jpg');
}
function setup(){
 canvas=createCanvas(380,380);
 canvas.center();
 video=createCapture(VIDEO);
 video.size(380,380);
 video.hide();
 objectDetector=ml5.objectDetector('cocossd',modelLoaded);
 document.getElementById("status").innerHTML="status:detecting objects";
}
function modelLoaded(){
    console.log("model is loaded");
    status=true;
    
}
function gotresult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
function draw(){
    image(video,0,0,380,380);
    // fill("#03fcdb");
    //text("dog",110,100);
    //stroke("#03fcdb");
    //noFill();
    //rect(99,55,300,350);
     //fill("#03fcdb");
    //text("cat",350,120);
    //stroke("#03fcdb");
    //noFill();
    //rect(300,95,270,290);
    //fill("#03fcdb");
    //text("bowl",300,310);
    //stroke("#03fcdb");
    //noFill();
    //rect(270,290,150,130);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotresult);
        for (i=0; i< objects.length; i++){
            document.getElementById("status").innerHTML="status:detection done";
            document.getElementById("no_of_objects").innerHTML="no.of objects detected are:"+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+" %",objects[i].x+15,objects[i].y+15);
            stroke(r,g,b);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
          
        }
    }
}