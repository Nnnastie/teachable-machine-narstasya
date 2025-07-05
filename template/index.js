// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/M18U0FNUa/';

// Video
let video;
// To store the classification
let label = '';

// Images for good and bad posture
let goodImg, badImg;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  
  // Load images (make sure good.png and bad.png are in the same folder)
  goodImg = loadImage('shrimp.png'); 
  badImg = loadImage('shrimp2.png'); 
}

function setup() {
  createCanvas(320, 480); // Top part for the image, bottom part for video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  classifyVideo();
}

function draw() {
  background(0);
  
  // Show the corresponding image on top
  if (label === 'good posture') {
    image(goodImg, 0, 0, 320, 240);
  } else if (label === 'bad posture') {
    image(badImg, 0, 0, 320, 240);
  }

  // Show the video below the image
  image(video, 0, 240, 320, 240);

  // Show the label as text below the video
  fill(255);
  textSize(14);
  textAlign(CENTER);
  text(label, width / 2, height - 10);
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function gotResult(results) {
  if (results && results[0]) {
    label = results[0].label;
  }
  classifyVideo();
}
