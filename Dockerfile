FROM node:16

# Set the home directory to /root
ENV HOME /root

# cd into the home directory
WORKDIR /root

# Copy all app files into the image
#COPY package.json .

# Download dependancies

COPY . .

WORKDIR /root/frontend

RUN npm install
# Allow port 8000 to be accessed
# from outside the container
EXPOSE 3000


# Run the app
CMD npm run start
#CMD ["npm","start"]
#CMD ["node", "App.js"]
