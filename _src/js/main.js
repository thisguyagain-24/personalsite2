var contentainter = document.querySelector(".internalContent")

console.log(contentainter)
// fetch json from external source here... we'll use a local file for now

var thisPage = document.title;

console.log(thisPage)

fetchContent(thisPage)

async function fetchContent(thisPage) {

    switch (thisPage) {

        case "Potential Energy -- Home":

            var contentURL = '../js/data.json';

            break;

        case "Potential Energy -- Web Projects":
        
            var contentURL = '../js/webprojData.json'; // todo: alternate data source here

            break;

    }

    let data = 'data has not been fetched.'

/*     try {
 */
        const response = await fetch(contentURL);

        if (!response.ok) { // first, if we get a bad status code, throw

            contentainter.innerHTML = `There was a problem fetching this content. Please reload the page. Error information: ${response.status}`

            throw new Error(`There was a problem fetching this content. Please reload the page. Error information: ${response.status}`)

        }

        // todo: do error handling here

        // we continue to try to process the data

        data = await response.json()

        switch (thisPage) {


        case "Potential Energy -- Home":

            mainFormatter(data)

            break;

        case "Potential Energy -- Web Projects":
            
            projFormatter(data)

            break;

        //todo: the last case
        }


/*     } catch(error) {

        console.log(`An error has occured. Error information: ${error}`)
    } */
}




function mainFormatter(data) {

    data.forEach(package => {

        // format stuff

        var thisTitle = package.title;

        var thisContent = package.text;

        var thisAssets = undefined;
        
        let assetsArray = []

        console.log(package.assets)

        if (package.assets !== (undefined)) { // if assets are not undefined

            thisAssets = package.assets;

                {thisAssets.forEach(asset => {

                    if (getExtension(asset) == ".png" || ".jpg" || ".jpeg" || ".webp" || ".gif" || ".svg" || ".heif" || ".tiff"){ // check for image file types 

                        //if its an image, put it in an image element

                        var anAsset = document.createElement("img")

                        anAsset.src = asset

                        assetsArray.push(anAsset)

                    } else if (getExtension(asset) == ".mp4" || ".ogg" || ".webm" ) { // check for video file types

                        // if it's a video, make it a video

                        var anAsset = document.createElement("video")

                        anAsset.src = asset

                        assetsArray.push(anAsset)

                    }

                    console.log(asset)

                    // todo: mkv support so I dont have to fuss with conversion straight from my computer, audio support

                }
                    
            )
        }

        }

        // console.log("on package " + thisTitle, thisContent, thisAssets, assetsArray)

        var toInsertThis = document.createElement("div")

        toInsertThis.innerHTML = `<h2> ${thisTitle} </h2> <p> ${thisContent} </p>`

        assetsArray.forEach(asset => {

            toInsertThis.appendChild(asset)
            
        });

        contentainter.appendChild(toInsertThis)


        }

    )
}

function projFormatter(data) {

    data.forEach(package => {

        var thisTitle = package.title;

        var thisDesc = package.desc;

        var thisThumb = package.thumbnail;
        
        var toInsertThis = `<div class="galleryDiv"> <img class="galleryImg" src=${thisThumb}> <h2> ${thisTitle} </h2> <p> ${thisDesc} </p> </div>`

        contentainter.innerHTML += (toInsertThis)
    })
}

// yeah i nabbed this from stackoverflow.... thank yoooouuu stackoverflow

// source: https://stackoverflow.com/a/12900504

function getExtension(path) {


    var basename = path.split(/[\\/]/).pop(),  // extract file name from full path ...
                                               // (supports `\\` and `/` separators)
        pos = basename.lastIndexOf(".");       // get last position of `.`

    if (basename === "" || pos < 1)            // if file name is empty or ...
        return "";                             //  `.` not found (-1) or comes first (0)

    return basename.slice(pos + 1);            // extract extension ignoring `.`
}

