var baseURL = 'http://ajax.frontend.itheima.net';
// var preJURL = "http://www.itcast.cn"

$.ajaxPrefilter(function (options) {
    // console.log(options);
    options.url = baseURL + options.url
})