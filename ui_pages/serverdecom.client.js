/*global $j, GlideAjax,trim*/
$j(function () {
    $j('#decomForm').submit(function () {
        log.info('Validating Servers.');
        var ga = new GlideAjax('serverDecom');
        ga.addParam('sysparm_name', 'validateServers');
        ga.addParam('sysparm_servers', $j('#servers').val());
        ga.getXMLWait();
        var servers = JSON.parse(ga.getAnswer());
        return parseServers(servers);
    });
    $j('#r-checkall').click(function () {
        if ($j('#r-checkall').is(':checked')) {
            $j('.redeployable').prop('checked', true);
        } else {
            $j('.redeployable').prop('checked', false);
        }
    });
    $j('#d-checkall').click(function () {
        if ($j('#d-checkall').is(':checked')) {
            $j('.hasdatabase').prop('checked', true);
        } else {
            $j('.hasdatabase').prop('checked', false);
        }
    });
    $j("#servers").css('height','300px');
});


function parseServers(servers) {
    //log.hideError();
    $j('#goodServers').val('');
    var error = '';
    var found = '';
    servers.found.map(function (server) {
        found += server + '\n';
    });
    if ($j('#servers').val() == trim(found)) {
        $j('#goodServers').val(trim(found));
        console.log('servers === found');
        return true;
    } else {
        console.log('servers !== found');
        servers.missing.map(function (server) {
            var link = '/cmdb_ci_server_list.do?sysparm_query=name=' + server + '^' + $j('#query').text();
            error += 'Could not find "<a href="' + link + '">' + server + '</a>"<br />';
        });
        if ($j('#goodServers').val() != trim(found)) {
            $j('#servers').val(trim(found));
            $j('#goodServers').val(trim(found));
        } else {}
    }
    log.hideInfo();
    if (error.length > 0) {
        console.log('error>0: ' + error);
        log.error(error);
        return false;
    } else {
        console.log('error!>0 ');
        log.hideError();
    }
}
var log = {
    error: function (msg) {
        $j('#servers-error').html(msg);
        $j('#servers-error').removeClass('hide');
    },
    hideError: function () {
        $j('#servers-error').html('');
        $j('#servers-error').addClass('hide');
    },
    info: function (msg) {
        $j('#servers-info').html(msg);
        $j('#servers-info').removeClass('hide');
    },
    hideInfo: function () {
        $j('#servers-info').addClass('hide');
    },
};