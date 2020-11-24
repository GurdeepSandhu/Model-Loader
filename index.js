window.addEventListener('load', async function() { 

//Label 1
const txtLabel1 = document.querySelector('#txtLabel1'),

//Predictions
btnPredict = document.querySelector('#btnPredict'),
lPrediction = document.querySelector('#lPrediction'),

//Status for feed
statusModel = document.querySelector('#statusModel'),
statusVideo = document.querySelector('#statusVideo'),

checkModel = document.querySelector('#CheckModel'),
loadLabels = document.querySelector('#loadLabels'),
loadModel = document.querySelector('#loadModel'),

jsonUpload = document.getElementById('upload-json'),
weightsUpload = document.getElementById('upload-weights');





var flagPredicting = false; 

var isPredicting = false; 



const classifier = new imageClassifier(6);
classifier.initalise().then(function () {

    statusModel.textContent = 'Model Loaded';

});

classifier.createWebcam().then(function () {
    statusVideo.textContent = 'Webcam Initialised';
});



checkModel.addEventListener('click', function() {
    classifier.checkModel(); 
});



loadLabels.addEventListener('click', function() {
    classifier.addLabel('C');
    classifier.addLabel('F');
    classifier.addLabel('G');
    classifier.addLabel('N');
    classifier.addLabel('H');
    classifier.addLabel('Z'); 
});

loadModel.addEventListener('click', function() {
    classifier.loadModel(); 
});







loadModel.addEventListener('click', async function() {
    const model = await tf.loadLayersModel(
        tf.io.browserFiles( [jsonUpload.files[0], weightsUpload.files[0]]));

        classifier.loadModel(model);
}) 
// addLabel7.addEventListener('click', function() {
//     if(num7 == 0) {
//         txtLabel7.disabled = true; 
//     }
//     let label = txtLabel7.value.trim();  
//     classifier.addLabel(label);
//     numLabel7.textContent = ++num7; 
    
 
// });


btnPredict.addEventListener('click', async function() {
    isPredicting = !isPredicting; 
    if(isPredicting) {
        console.log("If statement working ");
        this.textContent = 'Stop Predicting';
        classifier.predict().then(updatePrediction);
    } else {
        this.textContent = 'start predicting'; 
    }

})


//Recursively allows for predictions to occur 
function updatePrediction(label) {
    lPrediction.textContent = label; 
    console.log('Label is  ' + label); 
    if(isPredicting) {
        classifier.predict().then(updatePrediction);
        }
    }

});












