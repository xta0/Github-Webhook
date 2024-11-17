#!/bin/bash

build(){
    cd ..
    site_dir=`pwd`
    repo_name="xta0.me"
    repo_git="https://github.com/xta0/xta0.me.git"
    
    echo "Directory: $site_dir"
    if [ ! -d "$repo_name" ]; then
        echo "No repo: $repo_name found in $site_dir"
        echo "Begin cloning..."
        git clone $repo_git || echo "clone failed!"
    fi 
    echo "Found $repo_name in $site_dir"
    cd $repo_name
    echo "Pulling new commits..."
    git pull origin master
    echo "Ruby Version: $(ruby --version)"
    echo "Jekyll Version: $(jekyll --version)"
    echo "Running jekyll build, this may take a while...."
    jekyll build || "jekyll build failed!"
    if [ "$?" -eq "0" ]; then
        echo "Build Succeed"
    else
        echo "Build Failed!"
        return 1
    fi
    app_dir="$site_dir/site"
    if [ -d $app_dir ]; then
        echo "Found old app folder, delete it."
        rm -rf $app_dir
    else
        mkdir $app_dir
    fi
    echo "Copying new app to site."
    cp -R _site $app_dir
    apple_file_dir="$site_dir/apple-app-site-association"
    if [ -s $apple_file_dir ]; then
        echo "Copying apple-app-site-association"
        cp $apple_file_dir $app_dir
    else
        echo "apple-app-site-association not found"
    fi
    echo "Done"
}

build