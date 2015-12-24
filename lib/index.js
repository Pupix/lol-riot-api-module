/*jslint browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    // Vars
    var XP        = require('expandjs'),
        Requester = require('xp-request'),

    /**************************************************************************/

        /**
         * A map with the current version of each one of the League of Legends official API
         *
         * @type {Object}
         * @private
         */
        groups = {
            champion:      {
                version: 'v1.2',
                regions: ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr']
            },
            currentGame:   {
                version: 'v1.0',
                regions: ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'pbe', 'ru', 'tr']
            },
            featuredGames: {
                version: 'v1.0',
                regions: ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'pbe', 'ru', 'tr']
            },
            game:          {
                version: 'v1.3',
                regions: ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr']
            },
            league:        {
                version: 'v2.5',
                regions: ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr']
            },
            lolStaticData: {
                version: 'v1.2',
                regions: ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr']
            },
            lolStatus:     {
                version: 'v1.0',
                regions: ['br', 'eune', 'euw', 'lan', 'las', 'na', 'oce', 'pbe', 'ru', 'tr']
            },
            match:         {
                version: 'v2.2',
                regions: ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr']
            },
            matchHistory:  {
                version: 'v2.2',
                regions: ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr']
            },
            stats:         {
                version: 'v1.3',
                regions: ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr']
            },
            summoner:      {
                version: 'v1.4',
                regions: ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr']
            },
            team:          {
                version: 'v2.4',
                regions: ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr']
            }
        },

        /**
         * A map of the available endpoints for of each region of the League of Legends official API
         *
         * @type {Object}
         * @private
         */
        endpoints = {
            br: {
                platform: 'BR1',
                host: 'br.api.pvp.net'
            },
            eune: {
                platform: 'EUN1',
                host: 'eune.api.pvp.net'
            },
            euw: {
                platform: 'EUW1',
                host: 'euw.api.pvp.net'
            },
            kr: {
                platform: 'KR',
                host: 'kr.api.pvp.net'
            },
            lan: {
                platform: 'LA1',
                host: 'lan.api.pvp.net'
            },
            las: {
                platform: 'LA2',
                host: 'las.api.pvp.net'
            },
            na: {
                platform: 'NA1',
                host: 'na.api.pvp.net'
            },
            oce: {
                platform: 'OC1',
                host: 'oce.api.pvp.net'
            },
            tr: {
                platform: 'TR1',
                host: 'tr.api.pvp.net'
            },
            ru: {
                platform: 'RU',
                host: 'ru.api.pvp.net'
            },
            pbe: {
                platform: 'PBE1',
                host: 'pbe.api.pvp.net'
            },
            global: {
                platform: '',
                host: 'global.api.pvp.net'
            }
        };

    /**************************************************************************/

    /**
     * Generates a request URL from a string with placeholders and the option object
     *
     * @param {string} url - the url with placeholders
     * @param {Object} opt - the map with the placeholders values
     */
    function generateURL(url, opt) {
        var keys = XP.match(url, /\{(\w+)\}/g);

        XP.forEach(keys, function (key) {
            url = url.replace(key, opt[XP.trim(key, '{}')]);
        });

        return url;
    }

    /**************************************************************************/

    /**
     * A wrapper for League of Legends' official API
     *
     * @class RiotAPI
     * @type {Function}
     */
    module.exports = new XP.Class('RiotAPI', {

        /**
         * Initialize
         *
         * @param {Object} opt
         *  @param {string} opt.key - The default key to be used for the API calls
         *  @param {string} [opt.region] - The default region to be used for the API calls
         * @constructs
         * @throws
         */
        initialize: function (opt) {
            var self = this;

            //Checking
            XP.assertArgument(XP.isObject(opt, true), 1, 'Object');
            XP.assertOption(XP.isString(opt.key), 'opt.key', 'string');

            self.key = opt.key;
            self.region = opt.region || 'na';
        },

        /**********************************************************************/

        /**
         * Gets information about the status of all champions
         *
         * @method getChampions
         * @param {Object} [opt]
         *   @param {boolean} [opt.freeToPlay]
         *   @param {string} [opt.region]
         *   @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group champion
         */
        getChampions: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'champion';
                opt.url_ = '/api/lol/{region}/{version}/champion';

                //Setting
                opt.query_ = {};
                opt.query_.freeToPlay = !!opt.freeToPlay;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets information about a champion
         *
         * @method getChampionById
         * @param {Object} opt
         *   @param {string | number} opt.id
         *   @param {string} [opt.region]
         *   @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group champion
         */
        getChampionById: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.id) || XP.isNumber(opt.id), 'opt.id', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.group_ = 'champion';
                opt.url_ = '/api/lol/{region}/{version}/champion/{id}';

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Gets the current game of a summoner
         *
         * @method getCurrentGameBySummonerId
         * @param {Object} opt
         *   @param {string | number} opt.id
         *   @param {string} [opt.region]
         *   @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group currentGame
         */
        getCurrentGameBySummonerId: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.id) || XP.isNumber(opt.id), 'opt.id', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.group_ = 'currentGame';
                opt.url_ = '/observer-mode/rest/consumer/getSpectatorGameInfo/{platformId}/{summonerId}';
                opt.summonerId = opt.id;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Gets the featured games of a region
         *
         * @method getFeaturedGames
         * @param {Object} [opt]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group featuredGames
         */
        getFeaturedGames: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'featuredGames';
                opt.url_ = '/observer-mode/rest/featured';

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Gets recent games of a summoner
         *
         * @method getRecentGamesBySummonerId
         * @param {Object} opt
         *  @param {number | string} opt.id
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group game
         */
        getRecentGamesBySummonerId: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isNumber(opt.id) || XP.isString(opt.id), 'opt.id', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.group_ = 'game';
                opt.url_ = '/api/lol/{region}/{version}/game/by-summoner/{summonerId}/recent';
                opt.summonerId = opt.id;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Gets league information for the specified summoners
         *
         * @method getLeagueBySummonerIds
         * @param {Object} opt
         *  @param {number | string | Array} opt.ids
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group league
         */
        getLeagueBySummonerIds: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isNumber(opt.ids) || XP.isString(opt.ids) || XP.isArray(opt.ids), 'opt.ids', 'number, string or Array');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.group_      = 'league';
                opt.url_        = '/api/lol/{region}/{version}/league/by-summoner/{summonerIds}';
                opt.summonerIds = XP.isArray(opt.ids) ? opt.ids.join() : opt.ids;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets league entries of leagues for the specified summoners
         *
         * @method getLeagueEntryBySummonerIds
         * @param {Object} opt
         *  @param {number | string | Array} opt.ids
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group league
         */
        getLeagueEntryBySummonerIds: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isNumber(opt.ids) || XP.isString(opt.ids) || XP.isArray(opt.ids), 'opt.ids', 'number, string or Array');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.group_      = 'league';
                opt.url_        = '/api/lol/{region}/{version}/league/by-summoner/{summonerIds}/entry';
                opt.summonerIds = XP.isArray(opt.ids) ? opt.ids.join() : opt.ids;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets league info for the specified team Ids
         *
         * @method getLeagueByTeamIds
         * @param {Object} opt
         *  @param {number | string | Array} opt.ids
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group league
         */
        getLeagueByTeamIds: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isNumber(opt.ids) || XP.isString(opt.ids) || XP.isArray(opt.ids), 'opt.ids', 'number, string or Array');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.group_  = 'league';
                opt.url_    = '/api/lol/{region}/{version}/league/by-team/{teamIds}';
                opt.teamIds = XP.isArray(opt.ids) ? opt.ids.join() : opt.ids;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets league entries of leagues for the specified teams
         *
         * @method getLeagueEntryByTeamIds
         * @param {Object} opt
         *  @param {number | string | Array} opt.ids
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group league
         */
        getLeagueEntryByTeamIds: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isNumber(opt.ids) || XP.isString(opt.ids) || XP.isArray(opt.ids), 'opt.ids', 'number, string or Array');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.group_  = 'league';
                opt.url_    = '/api/lol/{region}/{version}/league/by-team/{teamIds}/entry';
                opt.teamIds = XP.isArray(opt.ids) ? opt.ids.join() : opt.ids;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets challenger league for a game type
         *
         * @method getChallengerLeague
         * @param {Object} [opt]
         *  @param {string} [opt.type]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group league
         */
        getChallengerLeague: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'league';
                opt.url_ = '/api/lol/{region}/{version}/league/challenger';

                //Setting
                opt.query_ = {};
                opt.query_.type = opt.type || 'RANKED_SOLO_5x5';

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets master league for a game type
         *
         * @method getMasterLeague
         * @param {Object} [opt]
         *  @param {string} [opt.type]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group league
         */
        getMasterLeague: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'league';
                opt.url_ = '/api/lol/{region}/{version}/league/master';

                //Setting
                opt.query_ = {};
                opt.query_.type = opt.type || 'RANKED_SOLO_5x5';

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Gets static data of all champions
         *
         * @method getChampionData
         * @param {Object} [opt]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.locale]
         *  @param {string} [opt.version]
         *  @param {string} [opt.dataById]
         *  @param {Array | string} [opt.champData]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getChampionData: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/champion';
                opt.global_ = true;

                //Setting
                opt.query_           = {};
                opt.query_.locale    = opt.locale;
                opt.query_.version   = opt.version;
                opt.query_.dataById  = !!opt.dataById;
                opt.query_.champData = XP.isArray(opt.champData) ? opt.champData.join() : opt.champData;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets static data of a champion
         *
         * @method getChampionDataById
         * @param {Object} opt
         *  @param {number | string} opt.id
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.locale]
         *  @param {string} [opt.version]
         *  @param {Array | string} [opt.champData]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getChampionDataById: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.id) || XP.isNumber(opt.id), 'opt.id', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/champion/{id}';
                opt.global_ = true;

                //Setting
                opt.query_           = {};
                opt.query_.locale    = opt.locale;
                opt.query_.version   = opt.version;
                opt.query_.champData = XP.isArray(opt.champData) ? opt.champData.join() : opt.champData;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets static data of all items
         *
         * @method getItemData
         * @param {Object} [opt]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.version]
         *  @param {Array | string} [opt.itemListData]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getItemData: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/item';
                opt.global_ = true;

                //Setting
                opt.query_              = {};
                opt.query_.locale       = opt.locale;
                opt.query_.version      = opt.version;
                opt.query_.itemListData = XP.isArray(opt.itemListData) ? opt.itemListData.join() : opt.itemListData;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets static data of an item
         *
         * @method getItemDataById
         * @param {Object} opt
         *  @param {number | string} opt.id
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.locale]
         *  @param {string} [opt.version]
         *  @param {Array | string} [opt.itemData]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getItemDataById: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.id) || XP.isNumber(opt.id), 'opt.id', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/item/{id}';
                opt.global_ = true;

                //Setting
                opt.query_          = {};
                opt.query_.locale   = opt.locale;
                opt.query_.version  = opt.version;
                opt.query_.itemData = XP.isArray(opt.itemData) ? opt.itemData.join() : opt.itemData;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets the language strings
         *
         * @method getLanguageStrings
         * @param {Object} [opt]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.locale]
         *  @param {string} [opt.version]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getLanguageStrings: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/language-strings';
                opt.global_ = true;

                //Setting
                opt.query_         = {};
                opt.query_.locale  = opt.locale;
                opt.query_.version = opt.version;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets the list of languages
         *
         * @method getLanguages
         * @param {Object} [opt]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.version]
         *  @param {string} [opt.locale]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getLanguages: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/languages';
                opt.global_ = true;

                //Setting
                opt.query_         = {};
                opt.query_.locale  = opt.locale;
                opt.query_.version = opt.version;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets the list of maps
         *
         * @method getMaps
         * @param {Object} [opt]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.locale]
         *  @param {string} [opt.version]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getMaps: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/map';
                opt.global_ = true;

                //Setting
                opt.query_         = {};
                opt.query_.locale  = opt.locale;
                opt.query_.version = opt.version;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets static data of all masteries
         *
         * @method getMasteryData
         * @param {Object} [opt]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.locale]
         *  @param {string} [opt.version]
         *  @param {Array | string} [opt.masteryListData]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getMasteryData: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/mastery';
                opt.global_ = true;

                //Setting
                opt.query_                 = {};
                opt.query_.locale          = opt.locale;
                opt.query_.version         = opt.version;
                opt.query_.masteryListData = XP.isArray(opt.masteryListData) ? opt.masteryListData.join() : opt.masteryListData;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets static data of a mastery
         *
         * @method getMasteryDataById
         * @param {Object} opt
         *  @param {number | string} opt.id
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.locale]
         *  @param {string} [opt.version]
         *  @param {Array | string} [opt.masteryData]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getMasteryDataById: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.id) || XP.isNumber(opt.id), 'opt.id', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/mastery/{id}';
                opt.global_ = true;

                //Setting
                opt.query_             = {};
                opt.query_.locale      = opt.locale;
                opt.query_.version     = opt.version;
                opt.query_.masteryData = XP.isArray(opt.masteryData) ? opt.masteryData.join() : opt.masteryData;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets the list of realms
         *
         * @method getRealms
         * @param {Object} [opt]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getRealms: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/realm';
                opt.global_ = true;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets static data of all runes
         *
         * @method getRuneData
         * @param {Object} [opt]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.locale]
         *  @param {string} [opt.version]
         *  @param {Array | string} [opt.runeListData]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getRuneData: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/rune';
                opt.global_ = true;

                //Setting
                opt.query_              = {};
                opt.query_.locale       = opt.locale;
                opt.query_.version      = opt.version;
                opt.query_.runeListData = XP.isArray(opt.runeListData) ? opt.runeListData.join() : opt.runeListData;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets static data of a rune
         *
         * @method getRuneDataById
         * @param {Object} opt
         *  @param {number | string} opt.id
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.locale]
         *  @param {string} [opt.version]
         *  @param {Array | string} [opt.runeData]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getRuneDataById: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.id) || XP.isNumber(opt.id), 'opt.id', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/rune/{id}';
                opt.global_ = true;

                //Setting
                opt.query_          = {};
                opt.query_.locale   = opt.locale;
                opt.query_.version  = opt.version;
                opt.query_.runeData = XP.isArray(opt.runeData) ? opt.runeData.join() : opt.runeData;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets static data of all summoner spells
         *
         * @method getSummonerSpellData
         * @param {Object} [opt]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.locale]
         *  @param {string} [opt.version]
         *  @param {string} [opt.dataById]
         *  @param {Array | string} [opt.spellData]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getSummonerSpellData: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/summoner-spell';
                opt.global_ = true;

                //Setting
                opt.query_           = {};
                opt.query_.locale    = opt.locale;
                opt.query_.version   = opt.version;
                opt.query_.dataById  = !!opt.dataById;
                opt.query_.spellData = XP.isArray(opt.spellData) ? opt.spellData.join() : opt.spellData;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets static data of a summoner spell
         *
         * @method getSummonerSpellById
         * @param {Object} opt
         *  @param {number | string} opt.id
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.version]
         *  @param {Array | string} [opt.spellData]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getSummonerSpellDataById: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.id) || XP.isNumber(opt.id), 'opt.id', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/summoner-spell/{id}';
                opt.global_ = true;

                //Setting
                opt.query_           = {};
                opt.query_.locale    = opt.locale;
                opt.query_.version   = opt.version;
                opt.query_.spellData = XP.isArray(opt.spellData) ? opt.spellData.join() : opt.spellData;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets the list of versions
         *
         * @method getVersions
         * @param {Object} [opt]
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group lolStaticData
         */
        getVersions: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object or void');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt         = opt || {};
                opt.group_  = 'lolStaticData';
                opt.url_    = '/api/lol/static-data/{region}/{version}/versions';
                opt.global_ = true;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Gets information about the status of all regions
         *
         * @method getStatus
         * @param {Function} [cb]
         * @promise
         * @group lolStatus
         */
        getStatus: {
            promise: true,
            value: function (cb) {

                //Checking
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 1, 'Function or void');

                //Preparing
                var opt        = {};
                opt.group_     = 'lolStatus';
                opt.url        = 'http://status.leagueoflegends.com/shards';
                opt.noSetting_ = true;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets information about the status of a region
         *
         * @method getStatusByRegion
         * @param {Object} [opt]
         *  @param {string} [opt.region]
         * @param {Function} [cb]
         * @promise
         * @group lolStatus
         */
        getStatusByRegion: {
            promise: true,
            value: function (opt, cb) {

                var self = this;

                //Checking
                XP.assertArgument(XP.isObject(opt) || XP.isVoid(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.region) || XP.isVoid(opt), 'opt.region', 'string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt            = opt || {};
                opt.group_     = 'lolStatus';
                opt.region     = XP.lowerCase(opt.region || self.region);
                opt.url        = 'http://status.leagueoflegends.com/shards/' + opt.region;
                opt.noSetting_ = true;

                if (opt.region === 'pbe') {
                    opt.url = 'http://status.pbe.leagueoflegends.com/shards/pbe';
                }

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Gets a match's data
         *
         * @method getMatchById
         * @param {Object} opt
         *  @param {string | number} opt.id
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {boolean} [opt.includeTimeline]
         * @param {Function} [cb]
         * @promise
         * @group match
         */
        getMatchById: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.id) || XP.isNumber(opt.id), 'opt.id', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'match';
                opt.url_ = '/api/lol/{region}/{version}/match/{matchId}';
                opt.matchId = opt.id;

                //Setting
                opt.query_ = {};
                opt.query_.includeTimeline = !!opt.includeTimeline;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets the match history of a summoner
         *
         * @method getMatchHistoryBySummonerId
         * @param {Object} opt
         *  @param {number | string} opt.id
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {Array | number | string} [opt.championIds]
         *  @param {Array | string} [opt.rankedQueues]
         *  @param {number | string} [opt.beginIndex]
         *  @param {number | string} [opt.endIndex]
         * @param {Function} [cb]
         * @promise
         * @group matchHistory
         */
        getMatchHistoryBySummonerId: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.id) || XP.isNumber(opt.id), 'opt.id', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'matchHistory';
                opt.url_ = '/api/lol/{region}/{version}/matchhistory/{summonerId}';
                opt.summonerId = opt.id;

                //Setting
                opt.query_              = {};
                opt.query_.championIds  = XP.isArray(opt.championIds) ? opt.championIds.join() : opt.championIds;
                opt.query_.rankedQueues = XP.isArray(opt.rankedQueues) ? opt.rankedQueues.join() : opt.rankedQueues;
                opt.query_.beginIndex   = opt.beginIndex || null;
                opt.query_.endIndex     = opt.endIndex || null;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        /**
         * Gets the ranked stats of a summoner
         *
         * @method getRankedStatsBySummonerId
         * @param {Object} opt
         *  @param {string | number} opt.id
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.season]
         * @param {Function} [cb]
         * @promise
         * @group stats
         */
        getRankedStatsBySummonerId: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.id) || XP.isNumber(opt.id), 'opt.id', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt.group_ = 'stats';
                opt.url_ = '/api/lol/{region}/{version}/stats/by-summoner/{summonerId}/ranked';
                opt.summonerId = opt.id;

                //Setting
                opt.query_ = {};
                opt.query_.season = opt.season || null;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets the summary of stats of a summoner
         *
         * @method getStatsSummaryBySummonerId
         * @param {Object} opt
         *  @param {string | number} opt.id
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         *  @param {string} [opt.season]
         * @param {Function} [cb]
         * @promise
         * @group stats
         */
        getStatsSummaryBySummonerId: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.id) || XP.isNumber(opt.id), 'opt.id', 'number or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'stats';
                opt.url_ = '/api/lol/{region}/{version}/stats/by-summoner/{summonerId}/summary';
                opt.summonerId = opt.id;

                //Setting
                opt.query_ = {};
                opt.query_.season = opt.season || null;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets a summoner by name
         *
         * @method getSummonersByNames
         * @param {Object} opt
         *  @param {Array | string} opt.names
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group summoner
         */
        getSummonersByNames: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.names) || XP.isArray(opt.names), 'opt.names', 'Array or string');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'summoner';
                opt.url_ = '/api/lol/{region}/{version}/summoner/by-name/{summonerNames}';
                opt.summonerNames = XP.isArray(opt.names) ? opt.names.join() : opt.names;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets summoners by ids
         *
         * @method getSummonersByIds
         * @param {Object} opt
         *  @param {Array | number | string} opt.ids
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group summoner
         */
        getSummonersByIds: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.ids) || XP.isNumber(opt.ids) || XP.isArray(opt.ids), 'opt.ids', 'string, number or Array');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'summoner';
                opt.url_ = '/api/lol/{region}/{version}/summoner/{summonerIds}';
                opt.summonerIds = XP.isArray(opt.ids) ? opt.ids.join() : opt.ids;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets masteries by summoner ids
         *
         * @method getMasteriesBySummonerIds
         * @param {Object} opt
         *  @param {Array | number | string} opt.ids
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group summoner
         */
        getMasteriesBySummonerIds: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.ids) || XP.isNumber(opt.ids) || XP.isArray(opt.ids), 'opt.ids', 'string, number or Array');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'summoner';
                opt.url_ = '/api/lol/{region}/{version}/summoner/{summonerIds}/masteries';
                opt.summonerIds = XP.isArray(opt.ids) ? opt.ids.join() : opt.ids;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets summoner names by summoner ids
         *
         * @method getSummonerNamesByIds
         * @param {Object} opt
         *  @param {Array | number | string} opt.ids
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group summoner
         */
        getSummonerNamesByIds: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.ids) || XP.isNumber(opt.ids) || XP.isArray(opt.ids), 'opt.ids', 'string, number or Array');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'summoner';
                opt.url_ = '/api/lol/{region}/{version}/summoner/{summonerIds}/name';
                opt.summonerIds = XP.isArray(opt.ids) ? opt.ids.join() : opt.ids;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets runes by summoner ids
         *
         * @method getRunesBySummonerId
         * @param {Object} opt
         *  @param {Array | number | string} opt.ids
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group summoner
         */
        getRunesBySummonerIds: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.ids) || XP.isNumber(opt.ids) || XP.isArray(opt.ids), 'opt.ids', 'string, number or Array');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'summoner';
                opt.url_ = '/api/lol/{region}/v1.4/summoner/{summonerIds}/runes';
                opt.summonerIds = XP.isArray(opt.ids) ? opt.ids.join() : opt.ids;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets teams by summoner ids
         *
         * @method getTeamsBySummonerIds
         * @param {Object} opt
         *  @param {Array | number | string} opt.ids
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group team
         */
        getTeamsBySummonerIds: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.ids) || XP.isNumber(opt.ids) || XP.isArray(opt.ids), 'opt.ids', 'string, number or Array');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'team';
                opt.url_ = '/api/lol/{region}/{version}/team/by-summoner/{summonerIds}';
                opt.summonerIds = XP.isArray(opt.ids) ? opt.ids.join() : opt.ids;

                this.doRequest(opt, cb);
            }
        },

        /**
         * Gets teams by ids
         *
         * @method getTeamsByIds
         * @param {Object} opt
         *  @param {Array | number | string} opt.ids
         *  @param {string} [opt.region]
         *  @param {string} [opt.apiKey]
         * @param {Function} [cb]
         * @promise
         * @group summoner
         */
        getTeamsByIds: {
            promise: true,
            value: function (opt, cb) {

                //Checking
                XP.assertArgument(XP.isObject(opt), 1, 'Object');
                XP.assertOption(XP.isString(opt.ids) || XP.isNumber(opt.ids) || XP.isArray(opt.ids), 'opt.ids', 'string, number or Array');
                XP.assertArgument(XP.isFunction(cb) || XP.isVoid(cb), 2, 'Function or void');

                //Preparing
                opt = opt || {};
                opt.group_ = 'team';
                opt.url_ = '/api/lol/{region}/{version}/team/{teamIds}';
                opt.teamIds = XP.isArray(opt.ids) ? opt.ids.join() : opt.ids;

                this.doRequest(opt, cb);
            }
        },

        /**********************************************************************/

        doRequest: {
            value: function (opt, cb) {
                var self = this,
                    url = '',
                    request;

                //Preparing
                opt.region = XP.lowerCase(opt.region || self.region);

                //Checking
                if (!XP.includes(groups[opt.group_].regions, opt.region)) {
                    cb(new XP.InvalidError('region'), null);
                } else {

                    //Setting
                    if (opt.noSetting_) {
                        url = opt.url;
                    } else {
                        opt.version        = groups[opt.group_].version;
                        opt.host           = endpoints[opt.global_ ? 'global' : opt.region].host;
                        opt.url_           = 'https://{host}' + opt.url_;
                        opt.query_         = opt.query_ || {};
                        opt.query_.api_key = opt.apiKey || self.key;
                        opt.region         = XP.lowerCase(opt.region || self.region);
                        opt.platformId     = endpoints[opt.region].platform;

                        //Creating URL
                        url = generateURL(opt.url_, opt);
                        //TODO Clean this up
                        url = url + '?' + XP.toQueryString(opt.query_);
                    }

                    //Setting request
                    request = new Requester({dataType: 'json', url: url});
                    //TODO Remove private statusCode_ and statusMessage_
                    request.on('data', function (data, req) {
                        if (req.statusCode_ === 200) {
                            cb(null, data);
                        } else {
                            cb({error: req.statusCode_, message: req.statusMessage_}, null);
                        }
                    });

                    request.on('error', function (err, req) {
                        var error = {
                            status: 'Unknown',
                            message: 'Couldn\'t resolve the request'
                        };

                        if (req.statusCode_ && req.statusMessage_) {
                            error.status = req.statusCode_;
                            error.message = req.statusMessage_;
                        }

                        cb({error: error.status, message: error.message}, null);
                    });

                    request.submit();
                }
            }
        }

    });

}());
