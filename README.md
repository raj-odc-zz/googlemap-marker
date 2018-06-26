#### Setup
```yarn```

#### Start
```yarn start```

## MAP APP
Builded a Map Page where user can able to add, edit & delete markers on the google maps by giving the address

### Assumption
Showing the first set of short name and long name from the address attributes in geolocation API

Geolocation api used to location only based on address typed in the text box.

Always rails server runs in port 3001 so given api url as localhost:3001

### Implementation
Map component builded as seperate module so it is easy to modify in-future

Used separate files for api's and config's for easy maintainence.

Splited across the component like Map, Marker & MarkerForm.

Used BEM for classname's

Lazyloaded the google map script so that browser will not wait for the page to start painting

### Problem/Suggestions
Revert me if you face any problems, or any suggestions in the development.



