FROM node:slim

ARG CI_COMMIT_BRANCH
ENV COMMIT_BRANCH $CI_COMMIT_BRANCH

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /my-directory/$COMMIT_BRANCH

COPY package*.json .
COPY gulpfile.js .


ENTRYPOINT ["sh", "/entrypoint.sh"]
