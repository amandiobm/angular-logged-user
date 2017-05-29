'use strict';

describe('LoggedUserService', function () {
  var LoggedUserService;

  beforeEach(module('svdesignti.loggedUser'));

  beforeEach(inject(function (_LoggedUserService_) {
    LoggedUserService = _LoggedUserService_;
  }));

  describe('roleHasAbilities()', function () {

    it('should return true data object has role as a property with an array value', function () {
      expect(LoggedUserService._roleHasAbilities('foo')).toBeFalsy();
      LoggedUserService._data.abilities.foo = [];
      expect(LoggedUserService._roleHasAbilities('foo')).toBeTruthy();
    });

  });

  describe('getRoleAbilities()', function () {

    it('should return the role abilities array', function () {
      LoggedUserService._data.abilities.foo = ['bar', 'baz'];
      var abilities = LoggedUserService._getRoleAbilities('foo');
      expect(abilities).toEqual(['bar', 'baz']);
    });

    it('should return empty array when role does not exist', function () {
      var abilities = LoggedUserService._getRoleAbilities('foo');
      expect(abilities).toEqual([]);
    });

  });

  describe('attachRole()', function () {

    it('should add role to current session', function () {
      expect(LoggedUserService._data.roles).toEqual([]);
      LoggedUserService.attachRole('foo');
      expect(LoggedUserService._data.roles).toEqual(['foo']);
    });

    it('should add role only once', function () {
      expect(LoggedUserService._data.roles).toEqual([]);
      LoggedUserService.attachRole('foo');
      LoggedUserService.attachRole('foo');
      LoggedUserService.attachRole('foo');
      expect(LoggedUserService._data.roles).toEqual(['foo']);
    });

  });

  describe('detachRole()', function () {

    it('should remove role to current session', function () {
      LoggedUserService._data.roles = ['foo'];
      LoggedUserService.detachRole('foo');
      expect(LoggedUserService._data.roles).toEqual([]);
    });

    it('should not throw an error if role does not exist', function () {
      expect(LoggedUserService._data.roles).toEqual([]);
      LoggedUserService.detachRole('foo');
      expect(LoggedUserService._data.roles).toEqual([]);
    });

  });

  describe('flushRole()', function () {

    it('should reset roles to an empty array', function () {
      LoggedUserService._data.roles = ['foo', 'bar', 'baz'];
      expect(LoggedUserService._data.roles).toEqual(['foo', 'bar', 'baz']);
      LoggedUserService.flushRoles();
      expect(LoggedUserService._data.roles).toEqual([]);
    });

  });

  describe('hasRole()', function () {

    it('should return true if role is in current session', function () {
      LoggedUserService._data.roles = ['foo'];
      expect(LoggedUserService.hasRole('foo')).toBeTruthy();
    });

    it('should return true if all roles are in current session', function () {
      LoggedUserService._data.roles = ['foo', 'bar'];
      expect(LoggedUserService.hasRole(['foo', 'bar'])).toBeTruthy();
    });

    it('should return false if role is not in current session', function () {
      LoggedUserService._data.roles = [];
      expect(LoggedUserService.hasRole('foo')).toBeFalsy();
    });

    it('should return false if all roles are not in current session', function () {
      LoggedUserService._data.roles = ['foo', 'bar'];
      expect(LoggedUserService.hasRole(['foo', 'bar', 'baz'])).toBeFalsy();
    });

  });

  describe('hasAnyRole()', function () {

    it('should return true if role is in current session', function () {
      LoggedUserService._data.roles = ['foo'];
      expect(LoggedUserService.hasAnyRole(['foo'])).toBeTruthy();
    });

    it('should return true if only some roles are in current session', function () {
      LoggedUserService._data.roles = ['foo'];
      expect(LoggedUserService.hasAnyRole(['foo', 'bar'])).toBeTruthy();
    });

    it('should return false if role is not in current session', function () {
      LoggedUserService._data.roles = [];
      expect(LoggedUserService.hasAnyRole(['foo'])).toBeFalsy();
    });

  });

  describe('getRoles()', function () {

    it('should return all the roles in current session', function () {
      LoggedUserService._data.roles = ['foo', 'bar'];
      expect(LoggedUserService.getRoles()).toEqual(['foo', 'bar']);
    });

  });

  describe('setAbilities()', function () {

    it('should set given param to abilities', function () {
      expect(LoggedUserService._data.abilities).not.toEqual('foo');
      LoggedUserService.setAbilities('foo');
      expect(LoggedUserService._data.abilities).toEqual('foo');
    });

  });

});
