angular.module(PKG.name + '.services')
  .factory('myCdapUrl', function myCdapUrl($stateParams, MY_CONFIG) {

    function constructUrl(resource) {

      var url;

      if(resource._cdapNsPath) {

        var namespace = $stateParams.namespace;

        if(!namespace) {
          throw new Error('_cdapNsPath requires $stateParams.namespace to be defined');
        }

        resource._cdapPath = [
          '/namespaces/',
          namespace,
          resource._cdapNsPath
        ].join('');
        delete resource._cdapNsPath;
      }

      // further sugar for building absolute url
      if(resource._cdapPath) {
        url = [
          'http://',
          MY_CONFIG.cdap.routerServerUrl,
          ':',
          MY_CONFIG.cdap.routerServerPort,
          '/v3',
          resource._cdapPath
        ].join('');
        delete resource._cdapPath;
      }
      return url;
    }

    return {
      constructUrl: constructUrl
    };
  });
