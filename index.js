const path = require("path")
const fs = require("fs")




module.exports.allFilesInPath = function  (dirPath){     // list all files in each directory (MAX 2 DIRECTORIES)

    var items   = fs.readdirSync(dirPath)                                                                       // find all files and folders in a given filepath and save as items
    var folders = items.filter( (a,i) => fs.lstatSync( path.join(dirPath, a) ).isDirectory() )                  // find all folders in our items array
    var files   = items.filter( (a,i) => fs.lstatSync( path.join(dirPath, a) ).isFile()      )                  // find all files in our items array

    for (i in folders){                                                                                         // loop through folders array
        filePath = path.join(dirPath, folders[i])                                                                   // make filepath appending folder name to given dirPath
        var subitems   = fs.readdirSync(filePath)                                                                   // find all files and folders in filepath
        var subfolders = subitems.filter( (a,i) => fs.lstatSync( path.join(filePath, a) ).isDirectory() )            // find all folders in our items array
            subfiles   = subitems.filter( (a,i) => fs.lstatSync( path.join(filePath, a) ).isFile()      )            // find all files in our items array
        if(subfiles.length > 0) files.push(...subfiles)                                                             // if any subfiles exist add to files array
    }
    return files                                                                                                // return list of all files
}

// RECURSIVE SOLUTION FOR ALLLLL FILES

// module.exports.allFilesInPath = function  (dirPath){     // list all files in filepath incl sub directories

//     function recursiveSearch(dirPath, allFiles=[]){       // recursive search that finds all files in path. searches for files within sub folders
        
//         var items   = fs.readdirSync(dirPath)                                                                      // find all files and folders in a given filepath and save as items
//         var folders = items.filter( (a,i) => fs.lstatSync( path.join(dirPath, a) ).isDirectory() )                 // find all folders in our items array
//         var files   = items.filter( (a,i) => fs.lstatSync( path.join(dirPath, a) ).isFile()      )                 // find all files in our items array

//         if(files.length   > 0) allFiles.push(...files)                                                             // if files array has files in it push to allFiles array
        
//         if(folders.length > 0){                                                                                    // if folders array not empty 
//             for(i in folders){                                                                                         // -> loop through aray of folders
//                 folderFiles = recursiveSearch( path.join(dirPath, folders[i]), allFiles )                                  // call search of subfolder and save items to list
//                 if(folderFiles > 0) allFiles.push(folderFiles)                                                             // if subfolder array of items is not empty push to allFiles array
//         }   }
//         return allFiles                                                                                            // return allFiles
//     }
//     return recursiveSearch(dirPath)                                                                          // return the final result of our recursive search
// }


module.exports.deleteAllFiles = function  (dirPath){        // deletes all files in a directory including all sub -directory files

    function recursiveDelete(dirPath){                      
        var items   = fs.readdirSync(dirPath)                                                                       // find all files and folders in a given filepath and save as items
        var folders = items.filter( (a,i) => fs.lstatSync( path.join(dirPath, a) ).isDirectory() )                  // find all folders in our items array
        var files   = items.filter( (a,i) => fs.lstatSync( path.join(dirPath, a) ).isFile()      )                  // find all files in our items array
        
        files.forEach( (file) => fs.unlinkSync( path.join( dirPath, file ) ) )                                      // for every file in array, delete it!  // create the correct filepath by joining the folder path and the filename

        folders.forEach( (folder) => recursiveDelete( path.join( dirPath, folder ) ) )                              // for every folder in array, call delete function inside it  // create the correct filepath by joining the folder path and the filename
    }
    recursiveDelete(dirPath)                                // initiate recursive delete in the given directory                                                                     
}


module.exports.deleteAllFileslike = function  (dirPath, condition){

    function recursiveDelete(dirPath){                      
        var items   = fs.readdirSync(dirPath)                                                                       // find all files and folders in a given filepath and save as items
        var folders = items.filter( (a,i) => fs.lstatSync( path.join(dirPath, a) ).isDirectory() )                  // find all folders in our items array
        var files   = items.filter( (a,i) => fs.lstatSync( path.join(dirPath, a) ).isFile()                         // find all files in items array
                                                                     && a.indexOf(condition) !== -1)                    // AND check they match the condition
        
        files.forEach( (file) => fs.unlinkSync( path.join( dirPath, file ) ) )                                      // for every file in array, delete it!  // create the correct filepath by joining the folder path and the filename

        folders.forEach( (folder) => recursiveDelete( path.join( dirPath, folder ) ) )                              // for every folder in array, call delete function inside it  // create the correct filepath by joining the folder path and the filename
    }
    recursiveDelete(dirPath)                                // initiate recursive delete in the given directory                                                                     
}


module.exports.mkFileIn = function (data, ...list){

    pathname = ""                                                   // init empty pathname variable
    for(i=0; i<list.length-1; i++){                                 // loop through list of folders and stop before the filename
        pathname += list[i]                                         // add foldername to the pathname
        if(!fs.existsSync(pathname)) fs.mkdirSync(pathname)         // create next folder with most recent pathname
        pathname += "/"                                             // append '/' ready for next folder name to be added in next loop
    }
    fs.writeFileSync(path.join(...list), data)                      // create file by joining list array of folders and file into a path
}





// ===== SHIT that worked and i replaced with difficult stuff =======================

// ===  delete all files loops =====
    // for(i in files){
    //     fs.unlinkSync( path.join( dirPath, files[i]) ) 
    // }
        // for(i in subfiles){
        //     fs.unlinkSync( path.join( filePath, subfiles[i]) ) 
        // }

// === delete all files, non-recursive ========

// module.exports.deleteAllFiles = function  (dirPath){        // deletes all files in a directory including all sub -directory files

//     var items   = fs.readdirSync(dirPath)                                                                       // find all files and folders in a given filepath and save as items
//     var folders = items.filter( (a,i) => fs.lstatSync( path.join(dirPath, a) ).isDirectory() )                  // find all folders in our items array
//     var files   = items.filter( (a,i) => fs.lstatSync( path.join(dirPath, a) ).isFile()      )                  // find all files in our items array
    
//     files.forEach( (file) => fs.unlinkSync( path.join( dirPath, file ) ) )                                      // for every file in array, delete it!  // create the correct filepath by joining the folder path and the filename

//     for (i in folders){                                                                                         // loop through folders array
//         filePath = path.join(dirPath, folders[i])                                                                   // make filepath appending folder name to given dirPath
//         var subitems   = fs.readdirSync(filePath)                                                                   // find all files and folders in filepath
//      // var subfolders = subitems.filter( (a,i) => fs.lstatSync( path.join(filePath, a) ).isDirectory() )           // find all folders in our items array
//         var subfiles   = subitems.filter( (a,i) => fs.lstatSync( path.join(filePath, a) ).isFile()      )           // find all files in our items array

//         subfiles.forEach( (file) => fs.unlinkSync( path.join( filePath, file) ) )                                   // for every file in array, delete it!  // create the correct filepath by joining the folder path and the filename
//     }
// }