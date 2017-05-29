'use strict';

describe('LoggedUserService', function () {
    var LoggedUserService;

    beforeEach(module('svdesignti.loggedUser'));

    beforeEach(inject(function (_LoggedUserService_) {
        LoggedUserService = _LoggedUserService_;
    }));

    describe('getUser()', function () {

        it('should return the user in current session', function () {
            var user = {
                username: 'foo',
                displayName: 'bar'
            };
            LoggedUserService._data.user = user;
            expect(LoggedUserService.getUser()).toEqual(user);
        });

    });

    describe('setUser()', function () {

        it('should set the user', function () {
            var user = {
                username: 'foo',
                displayName: 'bar'
            };
            expect(LoggedUserService._data.user).toEqual({});
            LoggedUserService.setUser(user);
            expect(LoggedUserService._data.user).toEqual(user);
        });

    });

});
