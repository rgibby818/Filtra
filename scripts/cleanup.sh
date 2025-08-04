#!/bin/bash

# Use this script to quickly delete all images in uploads/ and uploads-filtered/

if [ -n "$(ls ./uploads/* 2>/dev/null)" ]; then
    echo "Deleting images in uploads/"
    rm uploads/*
fi
if [ -n "$(ls ./uploads-filtered/* 2>/dev/null)" ]; then
    echo "Deleting images from uploads-filtered/"
    rm uploads-filtered/*
fi

exit 0;
