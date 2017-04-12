# How to run angular-quickstart?
1. before open index.html, please ensure you have installed node and bower.
2. run the following commands to install dependencies.
    
    ```
$ npm install
$ bower install
    ```
3. run

    ```
DEBUG=angular-quickstart npm start
	```
4. open browser and visit `http://localhost:3000`


# How to run in Docker container
1. install local docker environment
2. cd angular-quickstart
3. execute the following commands

    ```
$ npm install
$ npm build
$ docker build -t "angular-quickstart" .
$ docker run -d --name angular-quickstart -p 3000:3000 angular-quickstart:latest
    ```

4. open browser and visit `http://localhost:3000`
