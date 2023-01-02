<#
    Docs: https://aws.amazon.com/blogs/media/processing-user-generated-content-using-aws-lambda-and-ffmpeg/
    Download and Extract ffmpeg
    Have to use wsl for the tar command for some reason. There is a pipe0 error.
#>

function CheckMD5(){
    param (
        $archive
    )
    $md5_url = $base_url + $archive + '.md5'
    wget $md5_url -O $archive
    $md5 = wsl md5sum -c $archive
    Write-Host $md5
}

function Download(){
    param (
        $archive
    )

    $archive_url = $base_url + $archive

    if (!(Test-Path -path $archive)){
        wget $archive_url -O $archive
    } else {
        Write-Host "Already downloaded"
    }
}

function Extract(){
    param (
        $archive,
        $directory
    )
    wsl tar xf $archive -C $directory
}

function CreateDirectory(){
    param (
        $directory
    )
    if (!(Test-Path -Path $directory)){
        New-Item -Path $directory -ItemType directory
    }
}

function DeleteDirectory(){
    param (
        $directory
    )
    Remove-Item -Recurse $directory -Force
}

function Copy(){
    param (
        $file,
        $destination
    )

    Copy-Item 'ffmpeg-bin/ffmpeg*/$file' '$destination/.'
}

$base_url = 'https://johnvansickle.com/ffmpeg/builds/'
$source = 'ffmpeg-bin'
$destination = 'ffmpeg'
$archive = 'ffmpeg-git-amd64-static.tar.xz'

if (!(Test-Path 'ffmpeg/ffmpeg') -or !(Test-Path 'ffmpeg/ffprobe')) {
    CreateDirectory -directory $source
    CreateDirectory -directory $destination
    Download -archive $archive
    Extract -archive $archive -directory $source
    Copy-Item 'ffmpeg-bin/ffmpeg*/ffmpeg' $destination
    Copy-Item 'ffmpeg-bin/ffmpeg*/ffprobe' $destination
    DeleteDirectory -directory $source
} else {
    Write-Host 'Already saved.'
}