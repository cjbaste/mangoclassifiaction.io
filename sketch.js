let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/0NT9lpxsn/';

// Video
let video;
let flippedVideo;
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {

  createCanvas(720, 480);
  canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px black";
  video = createCapture(VIDEO);
  video.size(720, 480);
  video.hide();
  flippedVideo = ml5.flipImage(video)
  classifyVideo();
}

function draw() {
  background(0);
  image(flippedVideo, 0, 0);
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;
  classifyVideo();
}