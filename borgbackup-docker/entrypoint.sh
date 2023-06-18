#!/bin/bash
borg init $BORG_FOLDER -e none
borg create $BORG_FOLDER::'{now}' $BACKUP_FOLDER --list --stats