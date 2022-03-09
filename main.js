song1="";
rightwristX=0;
rightwristY=0;
leftwristX=0;
leftwristY=0;
scoreleftwrist=0;
scorerightwrist=0;

function preload(){
    song1=loadSound("SONG1.mp3");
}

function setup(){
canvas=createCanvas(500,400);
canvas.center();
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelloaded);
posenet.on("pose", gotPoses);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
    console.log("leftwristX="+leftwristX+"leftwristY="+leftwristY);
    console.log("rightwristX="+rightwristX+"rightwristY="+rightwristY);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    scorerightwrist=results[0].pose.keypoints[10].score;
    console.log("scoreleftwrist="+scoreleftwrist);
    console.log("scorerightwrist="+scorerightwrist);
}
}

function draw(){
image(video,0,0,500,400);
fill("red");
stroke("blue");
if(scoreleftwrist>0.2){
    circle(leftwristX,leftwristY,20);
    leftwristYno=Number(leftwristY);
    leftwristYnodecimal=floor(leftwristYno*2);
    leftwristYscaledown=leftwristYnodecimal/1000;
    document.getElementById("showvolume").innerHTML="VOLUME:"+leftwristYscaledown;
    song1.setVolume(leftwristYscaledown);
}
if(scorerightwrist>0.2){
    circle(rightwristX,rightwristY,20);
    if(rightwristY>0&&rightwristY<=100)
    {
        document.getElementById("showspeed").innerHTML="SPEED:0.5x";
        song1.rate(0.5);
    }
    else if(rightwristY>100&&rightwristY<=200)
    {
    document.getElementById("showspeed").innerHTML="SPEED:1x";
    song1.rate(1);
    }
    else if(rightwristY>200&&rightwristY<=300)
    {
    document.getElementById("showspeed").innerHTML="SPEED:1.5x";
    song1.rate(1.5);
    }
    else if(rightwristY>300&&rightwristY<=400)
    {
    document.getElementById("showspeed").innerHTML="SPEED:2x";
    song1.rate(2);
    }
    else if(rightwristY>400&&rightwristY<=500)
    {
    document.getElementById("showspeed").innerHTML="SPEED:2.5x";
    song1.rate(2.5);
    }
}
}

 function playsong(){
     song1.play();
     song1.setVolume(1);
     song1.rate(1);
}

 function modelloaded(){
     console.log("model Loaded");
 }