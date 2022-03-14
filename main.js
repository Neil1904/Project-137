status = "";
objects = [];

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    object_detector = ml5.objectDetector("COCOSSD", modelLoaded);
    document.getElementById("finding_status").innerHTML = "Status : Detecting Objects";
    objectName = document.getElementById('idk').value;
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        object_detector.detect(video, gotresult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("blue");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke("blue");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
            if (objects[i].label == objectName) {
                video.stop();
                object_detector.detect(gotresult);
                document.getElementById("finding_status").innerHTML = objectName + " found!";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objectName + " found!");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("finding_status").innerHTML = objectName + " not found";
            }
        }
    }
}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    }

    else {
        console.log(results);
        objects = results;
    }
}