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
   
   function draw(){
   
   image(video,0,0,600,500);

   stroke("#000000");
   fill("#DC143C");

 if(scoreleftWristY > 0.2){

 circle(leftWristX,leftWristY,20);
 leftWristYNumber =  Number(leftWristY);
 RemoveDecimal = floor(leftWristYNumber);
 song1.setVolume(1);
 song1.play();

 
 
 

}

if(scorerightWristY > 0.2){

   circle(rightWristX,rightWristY,20);
   rightWristYNumber =  Number(rightWristY);
   RemoveDecimal = floor(rightWristYNumber);
   song2.setVolume(1);
   song2.play();
   
   }

   if(scoreleftWristY < 0.2){

     song1.stop();

   }

   if(scorerightWristY < 0.2){

      song2.stop();
 
    }

}
   
   
   function modelLoaded(){

    console.log("Model Has Been Loaded");
    
    
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