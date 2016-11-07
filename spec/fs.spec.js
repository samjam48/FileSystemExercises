const path = require('path')
const fs = require('fs')
const exercise = require ("../index")
const Chance = require("chance")
const _ =  require("lodash")
const glob = require("glob")
process.chdir(__dirname)


describe( "mkFileIn",  function() {
    let text
    let filename
    let chance
    beforeEach(function(){
        chance = new Chance();
        text =  chance.paragraph({sentences: 1});
        fileName = chance.word({length: 8})  + "." + chance.word({length: 2})
    })

    it( "should create a file", function(){
        const dirList= ["deleteAllLike", fileName]
        const filePath = path.join(...dirList)
        exercise.mkFileIn(text, ...dirList)
        expect(fs.existsSync(filePath)).toBe(true)
        expect(fs.readFileSync(filePath).toString()).toBe(text)
    })

    it( "should change the content of a file", function(){
        const dirList= ["deleteAllLike", fileName]
        const filePath = path.join(...dirList)
        exercise.mkFileIn(text, ...dirList)
        expect(fs.existsSync(filePath)).toBe(true)
        expect(fs.readFileSync(filePath).toString()).toBe(text)
    })

    it( "should create a directory and a file", function(){
        const dirList= ["deleteAllLike", chance.word({length: 4}), fileName]
        const filePath = path.join(...dirList)
        exercise.mkFileIn(text, ...dirList)
        expect(fs.existsSync(filePath)).toBe(true)
        expect(fs.readFileSync(filePath).toString()).toBe(text)
    })

    it( "should create a multiple directories and a file", function(){
        const text = "Hello Class"
        const dirList= ["deleteAllLike", chance.word({length: 4}),
                        chance.word({length: 4}),
                        chance.word({length: 4}), fileName]
        const filePath = path.join(...dirList)
        exercise.mkFileIn(text, ...dirList)
        expect(fs.existsSync(filePath)).toBe(true)
        expect(fs.readFileSync(filePath).toString()).toBe(text)
    })

})


describe( "deleteAllFilesLike",  function() {
    let text = "asdf"
    let filename
    let chance

    function createFileList(){
        return  _.times(Math.floor(10*Math.random() + 1), (num) => {
            chance = new Chance();
            name = chance.word({length: 8})  + "." + (num % 2 ? chance.word({length: 2}) : "asdf" )
            return name
        })
    }

    function createDirList(){
        return _.times(Math.floor(2*Math.random() + 1), () => {
            chance = new Chance();
            file = chance.word({length: 5})
            return createFileList().map((writeFile)=> {return [file, writeFile]} )
        })
    }

    beforeEach(function(){
        fileList = []
        FirstLevel  = createFileList().map( (fname) => {
            fileList.push(["deleteAllLike", fname]);
            exercise.mkFileIn(text,"deleteAllLike", fname)
        })
        secondLevel = createDirList().map( (fname) =>  {
            fname.map((fname2) => {
                fileList.push(["deleteAllLike", ...fname2]);
                exercise.mkFileIn(text, "deleteAllLike", ...fname2)
            })
        })
    })

    it( "should delete all files that end in asdf", function(){
        exercise.deleteAllFileslike("deleteAllLike", "asdf")
        const glob = require("glob")
        foundfiles = glob.sync("deleteAllLike/**/*.asdf")
        expect(foundfiles[0]).toBeUndefined()
    })
})



describe( "deleteAllFiles",  function() {
    let text = "asdf"
    let filename
    let chance
    function createFileList(){
        return  _.times(Math.floor(10*Math.random() + 1), (num) => {
            chance = new Chance();
            name = chance.word({length: 8})  + "." + (num % 2 ? chance.word({length: 2}) : "asdf" )
            return name
        })
    }
    function createDirList(){
        return _.times(Math.floor(2*Math.random() + 1), () => {
            chance = new Chance();
            file = chance.word({length: 5})
            return createFileList().map((writeFile)=> {return [file, writeFile]} )
        })
    }

    beforeEach(function(){
        fileList = []
        FirstLevel  = createFileList().map( (fname) => {
            fileList.push(["deleteAllLike", fname]);
            exercise.mkFileIn(text,"deleteAllLike", fname)
        })
        secondLevel = createDirList().map( (fname) =>  {
            fname.map((fname2) => {
                fileList.push(["deleteAllLike", ...fname2]);
                exercise.mkFileIn(text, "deleteAllLike", ...fname2)
            })
        })
    })

    it( "should delete all files", function(){
        exercise.deleteAllFiles("deleteAllLike")
        const glob = require("glob")
        foundfiles = glob.sync("deleteAllLike/*/*.*")
        expect(foundfiles[0]).toBeUndefined()
    })
})

describe( "allFilesInPath",  function() {
    let text = "asdf"
    let filename
    let chance
    function createFileList(){   // returns a list of random filenames
        return  _.times(Math.floor(10*Math.random() + 1), (num) => {
            chance = new Chance();
            name = chance.word({length: 8})  + "." + (num % 2 ? chance.word({length: 2}) : "asdf" )
            return name
        })
    }
    function createDirList(){    // returns a list of random directories (with random files created inside directory)
        return _.times(Math.floor(2*Math.random() + 1), () => {
            chance = new Chance();
            file = chance.word({length: 5})
            return createFileList().map((writeFile)=> {return [file, writeFile]} )
        })
    }
    beforeEach(function(){       // before test create two levels of directories with random files in them
        fileList = []
        FirstLevel  = createFileList().map( (fname) => {
            fileList.push(["deleteAllLike", fname]);
            exercise.mkFileIn("asdf","deleteAllLike", fname)
        })
        secondLevel = createDirList().map( (fname) =>  {
            fname.map((fname2) => {
                fileList.push(["deleteAllLike", ...fname2]);
                exercise.mkFileIn("asdf", "deleteAllLike", ...fname2)
            })
        })
    })

    it( "show all files in directory", function(){
        foundFileNames = exercise.allFilesInPath("deleteAllLike").sort()

        // console.log(foundFileNames)
        const glob = require("glob")
        allFileNames = [].concat.apply([], glob.sync("deleteAllLike/*/*.*").concat(glob.sync("deleteAllLike/*.*"))).map((pathName) => path.basename(pathName)).sort()
        expect(foundFileNames).toEqual(allFileNames)
    })
})