#!/bin/bash

COMP_ROOT_DIR="src/components"

echo "Working on component $1"

COMP_DIR="$COMP_ROOT_DIR/$1"
if [[ -d "$COMP_DIR" ]]
then
    echo "Directory for $COMP_DIR already exists"    
else
    echo "Making directory $COMP_DIR"
    mkdir $COMP_DIR
fi

COMP_JS="$COMP_DIR/$1.js"
if [[ -f "$COMP_JS" ]]
then
    echo "$1 JS file already exists"
else
    echo "Creating JS file for $1"
    sed ./comp_templates/template.js -e "s/##comp_name##/$1/g" > $COMP_JS
fi

COMP_CSS="$COMP_DIR/$1.css"
if [[ -f "$COMP_CSS" ]]
then
    echo "$1 CSS file already exists"
else
    echo "Creating CSS file for $1"
    touch $COMP_CSS
fi