# lol-riot-api
A wrapper module for [League of Legends' official API](https://developer.riotgames.com/). In the documentation below there will be references to the official methods used for each method.

All methods can be either used with a `callback` method or as a `promise`

## Download
lol-riot-api is installable via:

- [GitHub](https://github.com/Pupix/lol-riot-api-module) `git clone https://github.com/Pupix/lol-riot-api-module.git`
- [npm](https://www.npmjs.com/): `npm install lol-riot-api-module`


## Quick example
```js
var API = require('lol-riot-api-module'),
    api = new API({
        key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        region: 'euw'
    });
    
```

### Using callbacks
```js
    var opt = {};
    opt.names = 'Pupix';

    api.getSummonersByNames(opt, function (err, data) {
        console.log(data);
    });
    //=>{
            "pupix": {
                "id": 20920441,
                "name": "Pupix",
                "profileIconId": 580,
                "summonerLevel": 30,
                "revisionDate": 1431200284000
            }
        }
```

### Using promises
```js
    var opt = {};
    opt.names = ['Pupix', 'Epidal'];

    api.getSummonersByNames(opt).then(function (data) {
        console.log(data);
    });
    //=>{
            "pupix": {
                "id": 20920441,
                "name": 'Pupix',
                "profileIconId": 580,
                "summonerLevel": 30,
                "revisionDate": 1431200284000
            },
            "epidal": {
                "id": 21027916,
                "name": 'Epidal',
                "profileIconId": 558,
                "summonerLevel": 30,
                "revisionDate": 1430273630000
            }
        }
```

## Getting started

The API constructor accepts an *object* with the default `key` and `region` to be used for the API calls. You can get a key from [Riot Games' developer portal](https://developer.riotgames.com).

If no region is passed, the API will default to **na** (North America).

The possible *regions* are the following:

- **br** (Brazil)
- **eune** (Europe North-East)
- **euw** (Europe West)
- **kr** (Korean)
- **lan** (Latin America North)
- **las** (Latin America South)
- **na** (North America)
- **oce** (Oceania)
- **tr** (Turkish)
- **ru** (Russia)
- **pbe** (Public Beta Environment)

## Documentation

All methods except **getStatus** and **getStatusByRegion** allow you to set `apiKey` and `region` to change the request's *region* or *key* on the fly without having to instantiate different APIs for different regions or API keys.

Whenever possible, if a configuration *object* (referred as `opt` in the documentation) is not required the `callback` can be passed directly as first parameter to all methods.

### Methods

**Champion**
* [getChampions](#getChampions)
* [getChampionById](#getChampionById)

**Current game**
* [getCurrentGameBySummonerId](#getCurrentGameBySummonerId)

**Featured games**
* [getFeaturedGames](#getFeaturedGames)

**Game**
* [getRecentGamesBySummonerId](#getRecentGamesBySummonerId)

**League**
* [getLeagueBySummonerIds](#getLeagueBySummonerIds)
* [getLeagueEntryBySummonerIds](#getLeagueEntryBySummonerIds)
* [getLeagueByTeamIds](#getLeagueByTeamIds)
* [getLeagueEntryByTeamIds](#getLeagueEntryByTeamIds)
* [getChallengerLeague](#getChallengerLeague)
* [getMasterLeague](#getMasterLeague)

**Static data**
* [getChampionData](#getChampionData)
* [getChampionDataById](#getChampionDataById)
* [getItemData](#getItemData)
* [getItemDataById](#getItemDataById)
* [getLanguageStrings](#getLanguageStrings)
* [getLanguages](#getLanguages)
* [getMaps](#getMaps)
* [getMasteryData](#getMasteryData)
* [getMasteryDataById](#getMasteryDataById)
* [getRealms](#getRealms)
* [getRuneData](#getRuneData)
* [getRuneDataById](#getRuneDataById)
* [getSummonerSpellData](#getSummonerSpellData)
* [getSummonerSpellDataById](#getSummonerSpellDataById)
* [getVersions](#getVersions)

**Status**
* [getStatus](#getStatus)
* [getStatusByRegion](#getStatusByRegion)

**Match**
* [getMatchById](#getMatchById)

**Match history**
* [getMatchHistoryBySummonerId](#getMatchHistoryBySummonerId)

**Stats**
* [getRankedStatsBySummonerId](#getRankedStatsBySummonerId)
* [getStatsSummaryBySummonerId](#getStatsSummaryBySummonerId)

**Summoner**
* [getSummonersByNames](#getSummonersByNames)
* [getSummonersByIds](#getSummonersByIds)
* [getMasteriesBySummonerIds](#getMasteriesBySummonerIds)
* [getSummonerNamesByIds](#getSummonerNamesByIds)
* [getRunesBySummonerId](#getRunesBySummonerId)

**Team**
* [getTeamsBySummonerIds](#getTeamsBySummonerIds)
* [getTeamsByIds](#getTeamsByIds)

---------------------------------------

<a name="getChampions" />
### getChampions(opt, callback)

Retrieve all champions.

**Parameters**

1. **[opt] {Object}**
    * **[opt.freeToPlay] {boolean}** Optional filter param to retrieve only free to play champions.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getChampionById" />
### getChampionById(opt, callback)

Retrieve champion by ID.

**Parameters**

1. **opt {Object}**
    * **opt.id {string | number}** ID of the champion to retrieve.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getCurrentGameBySummonerId" />
### getCurrentGameBySummonerId(opt, callback)

Get current game information for the given summoner ID.

**Parameters**

1. **opt {Object}**
    * **opt.id {string | number}** The ID of the summoner.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getFeaturedGames" />
### getFeaturedGames(opt, callback)

Get list of featured games.

**Parameters**

1. **[opt] {Object}**
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getRecentGamesBySummonerId" />
### getRecentGamesBySummonerId(opt, callback)

Get list of featured games.

**Parameters**

1. **opt {Object}**
    * **opt.id {string | number}** ID of the summoner for which to retrieve recent games.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getLeagueBySummonerIds" />
### getLeagueBySummonerIds(opt, callback)

Get leagues mapped by summoner ID for a given list of summoner IDs.

**Parameters**

1. **opt {Object}**
    * **opt.ids {number | string | Array}** Comma-separated list of summoner IDs. Maximum allowed at once is 10.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getLeagueEntryBySummonerIds" />
### getLeagueEntryBySummonerIds(opt, callback)

Get league entries mapped by summoner ID for a given list of summoner IDs.

**Parameters**

1. **opt {Object}**
    * **opt.ids {number | string | Array}** Comma-separated list of summoner IDs. Maximum allowed at once is 10.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getLeagueByTeamIds" />
### getLeagueByTeamIds(opt, callback)

Get league entries mapped by team ID for a given list of team IDs.

**Parameters**

1. **opt {Object}**
    * **opt.ids {number | string | Array}** Comma-separated list of team IDs. Maximum allowed at once is 10.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getLeagueEntryByTeamIds" />
### getLeagueEntryByTeamIds(opt, callback)

Get league entries mapped by team ID for a given list of team IDs.

**Parameters**

1. **opt {Object}**
    * **opt.ids {number | string | Array}** Comma-separated list of team IDs. Maximum allowed at once is 10.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getChallengerLeague" />
### getChallengerLeague(opt, callback)

Get challenger tier leagues.

**Parameters**

1. **[opt] {Object}**
    * **[opt.type = "RANKED_SOLO_5x5"] {string}** Game queue type.
        * Possible values: *"RANKED_SOLO_5x5" | "RANKED_TEAM_3x3" | "RANKED_TEAM_5x5"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getMasterLeague" />
### getMasterLeague(opt, callback)

Get master tier leagues.

**Parameters**

1. **[opt] {Object}**
    * **[opt.type = "RANKED_SOLO_5x5"] {string}** Game queue type.
        * Possible values: *"RANKED_SOLO_5x5" | "RANKED_TEAM_3x3" | "RANKED_TEAM_5x5"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getChampionData" />
### getChampionData(opt, callback)

Retrieves champion list.

**Parameters**

1. **[opt] {Object}**
    * **[opt.locale] {string}** Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[opt.version] {string}** Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[opt.dataById] {boolean}** If specified, the returned data map will use the champions' IDs as the keys. If not specified or specified as false, the returned data map will use the champions' keys instead.
    * **[opt.champData] {Array | string}** Tags to return additional data. Only type, version, data, id, key, name, and title are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "allytips" | "altimages" | "blurb" | "enemytips" | "image" | "info" | "lore" | "partype" | "passive" | "recommended" | "skins" | "spells" | "stats" | "tags"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getChampionDataById" />
### getChampionDataById(opt, callback)

Retrieves a champion by its id.

**Parameters**

1. **opt {Object}**
    * **opt.id {number | string}** - Champion ID.
    * **[opt.locale] {string}** Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[opt.version] {string}** Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[opt.champData] {Array | string}** Tags to return additional data. Only type, version, data, id, key, name, and title are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "allytips" | "altimages" | "blurb" | "enemytips" | "image" | "info" | "lore" | "partype" | "passive" | "recommended" | "skins" | "spells" | "stats" | "tags"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getItemData" />
### getItemData(opt, callback)

Retrieves item list.

**Parameters**

1. **[opt] {Object}**
    * **[opt.locale] {string}** Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[opt.version] {string}** Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[opt.itemListData] {Array | string}** Tags to return additional data. Only type, version, basic, data, id, name, plaintext, group, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "colloq" | "consumeOnFull" | "consumed" | "depth" | "from" | "gold" | "groups" | "hideFromAll" | "image" | "inStore" | "into" | "maps" | "requiredChampion" | "sanitizedDescription" | "specialRecipe" | "stacks" | "stats" | "tags" | "tree"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getItemDataById" />
### getItemDataById(opt, callback)

Retrieves item by its unique id.

**Parameters**

1. **opt {Object}**
    * **opt.id {number | string}** - Item ID.
    * **[opt.locale] {string}** Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[opt.version] {string}** Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[opt.itemData] {Array | string}** Tags to return additional data. Only id, name, plaintext, group, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "colloq" | "consumeOnFull" | "consumed" | "depth" | "from" | "gold" | "hideFromAll" | "image" | "inStore" | "into" | "maps" | "requiredChampion" | "sanitizedDescription" | "specialRecipe" | "stacks" | "stats" | "tags"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getLanguageStrings" />
### getLanguageStrings(opt, callback)

Retrieve language strings data.

**Parameters**

1. **[opt] {Object}**
    * **[opt.locale] {string}** Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[opt.version] {string}** Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getLanguages" />
### getLanguages(opt, callback)

Retrieve supported languages data.

**Parameters**

1. **[opt] {Object}**
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getMaps" />
### getMaps(opt, callback)

Retrieve map data.

**Parameters**

1. **[opt] {Object}**
    * **[opt.locale] {string}** Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[opt.version] {string}** Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getMasteryData" />
### getMasteryData(opt, callback)

Retrieves mastery list.

**Parameters**

1. **[opt] {Object}**
    * **[opt.locale] {string}** Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[opt.version] {string}** Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[opt.masteryListData] {Array | string}** Tags to return additional data. Only type, version, data, id, name, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "image" | "masteryTree" | "prereq" | "ranks" | "sanitizeDescription" | "tree"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getMasteryDataById" />
### getMasteryDataById(opt, callback)

Retrieves mastery item by its unique id.

**Parameters**

1. **opt {Object}**
    * **opt.id {number | string}** - Mastery ID.
    * **[opt.locale] {string}** Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[opt.version] {string}** Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[opt.masteryData] {Array | string}** Tags to return additional data. Only id, name, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "image" | "masteryTree" | "prereq" | "ranks" | "sanitizedDescription"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getRealms" />
### getRealms(opt, callback)

Retrieve realm data.

**Parameters**

1. **[opt] {Object}**
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getRuneData" />
### getRuneData(opt, callback)

Retrieves rune list.

**Parameters**

1. **[opt] {Object}**
    * **[opt.locale] {string}** Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[opt.version] {string}** Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[opt.runeListData] {Array | string}** Tags to return additional data. Only type, version, data, id, name, rune, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "basic" | "colloq" | "consumeOnFull" | "consumed" | "depth" | "from" | "gold" | "hideFromAll" | "image" | "inStore" | "into" | "maps" | "requiredChampion" | "sanitizedDescription" | "specialRecipe" | "stacks" | "stats" | "tags"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getRuneDataById" />
### getRuneDataById(opt, callback)

Retrieves rune by its unique id.

**Parameters**

1. **opt {Object}**
    * **opt.id {number | string}** - Rune ID.
    * **[opt.locale] {string}** Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[opt.version] {string}** Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[opt.runeData] {Array | string}** Tags to return additional data. Only id, name, rune, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "colloq" | "consumeOnFull" | "consumed" | "depth" | "from" | "gold" | "hideFromAll" | "image" | "inStore" | "into" | "maps" | "requiredChampion" | "sanitizedDescription" | "specialRecipe" | "stacks" | "stats" | "tags"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getSummonerSpellData" />
### getSummonerSpellData(opt, callback)

Retrieves summoner spell list.

**Parameters**

1. **[opt] {Object}**
    * **[opt.locale] {string}** Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[opt.version] {string}** Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[opt.dataById] {boolean}** If specified as true, the returned data map will use the spells' IDs as the keys. If not specified or specified as false, the returned data map will use the spells' keys instead.
    * **[opt.spellData] {Array | string}** Tags to return additional data. Only type, version, data, id, key, name, description, and summonerLevel are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "cooldown" | "cooldownBurn" | "cost" | "costBurn" | "costType" | "effect" | "effectBurn" | "image" | "key" | "leveltip" | "maxrank" | "modes" | "range" | "rangeBurn" | "resource" | "sanitizedDescription" | "sanitizedTooltip" | "tooltip" | "vars"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getSummonerSpellDataById" />
### getSummonerSpellDataById(opt, callback)

Retrieves summoner spell by its unique id.

**Parameters**

1. **opt {Object}**
    * **opt.id {number | string}** - Summoner spell ID.
    * **[opt.locale] {string}** Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
    * **[opt.version] {string}** Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
    * **[opt.spellData] {Array | string}** Tags to return additional data. Only id, key, name, description, and summonerLevel are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
        * Possible values: *"all" | "cooldown" | "cooldownBurn" | "cost" | "costBurn" | "costType" | "effect" | "effectBurn" | "image" | "key" | "leveltip" | "maxrank" | "modes" | "range" | "rangeBurn" | "resource" | "sanitizedDescription" | "sanitizedTooltip" | "tooltip" | "vars"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getVersions" />
### getVersions(opt, callback)

Retrieve realm data.

**Parameters**

1. **[opt] {Object}**
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getStatus" />
### getStatus(callback)

Get shard list.

**Parameters**

1. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getStatusByRegion" />
### getStatusByRegion(opt, callback)

Get shard status. Returns the data available on the status.leagueoflegends.com website for the given region.

**Parameters**

1. **[opt] {Object}**
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getMatchById" />
### getMatchById(opt, callback)

Retrieve match by match ID.

**Parameters**

1. **opt {Object}**
    * **opt.id {number | string}** - The ID of the match.
    * **[opt.includeTimeline] {boolean}** Flag indicating whether or not to include match timeline data.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getMatchHistoryBySummonerId" />
### getMatchHistoryBySummonerId(opt, callback)

Retrieve match history by summoner ID.

**Parameters**

1. **opt {Object}**
    * **opt.id {number | string}** - The ID of the summoner.
    * **[opt.championIds] {Array | number | string}** Comma-separated list of champion IDs to use for fetching games.
    * **[opt.rankedQueues] {Array | string}** Comma-separated list of ranked queue types to use for fetching games. Non-ranked queue types will be ignored.
		* Possible values: *"RANKED_SOLO_5x5" | "RANKED_SOLO_3x3" | "RANKED_SOLO_5x5"* 
    * **[opt.beginIndex] {number | string}** The begin index to use for fetching games.
    * **[opt.endIndex] {number | string}** The end index to use for fetching games.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getRankedStatsBySummonerId" />
### getRankedStatsBySummonerId(opt, callback)

Get ranked stats by summoner ID.

**Parameters**

1. **opt {Object}**
    * **opt.id {number | string}** - ID of the summoner for which to retrieve ranked stats.
    * **[opt.season] {string}** If specified, stats for the given season are returned. Otherwise, stats for the current season are returned.
		* Possible values: *"SEASON3" | "SEASON2014" | "SEASON2015"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getStatsSummaryBySummonerId" />
### getStatsSummaryBySummonerId(opt, callback)

Get player stats summaries by summoner ID.

**Parameters**

1. **opt {Object}**
    * **opt.id {number | string}** - ID of the summoner for which to retrieve player stats.
    * **[opt.season] {string}** If specified, stats for the given season are returned. Otherwise, stats for the current season are returned.
		* Possible values: *"SEASON3" | "SEASON2014" | "SEASON2015"*
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getSummonersByNames" />
### getSummonersByNames(opt, callback)

Get summoner objects mapped by standardized summoner name for a given list of summoner names.

**Parameters**

1. **opt {Object}**
    * **opt.names {Array | string}** - Comma-separated list of summoner names or standardized summoner names associated with summoners to retrieve. Maximum allowed at once is 40.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getSummonersByIds" />
### getSummonersByIds(opt, callback)

Get summoner objects mapped by summoner ID for a given list of summoner IDs.

**Parameters**

1. **opt {Object}**
    * **opt.names {Array | number | string}** - Comma-separated list of summoner IDs associated with summoners to retrieve. Maximum allowed at once is 40.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getMasteriesBySummonerIds" />
### getMasteriesBySummonerIds(opt, callback)

Get mastery pages mapped by summoner ID for a given list of summoner IDs.

**Parameters**

1. **opt {Object}**
    * **opt.ids {Array | number | string}** - Comma-separated list of summoner IDs associated with masteries to retrieve. Maximum allowed at once is 40.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getSummonerNamesByIds" />
### getSummonerNamesByIds(opt, callback)

Get summoner names mapped by summoner ID for a given list of summoner IDs.

**Parameters**

1. **opt {Object}**
    * **opt.ids {Array | number | string}** - Comma-separated list of summoner IDs associated with summoner names to retrieve. Maximum allowed at once is 40.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getRunesBySummonerIds" />
### getRunesBySummonerIds(opt, callback)

Get rune pages mapped by summoner ID for a given list of summoner IDs.

**Parameters**

1. **opt {Object}**
    * **opt.ids {Array | number | string}** - Comma-separated list of summoner IDs associated with runes to retrieve. Maximum allowed at once is 40.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getTeamsBySummonerIds" />
### getTeamsBySummonerIds(opt, callback)

Get teams mapped by summoner ID for a given list of summoner IDs.

**Parameters**

1. **opt {Object}**
    * **opt.ids {Array | number | string}** - Comma-separated list of summoner IDs. Maximum allowed at once is 10.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.

---------------------------------------

<a name="getTeamsByIds" />
### getTeamsByIds(opt, callback)

Get teams mapped by team ID for a given list of team IDs.

**Parameters**

1. **opt {Object}**
    * **opt.ids {Array | number | string}** - Comma-separated list of team IDs. Maximum allowed at once is 10.
    * **[opt.region] {string}** Optional region to be used instead of the API's region to retrieve data.
    * **[opt.apiKey] {string}** Optional key to be used instead of the API's key to retrieve data.
2. **[callback] {Function}** Optional function to be called after the server's response is received, with `(error, data)` as parameters.