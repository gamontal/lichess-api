# lichess-api [![Build Status](https://travis-ci.org/gmontalvoriv/lichess-api.svg?branch=master)](https://travis-ci.org/gmontalvoriv/lichess-api) [![npm version](https://badge.fury.io/js/lichess-api.svg)](https://badge.fury.io/js/lichess-api)
> :trophy: A NodeJS wrapper for the [Lichess API](https://en.lichess.org/developers)

## Installation

Using [npm](https://www.npmjs.com/):

```
$ npm install --save lichess-api
```

If you don't have or don't want to use npm:

```
$ cd ~/.node_modules
$ git clone git://github.com/gmontalvoriv/lichess-api.git
```

## Test

```
$ make test
```

## Usage Examples

#### Fetch one user

```javascript
const lichess = require('lichess-api');

lichess.user('thibault', function (err, user) {
  console.log(user);
}
```

#### Fetch many users

```javascript
lichess.user({ team: 'coders' }, function (err, users) {
  console.log(users);
}
```

#### Fetch user games

```javascript
lichess.user.games('thibault', { with_analysis: 1 }, function (err, games) {
  console.log(games);
}
```

#### Fetch one game by ID

```javascript
lichess.game('hXI0wVeZ', function (err, game) {
  console.log(game);
}
```

#### Fetch one game PGN by ID

```javascript
lichess.game.export('hXI0wVeZ', function (err, pgn) {
  console.log(pgn.pgn_url);
}
```

## Methods

### `user`

Fetch one or multiple users.

`.user(options, callback)`

***Parameters:***

Name | Description | Type | Required |
-----|------------ |------|:----------:|
team| filter users by team | `String` | No |
nb| maximum number of users to return | `Integer` | No |

### `user.games`

Fetch user games.

`.user.games(username, options, callback)`

***Parameters:***

Name | Description | Type | Required |
-----|------------ |------|:----------:|
nb| maximum number of games to return per page | `Integer` | No |
page| for pagination | `Integer` | No |
with_analysis| include deep analysis data in the result | `Integer` | No |
with_moves| include a list of PGN moves | `Integer` | No |
with_opening| include opening information | `Integer` | No |
with_movetimes| include move time information | `Integer` | No |
rated| filter rated or casual games | `Integer` | No |

### `game`

Fetch one game by ID.

`.game(game_id, options, callback)`

***Parameters:***

Name | Description | Type | Required |
-----|------------ |------|:----------:|
with_analysis| include deep analysis data in the result | `Integer` | No |
with_moves| include a list of PGN moves | `Integer` | No |
with_opening| include opening information | `Integer` | No |
with_movetimes| include move time information | `Integer` | No |
with_fens | include a list of FEN states | `Integer` | No |

### `game.export`

Fetch one game PGN by ID.

`.game.export(game_id, callback)`

## License

[MIT](https://github.com/gmontalvoriv/lichess-api/blob/master/LICENSE) © Gabriel Montalvo
