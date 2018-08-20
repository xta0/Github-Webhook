#!/bin/bash

build(){
    site_directory="/Users/moxin/site"
    root_directory="/Users/moxin"
    repo_name="xta0.me"
    repo_git="https://github.com/xta0/xta0.me.git"

    cd "$root_directory"
    echo "Direcotor: $(pwd)"

    if [ ! -d "$repo_name" ]; then
        echo "No repo: $repo_name found in $site_director"
        echo "Begin cloning..."
        git clone $repo_git || echo "clone failed!"
    fi 
    echo "Found $repo_name in $root_directory"
    cd $repo_name
    echo "Pulling new commits..."
    git pull origin master
    echo "Running jekyll build, this may take a while...."
    jekyll build || "jekyll build failed!"
    if [ "$?" -eq "0" ]; then
        echo "Build Succeed"
    else
        echo "Build Failed!"
        return 1
    fi
    if [ -d $site_directory ]; then
        echo "Found old site folder, delete it."
        rm -rf $site_directory
    fi
    echo "Copying new folder to site."
    cp -R _site "$site_directory"
    echo "Done"
}

build