// Zoom Annotations (Final)
// Coding Challenge
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/157-zoom-annotations.html
// https://youtu.be/

// Basic: https://editor.p5js.org/codingtrain/sketches/EaioB_iJs
// Final: https://editor.p5js.org/codingtrain/sketches/ELpl_VAqs

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/livXJJBI5/'
// Video
let video;
let flippedVideo;
// To store the classification
let label = '';

let fluist;
let fluistFade = 0;

let yes;
let yesFade = 0;

let love;
let loveFade = 0;

let laugh;
let laughFade = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  fluist = loadImage('3.jpg');
  yes = loadImage('yes.png');
  laugh = loadImage('laugh.png');
  love = createVideo('love.mp4');
}



function setup() {
  createCanvas(1280, 720);
  love.hide();
  love.loop();
  // Create the video
  video = createCapture(VIDEO);
  video.size(160, 120);
  // video.hide();
   fluist.resize(200, 200);

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0, 0, 0);
  imageMode(CORNER);

  // Draw the video
  //tint(255);
  //image(flippedVideo, 0, 0);
  if (label == 'Fluist🤙🤙') {
    fluistFade = 255;
  } else if (label == 'Namaste🙏') {
    yesFade = 255;
  } else if (label == 'Buddha Hand👌👌') {
    laughFade = 255;
  } 

  if (fluistFade > 0) {
    tint(255, fluistFade);
    image(fluist, 0, 0);
    fluistFade -= 10;
  }

  if (yesFade > 0) {
    tint(255, yesFade);
    image(yes, 0, 0);
    yesFade -= 10;
  }

  if (loveFade > 0) {
    tint(255, loveFade);
    image(love, 0, 0, width, height);
    loveFade -= 10;
  }

  

  if (laughFade > 0) {
    tint(255, laughFade);
    imageMode(CENTER);
    image(laugh, width / 2, height / 2, 720, 720);
    laughFade -= 10;
  }

  // Draw the label
   fill(255);
  textSize(16);
  textAlign(CENTER);
   text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
