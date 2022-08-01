# Golf Fields UI

The source code is the implamentation of a pod of the [microservice application](https://github.com/tkarpenko/MicroserviceWithKubernetes).

![cd](https://github.com/tkarpenko/golf-fields-ui/blob/main/docs/pod.jpg)

Technology stack:

* React + Redux
* Plain JavaScript
* Jest for unit testing
* Azure DevOps Services for CI/CD
* Docker for containerization


## Azure DevOps CI

CI pipeline:

1. validates build
2. runs unit tests
3. publish artifacts and test coverage

![ci](https://github.com/tkarpenko/golf-fields-ui/blob/main/docs/ado-1.jpg)

![ci](https://github.com/tkarpenko/golf-fields-ui/blob/main/docs/ado-2.jpg)


## Azure DevOps CD

CD pipeline:

1. creates a docker image
2. pushes it to Docker Hub

![cd](https://github.com/tkarpenko/golf-fields-ui/blob/main/docs/ado-3.jpg)


## Run it locally

Follow please steps of a [microservice installation](https://github.com/tkarpenko/MicroserviceWithKubernetes/blob/main/README.md)