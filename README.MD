# Tests

Preview link: [https://carter-hesterman.herokuapp.com/](https://carter-hesterman.herokuapp.com/)

The root url takes you to the front end test. 

To demo the backend requirements go to :
- [https://carter-hesterman.herokuapp.com/characters?sort=height](https://carter-hesterman.herokuapp.com/characters?sort=height)

- [https://carter-hesterman.herokuapp.com/character/luke](https://carter-hesterman.herokuapp.com/character/luke)

- [https://carter-hesterman.herokuapp.com/planetresidents](https://carter-hesterman.herokuapp.com/planetresidents)

## Backend
### Running

Run the following:

`npm install`

`gulp serve`

 ### Notes
 
 With the test leveraging the swapi api, I thought it may make sense to use one of the pre-built npm libraries, but intentionally decided against it so I could demonstrate an ability to make raw api calls.

 With some of the sorting keys, there were unknown values. I intentionally placed these values at the front of the list but could easily move them wherever requested.

## Frontend
###Running
Run the following:

`npm install`

`npm start`

### Notes

I set the code up to work being run under the backend project. The express app serves this up by default, and I just copied over the endpoints provided. As a result, this will not run on its own (or at least will not go to the proper url for the api calls). To view it, simply navigate to the root url of the running backend project.
 
