#!/bin/bash

for f in `find . -name "*.png"`
do
    name="${f##*/}"
    name="${name%.*}"
    name="../../public/images/${name}"
    echo $name
    convert $f -resize 200 -quality 90 $name-thumbnail.jpg
    #convert $f -resize 800 -quality 70 $name-xs.jpg
    #convert $f -resize 900 -quality 70 $name-sm.jpg
    #convert $f -resize 1200 -quality 70 $name-md.jpg
    #convert $f -resize 2000 -quality 70 $name-lg.jpg
done
