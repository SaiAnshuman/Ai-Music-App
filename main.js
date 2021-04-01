leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWristY = 0;
scorerightWristY = 0;

song1 = "";
song2 = "";


function preload(){
   
    song1 = loadSound("1.mp3");
    song2 = loadSound("2.mp3");


   }


function setup() {

    canvas = createCanvas(600,500);
    canvas.center();
   
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);

 posenet.on('pose',gotPoses);
   
   
    
   
   }

   song1status="";
   song2status="";
   
   function draw(){
   
   image(video,0,0,600,500);
    
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();

   stroke("#000000");
   fill("#DC143C");

 if(scoreleftWristY > 0.2){

 circle(leftWristX,leftWristY,20);
 song1.stop();
 if(song2status == false){
   
   song2.play();
   document.getElementById("music").innerHTML = "Playing - THINK IT THRU";
 }


 
 
 

}

if(scorerightWristY > 0.2){

   circle(rightWristX,rightWristY,20);
   song2.stop();
   if(song1status == false){
    song1.play();
    document.getElementById("music").innerHTML = "Playing - Chill Lofi";

   }

   
   }


}
   
   
   function modelLoaded(){

    console.log("Model Has Been Loaded");
    
    
    }

    function play(){
      
      song.play();
      song.setVolume(1);
      song.rate(1);

    }

    function gotPoses(results){

        if(results.length > 0){
          scoreleftWristY = results[0].pose.keypoints[9].score;
          scorerightWristY = results[0].pose.keypoints[10].score;
          console.log(scoreleftWristY);      

           console.log(results);
       
           leftWristX = results[0].pose.leftWrist.x;
           leftWristY = results[0].pose.leftWrist.y;
           console.log("leftWrist X = " + leftWristX + " left wrist Y = " + leftWristY );
       
           rightWristX = results[0].pose.rightWrist.x;
           rightWristY = results[0].pose.rightWrist.y;
           console.log("rightWrist X = " + rightWristX + " rightWrist Y = " + rightWristY);
       
        }
       
       
       }