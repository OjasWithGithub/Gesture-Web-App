Webcam.set({
    width: 350,
    height: 270,
    png_quality: 90,
    png_format: 'png'
})

camera = document.getElementById("camera")

Webcam.attach(camera)

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "img" src = " '+data_uri+'"/></img>';
    })
    
}

console.log('ml5 version',ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-osTVLbhn/model.json',modelLoaded)

function modelLoaded(){
    console.log("Model Loaded!")
}

function check(){
    img = document.getElementById("img")
    classifier.classify(img,gotResults)
}

function speak_now(){
    synth = window.speechSynthesis
    speak_data1 = "The first prediction is "+prediction_1;
    speak_data2 = " and second prediction is "+prediction_2;
    utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2)
    synth.speak(utterThis)
}

function gotResults(error,results){
    if (error){
        console.error(error)
    }
    else {
        console.log(results)

        document.getElementById("result_emotion_name1").innerHTML = results[0].label
        document.getElementById("result_emotion_name2").innerHTML = results[1].label

        prediction_1 = results[0].label
        prediction_2 = results[1].label

        if(prediction_1 == "Thumbs Up"){
          document.getElementById("update_emoji").innerHTML = "&#128077;"
        }
        if(prediction_1 == "Ok"){
            document.getElementById("update_emoji").innerHTML = "&#128076;"
        }
        if(prediction_1 == "Victory"){
            document.getElementById("update_emoji").innerHTML = "&#128533;"
        }
        

        if(prediction_2 == "Thumbs Up"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;"
        }
        if(prediction_2 == "Ok"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;"
        }
        if(prediction_2 == "Victory"){
            document.getElementById("update_emoji2").innerHTML = "&#9996;"
        }
    
    }
}
