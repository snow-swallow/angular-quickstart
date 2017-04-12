FROM node:6.9.5

# Latest
RUN apt-get update -qq

# Install software
RUN apt-get install -y \
  build-essential \
  git \
  curl \
  vim

# Install Bower, Forever
RUN npm install -g \
  bower \
  forever

# Define home directory
ENV HOME=/home/node

# Create Application Directory
RUN rm -rf $HOME/angular-quickstart
RUN mkdir -p $HOME/angular-quickstart
RUN chown -R node:node $HOME/angular-quickstart

#RUN groupadd -r node \
#   && useradd -m -r -g node node

USER node

WORKDIR $HOME/angular-quickstart
ADD . $HOME/angular-quickstart

#USER node
#RUN npm install
#RUN bower install

EXPOSE 3000

CMD ["node", "bin/www"]