Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function takeSnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capturedImage" src="' + data_uri + '"/>';
    });
}
console.log('ml5 version = ' + ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1n0NyLeML/model.json', modelLoaded);
function modelLoaded() {
    console.log("model loaded successfully");
}
function checkSnapshot() {
    img = document.getElementById('capturedImage');
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
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
function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction_1;
    speak_data2 = "and the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
} 