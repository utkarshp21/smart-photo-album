let apigClient = apigClientFactory.newClient({ apiKey: "ZHVVJ84EWN5ZuvlpnFfvT2fAjRyJTE7Y3igz3Fxu" });

function searchImages() {
    let searchQuery = document.getElementById("searchInput").value;

    if(!searchQuery){
        alert("Please provide an input");
    }
    else{
        apigClient.searchGet({ "q": searchQuery })
            .then(function (result) {
                console.log('success OK');
                // showImages(result.data.results);
            }).catch(function (result) {
                console.log(result);
        });
    }
}