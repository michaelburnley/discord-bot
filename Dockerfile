FROM sleeplesssoftware/dream-framework:1

# Create app directory
WORKDIR /usr/src/app

# Create a temp folder that we'll use for installing npm modules
RUN mkdir ./temp

# Install app dependencies
COPY package*.json ./temp/
RUN cd temp && npm install --only=production

# Move the node modules out of temp and merge them with the framework, then delete temp
# The crazy "2>/dev/null || :" part supressed the error if node_modules doesn't exist
RUN mv -f temp/node_modules/* node_modules/ 2>/dev/null || : && rm -rf temp

# Bundle app source
COPY ./src ./src
COPY .env* ./
CMD [ "npm", "start" ]
