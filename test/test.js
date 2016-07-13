'use strict';

const mocha = require('mocha');
const should = require('should');

const nock = require('nock');
const lichessApi = require('../');
const apiServer = 'https://en.lichess.org/api';

// templates
const user = require('./templates/user.json');
const users = require('./templates/users.json');
const userGames = require('./templates/user_games.json');
const game = require('./templates/game.json');
const pgnExport = require('./templates/export.json');

nock(apiServer)
  .get('/user/thibault')
  .reply(200, user);

nock(apiServer)
  .get('/user')
  .query({
    team: 'coders',
    nb: 10
  })
  .reply(200, users);

nock(apiServer)
  .get('/user/thibault/games')
  .query({
    nb: 100,
    page: 1,
    with_analysis: 0,
    with_moves: 0,
    with_opening: 0,
    with_movetimes: 0,
    rated: 0
  })
  .reply(200, userGames);

nock(apiServer)
  .get('/game/hXI0wVeZ')
  .query({
    with_analysis: 0,
    with_moves: 0,
    with_opening: 0,
    with_movetimes: 0,
    with_fens: 0
  })
  .reply(200, game);

nock(apiServer)
  .get('/game/export/hXI0wVeZ.pgn')
  .reply(200, pgnExport);


let server_test = function () {
  describe('Testing lichess-api', function () {
    it('GET /user/<username>', function (done) {
      lichessApi.user('thibault', function (err, res) {
        try {
          should(JSON.parse(res)).have.property('id', 'thibault');
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it('GET /user', function (done) {
      lichessApi.user({ team: 'coders' }, function (err, res) {
        try {
          should(JSON.parse(res).list[0]).have.property('id', 'calinou');
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it('GET /user/<username>/games', function (done) {
      lichessApi.user.games('thibault', function (err, res) {
        try {
          should(JSON.parse(res).currentPageResults[0]).have.property('id', 'hXI0wVeZ');
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it('GET /game/<id>', function (done) {
      lichessApi.game('hXI0wVeZ', function (err, res) {
        try {
          should(JSON.parse(res)).have.property('id', 'hXI0wVeZ');
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    it('GET /game/export/<id>.pgn', function (done) {
      lichessApi.game.export('hXI0wVeZ', function (err, res) {
        try {
          should(JSON.parse(res)).have.property('pgn_url', 'https://en.lichess.org/api/game/export/hXI0wVeZ.pgn');
          done();
        } catch (e) {
          done(e);
        }
      });
    });

  });
}();


