
// Async (Example of loading a image)
function loadImage(errorCallback, successCallback) {
    const image = new Image();

    // Then...
    image.addEventListener("load", function() {
        console.log("Image loading is complete.");
        successCallback && successCallback(image);
    });
    image.addEventListener("error", function() {
        console.log("Image loading is failed.");
        errorCallback && errorCallback(error);
    });

    // When...
    image.src = "URL";
}

loadImage(function(error) {
    console.log("//ToDo: when image loading is failed");
}, function(img) {
    console.log("//ToDo: When image loading is successful");
});

/*
 * Below code is working exactly same as above.
 */

// Promis (Example of loading a image)
function loadImage(url) {

    return new Promise(function(resolve, reject) {
        const image = new Image();

        // Then...
        image.addEventListener("load", function() {
            console.log("Image loading is complete.");
            resolve(image);
        });
        image.addEventListener("error", function() {
            console.log("Image loading is failed.");
            reject(error);
        });
    
        // When...
        image.src = url;
    });
}

loadImage("url").then(function(img) {
    console.log("//ToDo: When image loading is successful");
    return img; // calling new Promise(img) again
}).then(function(img) {
    console.log("//ToDo: When image loaded and what to do next");
}).catch(function(error) {
    console.log("//ToDo: when image loading is failed");
});
