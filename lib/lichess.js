/*
The MIT License (MIT)

Copyright (c) 2016 Gabriel Montalvo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

'use strict';

(function () {
  const request = require('request');

  let errors = ['invalid argument type',
                'username is required',
                'game ID is required'];

  const Lichess = (function() {
    function Lichess () {}

    Lichess.apiServer = 'https://en.lichess.org/api';

    Lichess.user = function (options, cb) {
      if (typeof options === 'function') {
        cb = options;
      }

      let params = {
        team: options.team || '',
        nb: options.nb || 10
      };

      request.get(
        Lichess.apiServer + '/user' +
          (typeof options === 'string' ? '/' + options :
           '?team=' + params.team + '&nb=' +  params.nb), function (err, res) {
             if (err) { return cb(err); }
             return cb(null, res.body);
           }
      );
    };

    Lichess.user.games = function (username, options, cb) {
      if (!username) {
        throw new Error(errors[1]);
      } else if (typeof options === 'function') {
        cb = options;
      }

      let params = {
        nb: options.nb || 100,
        page: options.page || 1,
        with_analysis: options.with_analysis || 0,
        with_moves: options.with_moves || 0,
        with_opening: options.with_opening || 0,
        with_movetimes: options.with_movetimes || 0,
        rated: options.rated || 0
      };

      let queryString =
          'nb=' + params.nb +
          '&page=' + params.page +
          '&with_analysis=' + params.with_analysis +
          '&with_moves=' + params.with_moves +
          '&with_opening=' + params.with_opening +
          '&with_movetimes=' + params.with_movetimes +
          '&rated=' + params.rated;

      request.get(
        Lichess.apiServer + '/user/' + username + '/games?' + queryString, function (err, res) {
          if (err) { return cb(err); }
          return cb(null, res.body);
        }
      );
    };

    Lichess.game = function (gameId, options, cb) {
      if (!gameId) {
        throw new Error(errors[2]);
      } else if (typeof gameId !== 'string') {
        throw new Error(errors[0]);
      } else if (typeof options === 'function') {
        cb = options;
      }

      let params = {
        with_analysis: options.with_analysis || 0,
        with_moves: options.with_moves || 0,
        with_movetimes: options.with_movetimes || 0,
        with_opening: options.with_opening || 0,
        with_fens: options.with_fens || 0
      };

      let queryString =
          'with_analysis=' + params.with_analysis +
          '&with_moves=' + params.with_moves +
          '&with_opening=' + params.with_opening +
          '&with_movetimes=' + params.with_movetimes +
          '&with_fens=' + params.with_fens;

      request.get(
        Lichess.apiServer + '/game/' + gameId + '?' + queryString, function (err, res) {
          if (err) { return cb(err); }
          return cb(null, res.body);
        }
      );
    };

    Lichess.game.export = function (gameId, cb) {
      if (!gameId) {
        throw new Error(errors[2]);
      } else if (typeof gameId !== 'string') {
        throw new Error(errors[0]);
      }

      return cb(null, JSON.stringify({ id: gameId, pgn_url: Lichess.apiServer + '/game/export/' + gameId + '.pgn' }));
    };

    return Lichess;
  })();

  module.exports = Lichess;

}).call(this);
