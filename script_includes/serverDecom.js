/*global GlideGuid, global, Cart, gs, Class, AbstractAjaxProcessor, GlideRecord, trim*/

var serverDecom = Class.create();
serverDecom.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    putData: function () {
        var key = this.getParameter('sysparm_key');
        var val = this.getParameter('sysparm_val');
        gs.getSession().putClientData(key, val);
        return gs.getSession().getClientData(key);
    },
    /** This function is expecting a list of servers by name
     * seperated by line end, or comma
     * Example usage
     * var ga = new GlideAjax('serverDecom');
     * ga.addParam('sysparm_name','validateServers');
     * ga.addParam('sysparm_servers',g_form.getValue('servers').toString());
     * ga.getXML(parseServers);
     * function parseServers(response) {
     *      var answer = response.responseXML.documentElement.getAttribute("answer");
     *      console.log(JSON.parse(answer));
     * }
     * @param   {string} servers are comma or line end seperated names of
     *                         servers
     * @returns {string} stringified Object contains two arrays
     *                           foundServers, is an an array of found server names
     *                           missingServers, is an array of servers not found
     */
    validateServers: function () {
        'use strict';
        try {
            var input = this.getParameter("sysparm_servers");
            input += '\n'; //FIXME: for some reason this fails without this
            input = input.replace(/\n/g, ',');
            gs.print('input("servers") recd: ' + input);
            var servers = {
                found: [],
                missing: [],
                given: input.split(',')
            };
            for (var x = 0; x < servers.given.length; x = x + 1) {
                var ci = servers.given[x];
                //gs.print('in map for ' + ci);
                ci = trim(ci);
                var cmdb_ci_server = new GlideRecord('cmdb_ci_server');
                var query = 'install_statusIN101,102,104,1,3,143,124^ORinstall_statusISEMPTY';
                cmdb_ci_server.addQuery('sys_class_name', '!=', 'u_cmdb_ci_server_vdi');
                cmdb_ci_server.addEncodedQuery(query);
                cmdb_ci_server.addQuery('name', ci);
                cmdb_ci_server.query();
                if (cmdb_ci_server.hasNext()) {
                    servers.found.push(ci);
                } else {
                    servers.missing.push(ci);
                }
            }
            servers.found = new global.ArrayUtil().unique(servers.found);
            servers.missing = new global.ArrayUtil().unique(servers.missing);
            var retObj = (new JSON()).encode(servers);
            gs.print(retObj);
            return retObj;
        } catch (err) {
            var e = (new JSON()).encode(err);
            gs.print(e);
            //return e;
        }
    },
    addServersToCart: function (current) {
        if (!Array.prototype.filter) { //polyfill for pre-helsinki
            Array.prototype.filter = function (fun /*, thisp*/ ) {
                var len = this.length;
                if (typeof fun != "function")
                    throw new TypeError();

                var res = new Array();
                var thisp = arguments[1];
                for (var i = 0; i < len; i++) {
                    if (i in this) {
                        var val = this[i]; // in case fun mutates this
                        if (fun.call(thisp, val, i, this))
                            res.push(val);
                    }
                }

                return res;
            };
        }
        var retObj = {};
        var servers = current.variables.servers.toString();
        gs.print('servers: ' + servers);
        servers = servers.replace(/\r\n/g, ',');
        servers = servers.replace(/\r/g, ',');
        servers = servers.replace(/\n/g, ',');
        servers = servers.split(',');
        servers = servers.filter(String);
        gs.print('servers[arr]: ' + servers.toString());
        if (servers.length === 0) {
            return;
        } else {

            var redeployable = current.variables.server_decom_redeployable.toString();
            var hasDatabase = current.variables.server_decom_db.toString();
            //look it user has a cart first;
            retObj.parms = {
                servers: servers,
                redeployable: redeployable,
                hasDatabase: hasDatabase
            };

            var cart = new Cart(cartId);
            var cartId = GlideGuid.generate(null);
            retObj.cart = cartId.toString();
            retObj.items = [];
            retObj.servers = [];
            //retObj.items = servers;
            for (var x = 0; x < servers.length; x++) {
                var ci = servers[x];

                //ci = trim(ci);
                retObj.items.push(ci);
                var cmdb_ci_server = new GlideRecord('cmdb_ci_server');
                var query = 'install_statusIN101,102,104,1,3,143,124^ORinstall_statusISEMPTY';
                cmdb_ci_server.addQuery('sys_class_name', '!=', 'u_cmdb_ci_server_vdi');
                cmdb_ci_server.addEncodedQuery(query);
                cmdb_ci_server.addQuery('name', ci);
                cmdb_ci_server.query();
                retObj.query = cmdb_ci_server.getEncodedQuery();
                while (cmdb_ci_server.next()) {
                    retObj.servers.push(cmdb_ci_server.sys_id.toString());
                    var item = cart.addItem('7e5cd38359d9b00054b23001f965fd20'); //Server Decom
                    cart.setVariable(item, 'server_decom_name', cmdb_ci_server.sys_id.toString()); //server
                    cart.setVariable(item, 'server_decom_redeployable', redeployable); //redeployable
                    cart.setVariable(item, 'server_decom_db', hasDatabase); //has database
                }
            }
            var rc = cart.placeOrder();
            retObj.req = rc.number.toString();
            retObj = (new JSON()).encode(retObj);
            gs.print(retObj);
            //gs.addInfoMessage(rc.number);
            return rc.number;
        }
    },
    type: 'serverDecom'
});