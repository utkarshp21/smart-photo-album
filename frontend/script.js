let apigClient = apigClientFactory.newClient({ apiKey: "ZHVVJ84EWN5ZuvlpnFfvT2fAjRyJTE7Y3igz3Fxu" });

function searchImages() {
    let searchQuery = document.getElementById("searchInput").value;

    if(!searchQuery){
        alert("Please provide an input");
    }
    else{
        apigClient.searchGet({ "q": searchQuery })
            .then(function (result) {
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
            console.log(path);
            $('#imageContainer').append(`<div class="col-md-4 nopadding"><div class="thumbnail">
                <a href="https://s3.amazonaws.com/${path}" target="_blank">
                <img src="https://s3.amazonaws.com/${path}" alt="Lights" style="width:100%"></a></div></div>`)
        });
    }
}

