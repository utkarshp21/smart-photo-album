let apigClient = apigClientFactory.newClient({ apiKey: "ZHVVJ84EWN5ZuvlpnFfvT2fAjRyJTE7Y3igz3Fxu" });

let inputBox = document.getElementById("searchInput");

// var transcribeservice = new AWS.TranscribeService();


// function blobToFile(theBlob, fileName) {
//     //A Blob() is almost a File() - it's just missing the two properties below which we will add
//     theBlob.lastModifiedDate = new Date();
//     theBlob.name = fileName;
//     return theBlob;
// }

// function voiceSearch() {
    
//     navigator.mediaDevices.getUserMedia({ audio: true })
//         .then(stream => {
//             const mediaRecorder = new MediaRecorder(stream);
//             mediaRecorder.start();

//             const audioChunks = [];
//             mediaRecorder.addEventListener("dataavailable", event => {
//                 audioChunks.push(event.data);
//             });
//             MediaRecorder.isTypeSupported("audio/wav;codecs=MS_PCM")

//             debugger;
            
//             mediaRecorder.addEventListener("stop", () => {
//                 const audioBlob = new Blob(audioChunks, { 'type': 'audio/wav; codecs=0' });
//                 const audioUrl = URL.createObjectURL(audioBlob);
//                 const audio = new Audio(audioUrl);
//                 let file = blobToFile(audioBlob, "my-recording.wav"); 
//                 debugger;
//                 audio.play();
//             });

//             setTimeout(() => {
//                 mediaRecorder.stop();
//             }, 3000);
//     });

// }

// voiceSearch()

function searchImages() {

    let searchQuery = inputBox.value;
    
    // let elem = document.querySelector('#imageContainer');
    // elem.removeChild(elem)

    // let imagesContainer = document.getElementById('imageContainer');
    // while (imagesContainer.firstChild) {
    //     imagesContainer.removeChild(imagesContainer.firstChild);
    // }

    if(!searchQuery){
        alert("Please provide an input");
    }
    else{
        apigClient.searchGet({ "q": searchQuery })
            .then(function (result) {
                console.log(result.data.body.imagePaths);
                showImages(result.data.body.imagePaths);
            }).catch(function (result) {
                console.log(result);
                alert("Error in Fetching Images");
        });
    }
}

function showImages(imagesPaths) {
    $("#imageContainer").empty();

    if(!imagesPaths.length){
        alert("No Images Found!")
    }else{
        imagesPaths.forEach(path => {
            $('#imageContainer').append(`<div class="col-md-4 nopadding"><div class="thumbnail">
                <a href="https://s3.amazonaws.com/${path}" target="_blank">
                <img src="https://s3.amazonaws.com/${path}" alt="Lights" style="width:100%"></a></div></div>`)
        });
    }
}

inputBox.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
});


$(document).on('change', '#inputGroupFile02', function () {
    
    let input = $(this),
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);

    let labalElem = document.getElementById("photoLabel");
    labalElem.innerText = label
    
    readURL(this, label);

});


function readURL(input, label) {

    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            upload(reader.result, label );
        }
        reader.onerror = function () {
            console.log(`Error in reader`);
        };
        reader.readAsBinaryString(input.files[0]);
    }
}

function upload(image, imglabel) {
   
    let imageNameS3 = `${imglabel.replace(/\.[^/.]+$/, "")}-${Date.now()}.${imglabel.split(".").pop()}`
    
    let params = { "bucket":"photo-album-b2", "key": imageNameS3, "Content-Type": "image/***" };
    
    let additionalParams = {
        headers: {
            "Content-Type": "image/***",
        }
    };

    apigClient.uploadBucketKeyPut(params, btoa(image), additionalParams)
        .then(function (result) {
            console.log(result);
            alert(`Image ${imglabel},has been uploded`);
            document.getElementById("photoLabel").value  = '';
            document.getElementById("photoLabel").innerText = '';

        }).catch(function (err) {
            console.log(err);
            alert(`Error -${err}`);
    });	

    
    
}