FROM python:3

ARG BORG_UNKNOWN_UNENCRYPTED_REPO_ACCESS_IS_OK
ENV BORG_UNKNOWN_UNENCRYPTED_REPO_ACCESS_IS_OK=${BORG_UNKNOWN_UNENCRYPTED_REPO_ACCESS_IS_OK}
ARG BORG_FOLDER
ENV BORG_FOLDER=${BORG_FOLDER}
ARG BACKUP_FOLDER
ENV BACKUP_FOLDER=${BACKUP_FOLDER}

RUN apt-get update
RUN apt-get upgrade -yf
RUN apt install borgbackup -yf
RUN apt install rclone -yf

COPY entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]