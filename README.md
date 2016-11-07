#FileSystem

1. Write a syncronouse function called mkFileIn("data" , ...listOfFolders) that creates a file with the given 
data. The file name should be the last element in listOfFolders. The element in listOfFOlders should describe 
a path relative to the location of the file containing such functionality 
- Do not make it recursive

2. Write a syncronous function called allFilesInPath(path) that takes a path and returns the names (not the path) 
all the files (not Directories) in each of its sub directories - Do not make it recursive. The path given can 
both be absolute and relative


3. Write a syncronouse function called deleteAllFiles(directory) that deletes (not directories) all files in a 
given directory. If a directory is present it should try to delete all the files in the subdirectory as well 
- Do not make it recursive.

4. Write a syncronouse function called deleteAllFileslike(directory, fileType) that deletes all files 
(not directories) that end with the given filetype in the given directory. If a directories are present it 
should try to delete all the files in the subdirectories as well 
- Do not make it recursive


##NOTES

1. All functionalities here should be syncronous!
2. Test for exercise 2,3 & 4 depend on solution 1; so work on that one first :)