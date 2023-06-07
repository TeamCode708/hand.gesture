var SpeechRecognition = window.webkitSpeechRecognition;
//variables to store predictions
prediction_1 = "";
prediction_2 = "";
//setting the webcam
Webcam.set({
    width: 350,
    height : 300,
    image_format: 'png',
    png_quality: 90
});
//variable to store the camera div
camera = document.getElementById("camera");
//attaching the webcam
Webcam.attach('#camera');
//function to take the picture
function takeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
//printing the ml5 version on console screen
console.log('ml5 version : ',ml5.version);
//variable to store the teachable machine model
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1n0NyLeML/model.json',modelLoaded);
//function to check if the model is loaded or not
function modelLoaded() {
    console.log('model loaded!');
}
//function to speak the result (prediction)
function speak() {
    var synth = window.SpeechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
//function to compare the input with the model
function checkSnapshot() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
//function to print the prediction
function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("gestureName1").innerHTML = results[0].label;
        document.getElementById("gestureName2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == "loose") {
            document.getElementById("gestureEmoji1").innerHTML = "&#129305;";
        }
        if (results[0].label == "thumbs up") {
            document.getElementById("gestureEmoji1").innerHTML = "&#128077;";
        }
        if (results[0].label ==  '"OK"') {
            document.getElementById("gestureEmoji1").innerHTML = "&#128076;";
        }
        if (results[0].label == "victory") {
            document.getElementById("gestureEmoji1").innerHTML = "&#9996;";
        }
        if (results[1].label == "loose") {
            document.getElementById("gestureEmoji2").innerHTML = "&#129305;";
        }
        if (results[1].label == "thumbs up") {
            document.getElementById("gestureEmoji2").innerHTML = "&#128077;";
        }
        if (results[1].label == '"OK"') {
            document.getElementById("gestureEmoji2").innerHTML = "&#128076;";
        }
        if (results[1].label == "victory") {
            document.getElementById("gestureEmoji1").innerHTML = "&#9996;";
        }
    }
}