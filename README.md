# Angular Logged User

[![Build Status](https://travis-ci.org/amandiobm/angular-logged-user.svg?branch=master)](https://travis-ci.org/amandiobm/angular-logged-user)
[![Coverage Status](https://coveralls.io/repos/github/amandiobm/angular-logged-user/badge.svg?branch=master)](https://coveralls.io/github/amandiobm/angular-logged-user?branch=master)

---

## About

Angular Logged User is a service that allows you to get your logged user information

Common uses include:

* Manipulate templates

---

## Basic Example

### Set Data

Setup the `LoggedUserService` in your app module's `run()` block.

```js
app.run(['LoggedUserService', function (LoggedUserService) {
  
  // Set the ACL data. Normally, you'd fetch this from an API or something.
  // The data should have the roles as the property names,
  // with arrays listing their permissions as their value.
  var data = {
    username: 'Foo',
    displayName: 'Bar'
  }
  LoggedUserService.setUser(data);

}]);
```

### Manipulate a Template

The edit link in the template below will not show, because the current user is a `member`, and `manage_content` is not one of a member role's abilities.

###### Controller

```js
app.controller('DemoCtrl', ['$scope', 'LoggedUserService', function ($scope, LoggedUserService) {
  $scope.loggedUser = LoggedUserService.get();
}]);
```

###### Template

```html
<h1>{{ loggedUser.username }}</h1>
```

---

## Install

Install with `bower`:

```shell
bower install angular-logged-user
```

Add a `<script>` to your `index.html`:

```html
<script src="/bower_components/angular-logged-user/angular-logged-user.js"></script>
```

And add `mm.acl` as a dependency for your app:

```javascript
angular.module('myApp', ['svdesignti.loggedUser']);
```

---

## Documentation

### Config

You can modify the configuration by extending the config object during the Angular configuration phase using the `config()` method on the `LoggedUserServiceProvider`.

```js
app.config(['LoggedUserServiceProvider', function (LoggedUserServiceProvider) {
  var myConfig = {
    storage: 'localStorage',
    storageKey: 'AppLoggedUser'
  };
  LoggedUserServiceProvider.config(myConfig);
}]);
```

#### Config Options

| Property | Default | Description |
| -------- | ------- | ----------- |
| `storage` | `"sessionStorage"` | `"sessionStorage"`, `"localStorage"`, `false`. Where you want to persist your ACL data. If you would prefer not to use web storage, then you can pass a value of `false`, and data will be reset on next page refresh _(next time the Angular app has to bootstrap)_ |
| `storageKey` | `"LoggedUserService"` | The key that will be used when storing data in web storage |

### Public Methods

#### `LoggedUserService.resume()`

Restore data from web storage.

###### Returns

**boolean** - true if web storage existed, false if it didn't

###### Example Usage

```js
app.run(['LoggedUserService', function (LoggedUserService) {
  // Attempt to load from web storage
  if (!LoggedUserService.resume()) {
    // Web storage record did not exist, we'll have to build it from scratch
    
    // Get the user role, and add it to LoggedUserService
    var user = fetchUserFromSomewhere();
    LoggedUserService.setUser(user);
    
  }
}]);
```

You can also run `resume()` in the `config` phase, if you need the app to load the user data from web storage earlier in the app bootstrap process (e.g. before `$routeProvider` resolves the first route).

```js
app.config(['LoggedUserServiceProvider', function (LoggedUserServiceProvider) {
  LoggedUserServiceProvider.resume();
}]);
```

#### `LoggedUserService.flushStorage()`

Remove all data from web storage.

#### `LoggedUserService.setUser(user)`

Set the user (overwriting previous user).

###### Parameters

| Param | Type | Details |
| ----- | ---- | ------- |
| `user` | object | User. |

###### Example

```js
var user = {
  username: 'Foo',
  displayName: 'Bar'
};
LoggedUserService.setUser(user);
```

#### `LoggedUserService.get()`

Return current user

###### Returns

**object**

###### Example

```js

var user = {
    username: 'Foo',
    displayName: 'Bar'
};

// Add current user
LoggedUserService.setUser(user);

//Return current user
LoggedUserService.get(); // returns user object
```

## License

The MIT License

Angular Logged User
Copyright (c) 2016 Mike McLin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
