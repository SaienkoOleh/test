// Get all utmParameter and set a session cookie to reuse them later during the session (e.g. complete forms fields)
function cookieSessionFromUtmParameter(){
    //var urlParams = [];
    var query = window.location.search.substring(1);
    if(query != '') {
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            var paramName = pair[0];
            var paramValue = decodeURIComponent((pair[1]));

            //urlParams.push({ paramName: paramValue });
            if (paramName === "email") {
                sessionStorage.setItem('email', paramValue);
            }
            else if (paramName === "first_name") {
                sessionStorage.setItem('first_name', paramValue);
            }
            else if (paramName === "last_name") {
                sessionStorage.setItem('last_name', paramValue);
            }
            else if (paramName === "name") {
                sessionStorage.setItem('name', paramValue);
            }
            else if (paramName === "name") {
                sessionStorage.setItem('name', paramValue);
            }
            else if (paramName === "domain") {
                sessionStorage.setItem('domain', paramValue);
            }
            else if (paramName === "gorgias_subdomain") {
                sessionStorage.setItem('gorgias_subdomain', paramValue);
            }
            else if (paramName === "phone") {
                sessionStorage.setItem('phone', paramValue);
            }
            else if (paramName === "about_us") {
                sessionStorage.setItem('about_us', paramValue);
            }
            else if (paramName === "ecommerce_platform") {
                sessionStorage.setItem('ecommerce_platform', paramValue);
            }
            else if (paramName === "utm_campaign") {
                sessionStorage.setItem('utm_campaign_session', paramValue);
            }
            else if(paramName === "utm_source")  {
                sessionStorage.setItem('utm_source_session', paramValue);
        
            }
            else if(paramName === "demo_utm_term")  {
                sessionStorage.setItem('demo_utm_term_session', paramValue);
        
            }
            else if(paramName === "utm_medium")  {
                sessionStorage.setItem('utm_medium_session', paramValue);
        
            }
            else if(paramName === "ajs_prop_adset_name")  {
                sessionStorage.setItem('adset_name_session', paramValue);
        
            }
            else if(paramName === "ajs_prop_ad_name")  {
                sessionStorage.setItem('ad_name_session', paramValue);
        
            }
            else if(paramName === "ajs_prop_campaign_name")  {
                sessionStorage.setItem('ad_campaign_name_session', paramValue);
        
            }
            else if(paramName === "metadata_cid")  {
                sessionStorage.setItem('metadata_cid', paramValue);
        
            }
            else if (paramName === "gclid") {
                if (typeof analytics !== "undefined") {
                    analytics.track("Gclid caught");
                }
            }
            else if(paramName === "metadata_cid")  {
                sessionStorage.setItem('metadata_cid', paramValue);
        
            }
        }
    
    }
}

// fetch the IP and store it in variable session
function getandStoreIp(){
    if(sessionStorage.getItem('ipVisitor') === null || sessionStorage.getItem('ipVisitor') == ""){
        $.getJSON( "https://api.ipify.org?format=jsonp&callback=?", function(json) {
            if(json.ip.length > 0){
                sessionStorage.setItem('ipVisitor', json.ip);
            }
            else{
                sessionStorage.setItem('ipVisitor', '');
            }
        })
    }
}

cookieSessionFromUtmParameter();
getandStoreIp();