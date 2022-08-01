FROM node:lts-buster as builder

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# copy project files and folders to the current working directory (i.e. 'app' folder)# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# install project dependencies
RUN npm install

# build app for production with minification
RUN npm run build


# use Apache Web Server
FROM httpd:2.4

COPY httpd.conf /usr/local/apache2/conf/httpd.conf

COPY --from=builder /app/build /usr/local/apache2/htdocs/
